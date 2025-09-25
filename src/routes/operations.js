import express from 'express'
import operationsController from '../controllers/operationsController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Protect these routes with JWT auth
router.post('/calculate', auth, operationsController.calculate)
router.get('/history', auth, operationsController.getHistory)
router.get('/history/:id', auth, operationsController.getOperationById)
router.delete('/history/:id', auth, operationsController.deleteOperation)

// Registration and login remain public
router.post('/register', operationsController.register)
router.post('/login', operationsController.login)

export default router
