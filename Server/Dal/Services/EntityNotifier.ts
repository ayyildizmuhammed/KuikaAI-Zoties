import { BaseEntity } from '../../Entities/BaseEntity'

export type IEntityNotifier<TEntity extends BaseEntity> = {
    onBeforeCreate(document: Document): Promise<boolean>
    onBeforeUpdate(document: Document): Promise<boolean>
}

export class EntityNotifier<TEntity extends BaseEntity> implements IEntityNotifier<TEntity> {
    async onBeforeCreate(document: Document) {
        return true
    }

    async onBeforeUpdate(document: Document) {
        return true
    }
}
