import { InputType, Field, ID } from 'type-graphql'

@InputType()
export default class EntityUpdateInputBase {
    @Field(() => ID)
    id: string

    @Field(() => [String], { nullable: true }) // default Type is String
    tags: [String]
}
