import { InputType, Field } from 'type-graphql'
import { IsString } from 'class-validator'
import EntityCreateInputBase from './EntityCreateInputBase'

@InputType()
export class UserCreateInput extends EntityCreateInputBase {
    @Field(() => String)
    @IsString()
    username: string

    @Field(() => String)
    fullname: string

    @Field(() => String)
    @IsString()
    email: string

    @Field(() => String)
    password: string

    @Field(() => [String])
    roles: string[]

    @Field(() => String, { nullable: true })
    profileImage?: string

    @Field()
    accountId: string
}
