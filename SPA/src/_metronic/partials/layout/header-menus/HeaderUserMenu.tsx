import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import { toAbsoluteUrl } from '../../../helpers'
import { useIntl } from 'react-intl'

export default function HeaderUserMenu() {
    const { currentUser, logout } = useAuth()
    const intl = useIntl()
    return (
        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
            <div className="menu-item px-3">
                <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                        <img alt="Logo" src={toAbsoluteUrl('media/avatars/300-3.jpg')} />
                    </div>

                    <div className="d-flex flex-column">
                        <div className="fw-bolder d-flex align-items-center fs-5">
                            {currentUser?.fullname}
                            <span className="badge badge-light-danger fw-bolder fs-8 px-2 py-1 ms-2 me-2">Admin</span>
                        </div>
                        <p className="fw-bold text-muted text-hover-primary fs-7">{currentUser?.email}</p>
                    </div>
                </div>
            </div>

            <div className="separator my-2"></div>

            <div className="menu-item px-5">
                <Link to={'/crafted/pages/profile'} className="menu-link px-5">
                    {intl.formatMessage({ id: 'MY_PROFILE' })}
                </Link>
            </div>

            <div className="separator my-2"></div>

            <div className="menu-item px-5">
                <a onClick={logout} className="menu-link px-5" /** NOSONAR */>
                    {intl.formatMessage({ id: 'LOGOUT' })}
                </a>
            </div>
        </div>
    )
}
