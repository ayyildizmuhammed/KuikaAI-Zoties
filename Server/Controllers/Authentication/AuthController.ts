// src/controllers/AuthController.ts
import { Request, Response } from 'express'
import { Service } from 'typedi'
import { AuthenticationService } from '../../Services/Auth/AuthenticationService'

@Service()
export class AuthController {
    constructor(private authService: AuthenticationService) {}

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).json({ message: 'Invalid request body. Email and password is required.' })
        }

        try {
            const user = await this.authService.validateUser(email, password)
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }

            const account = await this.authService.getUserAccount(user.id)
            if (!account) {
                return res.status(401).json({ message: 'Invalid account.' })
            }

            const token = this.authService.createToken({
                id: user.id,
                email: user.email,
                roles: user.roles,
                fullname: user.fullname,
            })

            //assigns session properties
            req.session.account = account
            req.session.user = user
            req.session.token = token

            return res.json({ api_token: token })
        } catch (error) {
            console.error(error)
            return res.status(401).json({ message: 'Authentication failed', error })
        }
    }

    // verify token and return authenticated user
    async verifyToken(req: Request, res: Response) {
        const token = req.body.api_token
        if (!token) {
            return res.status(400).json({ message: 'Invalid request body. Token is required.' })
        }

        try {
            const payload = this.authService.verifyToken(token)
            return res.json(payload)
        } catch (error) {
            console.error(error)
            return res.status(401).json({ message: 'Token verification failed', error })
        }
    }
}
