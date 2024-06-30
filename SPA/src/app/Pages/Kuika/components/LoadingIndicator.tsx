import React, { CSSProperties } from 'react'
import { Spinner } from 'react-bootstrap'

interface LoadingIndicatorProps {
    isLoading: boolean
    size?: 'sm' | 'lg' // Spinner için boyut
    position?: 'fixed' | 'relative' | 'center' // Konumlandırma
    blurBackground?: boolean // Arka planı bulanıklaştır
    message?: string // Gösterilecek mesaj
}

const largeSpinnerStyle: CSSProperties = {
    width: '3rem',
    height: '3rem'
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    isLoading,
    size = 'lg',
    position = 'center',
    blurBackground = false,
    message = 'Processing analysis document, please wait...' // Varsayılan mesaj
}) => {
    if (!isLoading) return null

    const spinnerStyle: CSSProperties =
        position === 'center'
            ? {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1050,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
              }
            : {
                  position: position as 'fixed' | 'relative',
                  zIndex: 1050,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
              }

    const overlayStyle: CSSProperties = blurBackground
        ? {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(1px)',
              zIndex: 1049,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }
        : {}

    const renderSpinner = () => (
        <div style={spinnerStyle}>
            <Spinner animation="border" variant="primary" style={size === 'lg' ? largeSpinnerStyle : {}} />
            <div style={{ marginTop: '1rem', color: '#007bff', fontSize: '1.5rem', textAlign: 'center' }}>{message}</div>
        </div>
    )

    return blurBackground ? <div style={overlayStyle}>{renderSpinner()}</div> : renderSpinner()
}
