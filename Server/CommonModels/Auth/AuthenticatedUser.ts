export const AUTHENTICATED_USER_KEY = Symbol('AuthenticatedUser')

export interface AuthenticatedUser {
    id: string
    email: string
    fullname: string
    roles: string[]
    accountName: string
    auth?: {
        api_token: string
        refreshToken?: string
    }
}
