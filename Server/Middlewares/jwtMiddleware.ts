import { expressjwt } from 'express-jwt'

export const jwtMiddleware = expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
    requestProperty: 'auth'
}).unless({ path: ['/api/login', '/api/register'] })
