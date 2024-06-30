import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from 'src/_metronic/helpers/components/KTIcon'

type Props = {
    show: boolean
    handleClose: () => void
    content: any
}

const modalsRoot = document.getElementById('root-modals') || document.body

export const SuggestionModal = ({ show, handleClose, content }: Props) => {
    console.log('content:', content)
    return createPortal(
        <Modal tabIndex={-1} aria-hidden="true" dialogClassName="modal-dialog modal-dialog-centered mw-900px" show={show} onHide={handleClose} backdrop={true}>
            <div className="modal-header">
                <h2>Review</h2>
                <button className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                    <KTIcon className="fs-1" iconName="cross" />
                </button>
            </div>
            <div className="modal-body py-lg-10 px-lg-10" dangerouslySetInnerHTML={{ __html: content?.html }}></div>
        </Modal>,
        modalsRoot
    )
}
