import { ObjectType, Field } from 'type-graphql'
import { BaseEntity } from '../Entities/BaseEntity'

@ObjectType()
export default class EntityOperationResult {
    @Field()
    status: string

    @Field()
    hasErrors: boolean

    @Field(type => [String], { nullable: true })
    errors?: string[]

    @Field(type => BaseEntity, { nullable: true })
    entity?: BaseEntity
}
