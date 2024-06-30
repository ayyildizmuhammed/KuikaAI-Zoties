import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageDataProvider } from './core'
import { reInitMenu } from '../helpers'
import HeaderWrapper from './components/header/HeaderWrapper'
import FooterWrapper from './components/footer/FooterWrapper'
import { RootState } from '../../app/redux/reducers/rootReducer'
import { useSelector } from 'react-redux'
import ModalRenderer from '../../app/modules/common/ModalRenderer'

export default function MasterLayout() {
    const location = useLocation()
    const { isModalOpen, modalName } = useSelector((state: RootState) => state.modalReducer)

    useEffect(() => {
        reInitMenu()
    }, [location.key])

    return (
        <PageDataProvider>
            {isModalOpen && ModalRenderer.renderModal(modalName)}
            <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                    <HeaderWrapper />
                    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                            <div className="d-flex flex-column flex-column-fluid">
                                <Outlet />
                            </div>
                            <FooterWrapper />
                        </div>
                    </div>
                </div>
            </div>
        </PageDataProvider>
    )
}
