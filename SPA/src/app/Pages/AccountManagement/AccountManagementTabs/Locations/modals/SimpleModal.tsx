import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from 'src/_metronic/helpers/components/KTIcon'
import { useIntl } from 'react-intl'

type Props = {
    show: boolean
    handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

export const SimpleModal = ({ show, handleClose }: Props) => {
    const intl = useIntl()

    return createPortal(
        <Modal tabIndex={-1} aria-hidden="true" dialogClassName="modal-dialog modal-dialog-centered mw-900px" show={show} onHide={handleClose} backdrop={true}>
            <div className="modal-header">
                <h2>{intl.formatMessage({ id: 'CREATE_LOCATION' })}</h2>
                {/* begin::Close */}
                <button className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                    <KTIcon className="fs-1" iconName="cross" />
                </button>
                {/* end::Close */}
            </div>

            <div className="modal-body py-lg-10 px-lg-10"></div>
        </Modal>,
        modalsRoot
    )
}
