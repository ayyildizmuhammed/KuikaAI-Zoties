import { BaseEntity } from '../../Entities/BaseEntity'
import { EntityNotifier } from './EntityNotifier'

export class NotifierRegistry {
    private static notifiers = new Map<string, EntityNotifier<any>[]>()

    public static registerNotifier<T extends BaseEntity>(modelName: string, notifier: EntityNotifier<T>) {
        if (!this.notifiers.has(modelName)) {
            this.notifiers.set(modelName, [])
        }
        this.notifiers.get(modelName)!.push(notifier)
    }

    public static getNotifiers<T extends BaseEntity>(modelName: string): EntityNotifier<T>[] {
        return this.notifiers.get(modelName) ?? []
    }
}
