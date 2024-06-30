import { Express } from 'express'
import Container from 'typedi'
import { AuthenticationService } from '../Services/Auth/AuthenticationService'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { config } from '../Config'
import { UserResolver } from './Resolvers/EntityResolvers/UserResolver'

export const createSchema = async () =>
    buildSchema({
        resolvers: [
            // entity resolvers
            UserResolver
        ],
        emitSchemaFile: config.graphql.schema.emitPath,
        validate: false
    })

export default async function addGraphQLService(app: Express) {
    const schema = await createSchema()

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            const authService = Container.get(AuthenticationService)
            let user = null
            try {
                const token = req.headers.authorization?.split(' ')[1] ?? ''
                user = authService.verifyToken(token)
            } catch (error) {
                throw new Error('Authentication error: ' + error)
            }
            const requestId = Math.random().toString(36)
            const contextContainer = Container.of(requestId)
            contextContainer.set('request', req)
            return {
                container: contextContainer,
                user
            }
        },
        formatError: formatError
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app as any })
}

function formatError(error: any) {
    // console.log('GraphQL error:', error)
    return error
}
