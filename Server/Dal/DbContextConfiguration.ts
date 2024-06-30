import { Service } from 'typedi'
import dotenv from 'dotenv'

dotenv.config()

@Service()
export class DbContextConfiguration {
    get dbUri(): string {
        const environment = process.env.ENV ?? 'local'
        const localDbUri = process.env.LOCAL_DATABASE_URI ?? 'mongodb://localhost:27017' // NOSONAR
        return localDbUri
    }
    get dbName() {
        return process.env.DATABASE_NAME ?? 'motus'
    }
}
