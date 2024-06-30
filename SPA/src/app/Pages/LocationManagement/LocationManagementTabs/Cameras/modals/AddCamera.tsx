import { auto } from '@popperjs/core'
import EditCameraForm from './EditCameraForm'
import FormModalWrapper from '../../../../../modules/modals/FormModalWrapper'

export default function AddCamera() {
    return (
        <FormModalWrapper title="Add New Camera" style={{ width: auto, height: auto, alignItems: 'flex-start' }}>
            <EditCameraForm camera={null} submitButtonLabel="Add New"></EditCameraForm>
        </FormModalWrapper>
    )
}
