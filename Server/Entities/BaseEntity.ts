import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'
import { IsArray } from 'class-validator'

@ObjectType({ isAbstract: true })
export class BaseEntity {
    @Field(() => ID) // GraphQL Şeması için Tip tanımı bu şekilde yapılıyor.
    id: string

    @Field(() => [String], { nullable: true }) // default Type is String
    @Property({ type: [String], default: [] }) // MongoDB Şeması için Tip tanımı bu şekilde yapılıyor.
    @IsArray() // GraphQL Şema validation için class-validator kullanılmalıdır.
    tags: [String]

    @Field()
    @Property({ required: true })
    createdBy: string

    @Field(() => Date)
    @Property({ required: true, type: Date })
    createdAt: Date

    @Field()
    @Property({ required: true })
    updatedBy: string

    @Field(() => Date)
    @Property({ required: true, type: Date })
    updatedAt: Date

    @Field({ nullable: true }) // GraphQL Şema nullable field için { nullable: true } eklenmeli yoksa otomatik olarak required oluyor.
    @Property({ default: null })
    deletedBy?: string

    @Field(() => Date, { nullable: true })
    @Property({ default: null })
    deletedAt?: Date

    _doc?: any
}
