// src/routes/AnalysisRoutes.ts
import { Router } from 'express'
import { Container } from 'typedi'
import { AnalysisController } from '../Controllers/Analysis/AnalysisController'

const router = Router()

// AnalysisController'ı Container üzerinden al
const analysisController = Container.get(AnalysisController)

router.post('/upload-document', (req, res) => analysisController.convertAnalyzedDocument(req, res))

export default router
