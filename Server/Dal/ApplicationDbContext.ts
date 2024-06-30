import { Inject, Service } from 'typedi'
import mongoose from 'mongoose'
import { DbContextConfiguration } from './DbContextConfiguration'
import { Db, MongoClient } from 'mongodb'
import { getModelForClass } from '@typegoose/typegoose'
import { User } from '../Entities/User'
import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types'
@Service()
export class ApplicationDbContext {
    private client: MongoClient

    UserModel: ReturnModelType<typeof User, BeAnObject>

    constructor(@Inject(() => DbContextConfiguration) private configService: DbContextConfiguration) {
        this.client = new MongoClient(this.configService.dbUri)
        this.initializeModels()
    }

    private initializeModels() {
        this.UserModel = getModelForClass(User, {
            schemaOptions: { timestamps: true, collection: 'users' }
        })
    }

    async connect() {
        try {
            await mongoose.connect(this.configService.dbUri, { dbName: this.configService.dbName })
            console.log('Database connected successfully.', this.configService.dbUri, this.configService.dbName)
        } catch (error) {
            console.error('Database connection error:', error)
            throw error
        }
    }

    public async getClient(): Promise<Db> {
        return this.client.db('motus')
    }
}

export async function addApplicationDbContextService(container: any) {
    const dbContext = container.get(ApplicationDbContext)
    await dbContext.connect()
}
