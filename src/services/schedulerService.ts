import schedule from 'node-schedule'
import { generateFunFact } from './funfactService'

export const scheduleFunFacts = async () => {
    // Planifier à 8h et 20h tous les jours
    schedule.scheduleJob('0 8 * * *', () => generateFunFact())
    schedule.scheduleJob('0 20 * * *', () => generateFunFact())
}
