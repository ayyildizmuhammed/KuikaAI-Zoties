import { ObjectType, Field } from 'type-graphql'
import { GraphQLJSONObject } from 'graphql-compose'
import { OperationResultStatus } from '../Services/Models/eOperationResultStatus'

@ObjectType()
export default class EntityCrudResult<T> {
    @Field(type => OperationResultStatus)
    status: OperationResultStatus

    @Field(type => [String], { nullable: true })
    errors?: string[]

    @Field(type => GraphQLJSONObject, { nullable: true }) // Use GraphQLJSONObject for dynamic field errors
    fieldErrors?: Record<string, string>
}
