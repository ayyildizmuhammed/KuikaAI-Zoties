// src/routes/authRoutes.ts
import { Router } from 'express'
import { Container } from 'typedi'
import { AuthController } from '../Controllers/Authentication/AuthController'

const router = Router()

// AuthController'ı Container üzerinden al
const authController = Container.get(AuthController)

router.post('/authenticate', (req, res) => authController.authenticate(req, res))
router.post('/verify-token', (req, res) => authController.verifyToken(req, res))

export default router
