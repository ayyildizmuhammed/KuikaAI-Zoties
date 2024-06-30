export default class ModelBase {
    id?: string
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
    deletedAt?: Date
    deletedBy?: string

    public constructor(data: any) {
        if (!data) return
        this.id = data?.['id']
        this.createdAt = data?.['createdAt']
        this.createdBy = data?.['createdBy']
        this.updatedAt = data?.['updatedAt']
        this.updatedBy = data?.['updatedBy']
        this.deletedAt = data?.['deletedAt']
        this.deletedBy = data?.['deletedBy']
    }
}
