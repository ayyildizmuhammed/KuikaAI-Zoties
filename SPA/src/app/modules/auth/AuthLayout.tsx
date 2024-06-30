import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { useThemeMode } from '../../../_metronic/partials'

const AuthLayout = () => {
    const { mode } = useThemeMode()

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
            {/* begin::Body */}

            <div
                className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
                style={{
                    backgroundColor: mode === 'light' ? '#ffffff' : 'inherit' // Or your default dark color
                }}>
                {/* begin::Form */}
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                    {/* begin::Wrapper */}
                    <div className="w-lg-500px p-10">
                        <Outlet />
                    </div>
                    {/* end::Wrapper */}
                </div>
                {/* end::Form */}

                {/* begin::Footer */}
                <div className="d-flex flex-center flex-wrap px-5">
                    {/* begin::Links */}
                    <div className="d-flex fw-semibold text-primary fs-base">
                        <a href="#" className="px-5" target="_blank">
                            Terms
                        </a>

                        <a href="#" className="px-5" target="_blank">
                            Plans
                        </a>

                        <a href="#" className="px-5" target="_blank">
                            Contact Us
                        </a>
                    </div>
                    {/* end::Links */}
                </div>
                {/* end::Footer */}
            </div>
            {/* end::Body */}

            {/* begin::Aside */}
            <div
                className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
                style={{ backgroundImage: `url(${toAbsoluteUrl('media/misc/auth-side-bg.png')})`, opacity: 0.8 }}>
            </div>
            {/* end::Aside */}
        </div>
    )
}

export { AuthLayout }
