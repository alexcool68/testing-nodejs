import express from 'express'
import { seedDatabase } from '../services/seedService'

const router = express.Router()

router.post('/seed', seedDatabase)

export default router
