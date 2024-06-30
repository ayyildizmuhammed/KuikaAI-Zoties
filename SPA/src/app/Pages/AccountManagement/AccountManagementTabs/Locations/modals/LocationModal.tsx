import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from 'src/_metronic/helpers/components/KTIcon'
import { useIntl } from 'react-intl'
import LocationForm from './LocationForm'
import Location from 'src/app/modules/dal/models/Location'

type Props = {
    show: boolean
    handleClose: () => void
    selectedLocation: Location | null
}

const modalsRoot = document.getElementById('root-modals') || document.body

export const LocationModal = ({ show, handleClose, selectedLocation }: Props) => {
    const formType = selectedLocation ? 'UPDATE' : 'CREATE'
    const intl = useIntl()

    return createPortal(
        <Modal tabIndex={-1} aria-hidden="true" dialogClassName="modal-dialog modal-dialog-centered mw-900px" show={show} onHide={handleClose} backdrop={true}>
            <div className="modal-header">
                <h2>{formType === 'CREATE' ? intl.formatMessage({ id: 'CREATE_LOCATION' }) : intl.formatMessage({ id: 'UPDATE_LOCATION' })}</h2>
                <button className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                    <KTIcon className="fs-1" iconName="cross" />
                </button>
            </div>
            <div className="modal-body py-lg-10 px-lg-10">
                <LocationForm formType={formType} onClose={handleClose} selectedLocation={selectedLocation} />
            </div>
        </Modal>,
        modalsRoot
    )
}
