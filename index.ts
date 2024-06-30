import 'reflect-metadata'
import dotenv from 'dotenv'
import app from './Server/app'

dotenv.config()

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`GraphQL endpoint is available on http://localhost:${PORT}/graphql`)
})
