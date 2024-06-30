import { InputType, Field } from 'type-graphql'
import UpdateEntityInputBase from './EntityUpdateInputBase'
import { IsString } from 'class-validator'

@InputType()
export class UserUpdateInput extends UpdateEntityInputBase {
    @Field(() => String)
    @IsString()
    username: string

    @Field(() => String)
    fullname: string

    @Field(() => String)
    @IsString()
    email: string

    @Field(() => [String])
    roles: string[]

    @Field(() => String, { nullable: true })
    profileImage?: string
}
