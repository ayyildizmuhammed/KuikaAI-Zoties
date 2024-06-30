import { registerEnumType } from 'type-graphql'

export enum OperationResultStatus {
    Success = 0,
    Error = 1,
    Warning = 2
}

registerEnumType(OperationResultStatus, {
    name: 'OperationResultStatus'
})
