import { auto } from '@popperjs/core'
import FormModalWrapper from '../../../../../modules/modals/FormModalWrapper'
import UserForm, { FormType } from './UserForm'

export default function CreateUserForm() {
    return (
        <FormModalWrapper title={'Add New User'} style={{ width: auto, height: auto, alignItems: 'flex-start' }}>
            <UserForm formType={FormType.Create}></UserForm>
        </FormModalWrapper>
    )
}
