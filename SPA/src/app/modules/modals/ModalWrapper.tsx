import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/reducers/modalReducer'
import './ModalWrapper.scss'
import useOutsideClick from '../hooks/useOutsideClick'
import { useThemeMode } from '../../../_metronic/partials'
import { RootState } from '../../redux/reducers/rootReducer'
import { CloseRounded } from '@mui/icons-material'

interface ModalWrapperProps {
    children: React.ReactNode
    title?: string // Opsiyonel başlık metni
    headerElements?: React.ReactNode // Header içinde sağ tarafa eklenmek istenen ekstra elemanlar
    style?: React.CSSProperties
    layout?: 'modal' | 'form'
}

export default function ModalWrapper({ children, title, headerElements, style, layout }: Readonly<ModalWrapperProps>) {
    const dispatch = useDispatch()
    const modalRef = useRef<HTMLDivElement>(null)
    const { isModalOpen } = useSelector((state: RootState) => state.modalReducer)
    const { mode } = useThemeMode() // Tema modunu kullan

    useOutsideClick(modalRef, () => dispatch(closeModal()))

    const modalOverlayClass = `modal-overlay-custom ${isModalOpen ? 'open' : ''} ${mode}`
    const modalContentClass = `modal-content-custom ${mode}`
    const modalHeaderClass = `modal-header-custom ${mode}`

    if (!isModalOpen) return null // Modal kapalıysa hiçbir şey render etme

    return (
        <div className={modalOverlayClass} data-bs-theme={mode}>
            <div className={modalContentClass} style={style ?? undefined} ref={modalRef} data-bs-theme={mode}>
                {title && (
                    <div className={modalHeaderClass}>
                        <h5 className="modal-title-custom">{title}</h5>
                        <div className="header-elements-custom">{headerElements}</div>
                        <button className="btn btn-icon btn-active-light-primary ms-2" onClick={() => dispatch(closeModal())} aria-label="Close">
                            <CloseRounded path="media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" /* NOSONAR*/ />
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}
