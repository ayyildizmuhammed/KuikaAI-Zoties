import { Link as RouterLink, useLocation } from 'react-router-dom'

export interface PageHeaderWrapperProps {
    navigations?: { title: string; path: string }[]
    imagePath: string
    infoComponent: JSX.Element
}

export default function PageHeaderWrapper({ navigations, imagePath, infoComponent }: Readonly<PageHeaderWrapperProps>) {
    const location = useLocation()
    const logoWidthAndHeight = 100
    return (
        <div className="card">
            <div className="card-body pt-9 pb-0">
                {/* Main Flex Container */}
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap" style={{ marginBottom: 5 }}>
                        <img width={logoWidthAndHeight} height={logoWidthAndHeight} alt="Logo" src={imagePath} style={{ borderRadius: 10, marginRight: 20 }} />
                        {infoComponent}
                    </div>
                </div>

                {/* Conditional rendering for navigations */}
                <div className="d-flex overflow-auto h-55px">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                        {navigations.map(nav => {
                            const isActive = location.pathname === nav.path
                            // console.log('isActive', isActive)
                            // console.log('location.pathname', location.pathname)
                            // console.log('nav.path', nav.path)
                            return (
                                <li className="nav-item" key={nav.path}>
                                    <RouterLink className={`nav-link text-active-primary me-6 ${isActive ? 'active' : ''}`} to={nav.path}>
                                        {nav.title}
                                    </RouterLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
