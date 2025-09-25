import express from 'express'
import operationsController from '../controllers/operationsController.js'

const router = express.Router()

router.post('/calculate', operationsController.calculate)
router.get('/history', operationsController.getHistory)
router.get('/history/:id', operationsController.getOperationById)
router.delete('/history/:id', operationsController.deleteOperation)

export default router
