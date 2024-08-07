import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../helpers'
import { LayoutSetup, useLayout } from '../../core'
import Header from './Header'
import { Navbar } from './Navbar'

export default function HeaderWrapper() {
    const { config, classes } = useLayout()
    if (config.app?.header?.default?.container === 'fluid') {
        LayoutSetup.classes.headerContainer.push('container-fluid')
    } else {
        LayoutSetup.classes.headerContainer.push('container-xxl')
    }
    if (!config.app?.header?.display) {
        return null
    }

    return (
        <div id="kt_app_header" className="app-header">
            <div id="kt_app_header_container" className={clsx('app-container', classes.headerContainer.join(' '), config.app?.header?.default?.containerClass)}>
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
                    <Link to="/dashboard">
                        {config.layoutType === 'dark-header' ? (
                            <img alt="Logo" src={toAbsoluteUrl('media/logos/logo-dark.png')} className="h-60px h-lg-60px app-sidebar-logo-default app-sidebar-logo-default" />
                        ) : (
                            <>
                                <img alt="Logo" src={toAbsoluteUrl('media/logos/flow-map-long.png')} className="h-60px h-lg-60px app-sidebar-logo-default theme-light-show" />
                                <img alt="Logo" src={toAbsoluteUrl('media/logos/flow-map-long.png')} className="h-60px h-lg-60px app-sidebar-logo-default theme-dark-show" />
                            </>
                        )}
                    </Link>
                </div>

                <div id="kt_app_header_wrapper" className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                    {config.app.header.default?.content === 'menu' && config.app.header.default.menu?.display && (
                        <div
                            className="app-header-menu app-header-mobile-drawer align-items-stretch"
                            data-kt-drawer="true"
                            data-kt-drawer-name="app-header-menu"
                            data-kt-drawer-activate="{default: true, lg: false}"
                            data-kt-drawer-overlay="true"
                            data-kt-drawer-width="225px"
                            data-kt-drawer-direction="end"
                            data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                            data-kt-swapper="true"
                            data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                            data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                            <Header />
                        </div>
                    )}
                    <Navbar />
                </div>
            </div>
        </div>
    )
}
