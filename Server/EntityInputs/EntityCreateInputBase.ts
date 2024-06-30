import { InputType, Field, ID } from 'type-graphql'

@InputType()
export default class EntityCreateInputBase {
    @Field(() => [String], { nullable: true }) // default Type is String
    tags: [String]
}
