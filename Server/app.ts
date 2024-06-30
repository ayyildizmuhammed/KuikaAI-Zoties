import express, { Express } from 'express'
import authRoutes from './Routes/AuthRoutes'
import analysisRoutes from './Routes/AnalysisRoutes'

import { AUTHENTICATED_USER_KEY, AuthenticatedUser } from './CommonModels/Auth/AuthenticatedUser'
import { Account } from './CommonModels/Account'
import { addApplicationDbContextService } from './Dal/ApplicationDbContext'
import addGraphQLService from './Graphql/GraphQLService'
import cors from 'cors'
import Container from 'typedi'
import session from 'express-session'
import bodyParser from 'body-parser'
const fileUpload = require('express-fileupload');

//https://akoskm.com/how-to-use-express-session-with-custom-sessiondata-typescript
declare module 'express-session' {
    interface SessionData {
        user: AuthenticatedUser
        account: Account
        token: any
    }
}

const app: Express = express()

app.use(cors())

app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }))

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(fileUpload())
app.use(express.json())

app.use((req, res, next) => {
    const requestId = Math.random().toString(36)
    const requestContainer = Container.of(requestId)
    requestContainer.set('requestId', requestId)
    if (req.session.user) {
        requestContainer.set(AUTHENTICATED_USER_KEY as any, req.session.user)
    }

    req.container = requestContainer

    res.on('finish', () => {
        Container.reset(requestId)
    })

    next()
})

// Auth routes
app.use('/api/auth', authRoutes)
app.use('/api/analysis', analysisRoutes)

//Services
addApplicationDbContextService(Container)
addGraphQLService(app)

export default app
