import { Resolver } from 'type-graphql'
import { User, UserModel } from '../../../Entities/User'
import { GenericCRUDResolver } from '../GenericCrudResolver'
import { UserCreateInput } from '../../../EntityInputs/UserCreateInput'
import { UserUpdateInput } from '../../../EntityInputs/UserUpdateInput'

@Resolver(() => User)
export class UserResolver extends GenericCRUDResolver('User', User, UserCreateInput, UserUpdateInput, UserModel, false) {
}
