import { useEffect } from 'react'
import { ILayout, useLayout } from '../../core'
import { toAbsoluteUrl } from '../../../helpers'

export default function Footer() {
    const { config } = useLayout()
    useEffect(() => {
        updateDOM(config)
    }, [config])

    if (!config.app?.footer?.display) {
        return null
    }
    return (
        <>
            <div className="text-gray-900 order-2 order-md-1">
                <img width={40} alt="Logo" src={toAbsoluteUrl('media/logos/flow-map.png')} />
                <span className="text-muted fw-semibold me-1">Zoties {new Date().getFullYear().toString()}   &copy;</span>
            </div>
        </>
    )
}

function updateDOM(config: ILayout) {
    if (config.app?.footer?.fixed?.desktop) {
        document.body.classList.add('data-kt-app-footer-fixed', 'true')
    }

    if (config.app?.footer?.fixed?.mobile) {
        document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
    }
}
