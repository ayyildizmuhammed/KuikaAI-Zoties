import { ObjectType, Field } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { BaseEntity } from './BaseEntity'
// import { PasswordHasher } from '../Services/User/PasswordHasher'

@ObjectType({ description: 'The User model' })
export class User extends BaseEntity {
    @Field()
    @Property({ required: true, unique: true })
    username: string

    @Field()
    @Property({ required: true })
    fullname: string

    @Field()
    @Property({ required: true, lowercase: true, trim: true })
    email: string

    @Property({ required: true }) // Note: We do not expose the password field in the GraphQL schema
    password: string

    @Field(() => [String])
    @Property({ required: true, type: [String] })
    roles: string[]

    @Field(() => String)
    @Property({ required: false, type: String })
    profileImage: string

    @Field(() => String)
    @Property({ required: true })
    accountId: string
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true, collection: 'users' } })
