import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/reducers/modalReducer'
import useOutsideClick from '../hooks/useOutsideClick'
import { RootState } from '../../redux/reducers/rootReducer'
import { RoundaboutLeft } from '@mui/icons-material'

interface ModalWrapperProps {
    children: React.ReactNode
    title?: string // Opsiyonel başlık metni
    headerElements?: React.ReactNode // Header içinde sağ tarafa eklenmek istenen ekstra elemanlar
    style?: React.CSSProperties
}

export default function FormModalWrapper({ children, title, headerElements, style }: Readonly<ModalWrapperProps>) {
    const dispatch = useDispatch()
    const modalRef = useRef<HTMLDivElement>(null)
    const { isModalOpen } = useSelector((state: RootState) => state.modalReducer)

    useOutsideClick(modalRef, () => dispatch(closeModal()))

    if (!isModalOpen) return null // Modal kapalıysa hiçbir şey render etme

    return (
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} tabIndex={-1} style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-dialog" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <div className="ms-2">{headerElements}</div>
                        <button className="btn btn-icon btn-sm btn-active-light-primary ms-2" onClick={() => dispatch(closeModal())} aria-label="Close">
                            <RoundaboutLeft path="media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" /* NOSONAR*/ />
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    )
}
