// src/Services/AuthService.ts
import { Inject, Service } from 'typedi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticatedUser } from '../../CommonModels/Auth/AuthenticatedUser'
import { Account } from '../../CommonModels/Account'
import { ApplicationDbContext } from '../../Dal/ApplicationDbContext'

export interface AuthUser {
    id: string
    email: string
    roles: string[]
}

@Service()
export class AuthenticationService {
    private _dbContext: ApplicationDbContext
    constructor(@Inject() dbContext: ApplicationDbContext) {
        this._dbContext = dbContext
    }

    async validateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
        const user = await this._dbContext.UserModel.findOne({ email: email })
        if (!user) {
            return null
        }
        // const isMatch = await bcrypt.compare(password, user.password)
        const isMatch = password === user.password

        if (isMatch) {
            return {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                roles: user.roles,
                accountName: "motus",
            }
        } else {
            return null
        }
    }

    async getUserAccount(accountId: string): Promise<Account | null> {
        return { licence: '1234' }
    }

    createToken(user: { id: string; email: string; roles: string[], fullname: string }): string {
        return jwt.sign(
            {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                roles: user.roles
            },
            process.env.JWT_SECRET!,
            { expiresIn: '12h' }
        )
    }

    verifyToken(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, process.env.JWT_SECRET!)
    }
}
