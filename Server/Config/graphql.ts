import * as path from 'path'

export const __graphql = {
    resolver: {
        paths: [path.resolve(__dirname, '../GraphQL/Resolvers/**/*.ts')]
    },
    schema: {
        emitPath: path.resolve(__dirname, '../../schema.graphql')
    },
    playground: {
        settings: {
            'request.credentials': 'include',
            'general.betaUpdates': false,
            'editor.theme': 'dark',
            'editor.reuseHeaders': true,
            'editor.fontSize': 14
        }
    }
}
