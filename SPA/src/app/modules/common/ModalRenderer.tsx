import { AddLocation, EditLocation } from '@mui/icons-material'
import { EModalName } from '../dal/enums/EModalName'

import ModalWrapper from '../modals/ModalWrapper'
import AddCamera from 'src/app/Pages/LocationManagement/LocationManagementTabs/Cameras/modals/AddCamera'
import EditCamera from 'src/app/Pages/LocationManagement/LocationManagementTabs/Cameras/modals/EditCamera'
import LiveCamera from 'src/app/Pages/LocationManagement/LocationManagementTabs/Cameras/modals/LiveCamera'
import CreateUserForm from 'src/app/Pages/AccountManagement/AccountManagementTabs/Users/modals/CreateUserForm'
import UpdateUserForm from 'src/app/Pages/AccountManagement/AccountManagementTabs/Users/modals/UpdateUserForm'
import { FormType } from 'src/app/Pages/AccountManagement/AccountManagementTabs/Users/modals/UserForm'

export default class ModalRenderer {
    static renderModal(modalName: EModalName, formType?: FormType) {
        switch (modalName) {
            case EModalName.AddCamera:
                return <AddCamera />
            case EModalName.LiveCamera:
                return <LiveCamera />
            case EModalName.EditCamera:
                return <EditCamera />
            case EModalName.CreateUserForm:
                return <CreateUserForm />
            case EModalName.UpdateUserForm:
                return <UpdateUserForm />
            case EModalName.AddLocation:
                return <AddLocation></AddLocation>
            case EModalName.EditLocation:
                return <EditLocation></EditLocation>
            case EModalName.None:
                return (
                    // OPEN Dialog from bootstrap
                    <ModalWrapper>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this item?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </ModalWrapper>
                )
            default:
                return (
                    <ModalWrapper>
                        <div>You don't have permissions to do this!</div>
                    </ModalWrapper>
                )
        }
    }
}
