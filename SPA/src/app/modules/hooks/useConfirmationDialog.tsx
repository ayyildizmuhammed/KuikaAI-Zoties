// useConfirmationDialog.js

import { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ConfirmationDialog from 'src/app/Pages/CommonComponents/ConfirmationDialog'

const useConfirmationDialog = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [resolveReject, setResolveReject] = useState([])
    const [message, setMessage] = useState('')

    const requestConfirmation = useCallback(message => {
        setMessage(message)
        setIsVisible(true)
        return new Promise((resolve, reject) => {
            setResolveReject([resolve, reject])
        })
    }, [])

    const handleCancel = useCallback(() => {
        setIsVisible(false)
        resolveReject[1] && resolveReject[1]()
    }, [resolveReject])

    const handleConfirm = useCallback(() => {
        setIsVisible(false)
        resolveReject[0] && resolveReject[0]()
    }, [resolveReject])

    const renderConfirmationDialog = useCallback(() => {
        return ReactDOM.createPortal(<ConfirmationDialog title={""} show={isVisible} onClose={handleCancel} onConfirm={handleConfirm} message={message} />, document.body)
    }, [isVisible, message, handleCancel, handleConfirm])

    return { requestConfirmation, renderConfirmationDialog }
}

export default useConfirmationDialog
