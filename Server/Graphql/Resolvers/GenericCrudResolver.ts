import { Resolver, Mutation, Arg, ClassType, ID, Query, Ctx } from 'type-graphql'
import { ReturnModelType } from '@typegoose/typegoose'
import EntityOperationResult from '../../CommonModels/EntityOperationResult'
import { BaseEntity } from '../../Entities/BaseEntity'

import { isValidObjectId } from 'mongoose'
// Generic CRUD operasyonları için bir base resolver oluşturma

export function GenericCRUDResolver<EntityType extends ClassType, CreateInputType extends ClassType, UpdateInputType extends ClassType>(
    suffix: string,
    returnType: EntityType,
    createInputType: CreateInputType,
    updateInputType: UpdateInputType,
    model: ReturnModelType<any>,
    isSoftDeletable: boolean = false // Soft delete işlevselliğini kontrol  parametre
) {
    @Resolver(of => returnType)
    class ResolverClass {
        // Get all entities
        @Query(() => [returnType], { name: `get${suffix}s` })
        async get(): Promise<EntityType[]> {
            const query = isSoftDeletable ? { deletedAt: null } : {}
            return await model.find(query)
        }

        // Get entity by id
        @Query(() => returnType, { name: `get${suffix}`, nullable: true })
        async getById(@Arg('id', () => ID) id: string): Promise<EntityType | null> {
            if (!isValidObjectId(id)) {
                return null
            }
            const query = isSoftDeletable ? { _id: id, deletedAt: null } : { _id: id }
            return model.findOne(query)
        }

        @Mutation(() => EntityOperationResult, { name: `create${suffix}` })
        async create(@Arg('input', () => createInputType) input: any, @Ctx() context: any): Promise<EntityOperationResult> {
            try {
                input.createdBy = context.user.email
                input.createdAt = new Date()
                input.updatedBy = context.user.email
                input.updatedAt = new Date()
                const createdEntity = await model.create(input)
                const returnModel = new BaseEntity()
                returnModel.id = createdEntity.id
                returnModel.createdAt = createdEntity.createdAt
                returnModel.createdBy = createdEntity.createdBy
                returnModel.updatedAt = createdEntity.updatedAt
                returnModel.updatedBy = createdEntity.updatedBy
                returnModel.deletedAt = createdEntity.deletedAt
                returnModel.deletedBy = createdEntity.deletedBy
                // console.log('Return Model', returnModel)
                return {
                    status: 'Success',
                    hasErrors: false,
                    errors: [],
                    entity: returnModel
                }
            } catch (error: any) {
                return {
                    status: 'Error',
                    hasErrors: true,
                    errors: [error.message]
                }
            }
        }

        // Update entity
        @Mutation(() => EntityOperationResult, { name: `update${suffix}` })
        async update(@Arg('input', () => updateInputType) input: any, @Ctx() context: Promise<EntityOperationResult>) {
            try {
                const document = await model.findById(input.id)
                if (!document || (isSoftDeletable && document.deletedAt !== null)) {
                    throw new Error(`${suffix} not found or deleted`)
                }
                Object.assign(document, input)
                await document.save()
                const returnModel = new BaseEntity()
                returnModel.id = document.id
                returnModel.createdAt = document.createdAt
                returnModel.updatedAt = document.updatedAt
                returnModel.createdBy = document.createdBy
                returnModel.updatedBy = document.updatedBy
                returnModel.deletedAt = document.deletedAt
                returnModel.deletedBy = document.deletedBy
                return {
                    status: 'Success',
                    hasErrors: false,
                    errors: [],
                    entity: returnModel
                }
            } catch (error: any) {
                return {
                    status: 'Error',
                    hasErrors: true,
                    errors: [error.message]
                }
            }
        }

        // Delete entity
        @Mutation(() => EntityOperationResult, { name: `delete${suffix}` })
        async delete(@Arg('id', () => ID) id: string): Promise<EntityOperationResult> {
            try {
                if (isSoftDeletable) {
                    // Soft delete
                    await model.findByIdAndUpdate(id, { deletedAt: new Date() })
                } else {
                    // Hard delete
                    await model.findByIdAndDelete(id)
                }
                return {
                    status: 'Success',
                    hasErrors: false,
                    errors: []
                }
            } catch (error: any) {
                return {
                    status: 'Error',
                    hasErrors: true,
                    errors: [error.message]
                }
            }
        }
    }
    return ResolverClass
}
