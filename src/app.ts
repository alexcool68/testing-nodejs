import express from 'express'
import funfactRoutes from './routes/funfactRoutes'
import settingRoutes from './routes/settingRoutes'
import { scheduleFunFacts } from './services/schedulerService'

const app = express()

app.use(express.json())
app.use('/api', funfactRoutes)
app.use('/api/setting', settingRoutes)

// Lancer la planification au démarrage
console.log('Scheduling fun facts...')
scheduleFunFacts()

export default app
