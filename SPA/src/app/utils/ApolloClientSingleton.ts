import { ApolloClient, InMemoryCache, createHttpLink, DefaultOptions } from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { getAuth } from '../modules/auth'

class ApolloClientSingleton {
    private static instance: ApolloClient<unknown>

    public static getInstance(): ApolloClient<unknown> {
        if (!ApolloClientSingleton.instance) {
            const httpLink = createHttpLink({ uri: '/graphql' }) // .NET Core GraphQL API URL
            const authLink = setContext(async (_, { headers }) => {
                const auth = getAuth()
                return {
                    headers: {
                        ...headers,
                        authorization: auth.api_token ? `Bearer ${auth.api_token}` : ''
                    }
                }
            })

            const defaultOptions: DefaultOptions = {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore'
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all'
                }
            }
            ApolloClientSingleton.instance = new ApolloClient({
                link: authLink.concat(httpLink),
                cache: new InMemoryCache(),
                defaultOptions
            })
        }
        return ApolloClientSingleton.instance
    }
}

export default ApolloClientSingleton
