// src/types/express/index.d.ts
import 'express'
import { ContainerInstance } from 'typedi'

declare module 'express-serve-static-core' {
    interface Request {
        id: string
        container: ContainerInstance
    }
}
