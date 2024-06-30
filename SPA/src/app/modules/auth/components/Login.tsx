import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { useAuth } from '../core/Auth'
import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Wrong email format').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Email is required'),
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Password is required')
})

const initialValues = {
    email: 'zoties@kuika.com',
    password: '1234'
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
    const [loading, setLoading] = useState(false)
    const { saveAuth, setCurrentUser } = useAuth()
    const intl = useIntl()
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            try {
                const { data: auth } = await login(values.email, values.password)
                saveAuth(auth)
                const { data: user } = await getUserByToken(auth.api_token)
                setCurrentUser(user)
            } catch (error) {
                console.error(error)
                saveAuth(undefined)
                setStatus('The login details are incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        }
    })

    return (
        <form className="form w-100" onSubmit={formik.handleSubmit} noValidate id="kt_login_signin_form">
            {/* begin::Heading */}
            <div className="text-center mb-11">
                <Link to="/" className="mb-12">
                    <img alt="Logo" src={toAbsoluteUrl('media/logos/flow-map-long.png')} className="h-150px" />
                </Link>
            </div>
            {/* begin::Heading */}

            {/* begin::Separator */}
            <div className="separator separator-content my-14">
                <span className="w-125px text-gray-500 fw-semibold fs-7">
                    <h1 className="text-gray-900 fw-bolder mb-3 fs-2">{intl.formatMessage({ id: 'SIGN_IN' })}</h1>
                </span>
            </div>
            {/* end::Separator */}

            {formik.status ? (
                <div className="mb-lg-15 alert alert-danger">
                    <div className="alert-text font-weight-bold">{formik.status}</div>
                </div>
            ) : (
                <div className="mb-10 bg-light-danger p-8 rounded">
                    <div className="text-info fs-7">
                        Use account <strong>zoties@kuika.com</strong> and password <strong>1234</strong> to continue.
                    </div>
                </div>
            )}

            {/* begin::Form group */}
            <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">{intl.formatMessage({ id: 'EMAIL' })}</label>
                <input
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control bg-transparent',
                        { 'is-invalid': formik.touched.email && formik.errors.email },
                        {
                            'is-valid': formik.touched.email && !formik.errors.email
                        }
                    )}
                    type="email"
                    name="email"
                    autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="fv-plugins-message-container">
                        <span role="alert">{formik.errors.email}</span>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className="fv-row mb-3">
                <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">{intl.formatMessage({ id: 'PASSWORD' })}</label>
                <input
                    type="password"
                    autoComplete="off"
                    {...formik.getFieldProps('password')}
                    className={clsx(
                        'form-control bg-transparent',
                        {
                            'is-invalid': formik.touched.password && formik.errors.password
                        },
                        {
                            'is-valid': formik.touched.password && !formik.errors.password
                        }
                    )}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                            <span role="alert">{formik.errors.password}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Wrapper */}
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                <div />

                {/* begin::Link */}
                <Link to="/auth/forgot-password" className="link-primary">
                    {intl.formatMessage({ id: 'FORGOT_PASSWORD' })}
                </Link>
                {/* end::Link */}
            </div>
            {/* end::Wrapper */}

            {/* begin::Action */}
            <div className="d-grid mb-10">
                <button type="submit" id="kt_sign_in_submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
                    {!loading && <span className="indicator-label">{intl.formatMessage({ id: 'SIGN_IN' })}</span>}
                    {loading && (
                        <span className="indicator-progress" style={{ display: 'block' }}>
                            {intl.formatMessage({ id: 'PLEASE_WAIT' })}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </button>
            </div>
            {/* end::Action */}
        </form>
    )
}
