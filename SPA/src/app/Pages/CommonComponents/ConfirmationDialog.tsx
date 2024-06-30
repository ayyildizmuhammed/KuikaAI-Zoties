import { Modal, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ConfirmationDialog = ({ show, onClose, onConfirm, title, message }) => {
    const intl = useIntl()

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title || intl.formatMessage({ id: 'CONFIRM_DELETION' })}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <FontAwesomeIcon icon={faTrashAlt} size="4x" style={{ color: 'red' }} />
                <p className="mt-3 fs-6">{message || intl.formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DELETE' })}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {intl.formatMessage({ id: 'CANCEL' })}
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    {intl.formatMessage({ id: 'DELETE' })}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationDialog
