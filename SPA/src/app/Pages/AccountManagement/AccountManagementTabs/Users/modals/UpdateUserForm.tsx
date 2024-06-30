import { useSelector } from 'react-redux'
import ModalWrapper from '../../../../../modules/modals/ModalWrapper'
import { RootState } from '../../../../../redux/reducers/rootReducer'
import { auto } from '@popperjs/core'
import User from '../../../../../modules/dal/models/User'
import UserForm, { FormType } from './UserForm'

export default function UpdateUserForm() {
    const user = useSelector<RootState>(state => state.userReducer.selectedUser) as User

    return (
        <ModalWrapper title={'Update User: ' + user.fullname} style={{ width: auto, height: auto, alignItems: 'flex-start' }}>
            <UserForm formType={FormType.Update}></UserForm>
        </ModalWrapper>
    )
}
