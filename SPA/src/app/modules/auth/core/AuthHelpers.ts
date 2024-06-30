/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'zot-auth'
const getAuth = (): AuthModel | undefined => {
    if (!localStorage) {
        return
    }

    const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (!lsValue) {
        return
    }

    try {
        const auth: AuthModel = JSON.parse(lsValue)
        if (auth?.api_token && !isTokenExpired(auth.api_token)) {
            return auth
        } else {
            // Token is expired, remove it
            localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
            console.log('Token has expired or is invalid')
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

const setAuth = (auth: AuthModel) => {
    if (!localStorage) {
        return
    }

    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

const removeAuth = () => {
    if (!localStorage) {
        return
    }

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}

export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: { headers: { Authorization: string } }) => {
            const auth = getAuth()
            if (auth?.api_token) {
                config.headers.Authorization = `Bearer ${auth.api_token}`
            }

            return config
        },
        (err: any) => Promise.reject(err)
    )
}

function isTokenExpired(token) {
    const decodedToken = decodeJWT(token)
    if (!decodedToken) {
        return true // Token is invalid
    }

    const currentTime = Date.now() / 1000 // Convert to seconds
    return decodedToken.exp < currentTime
}

function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )

        return JSON.parse(jsonPayload)
    } catch (error) {
        console.error('Error decoding JWT', error)
        return null
    }
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY }
