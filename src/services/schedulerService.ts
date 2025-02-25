import schedule from 'node-schedule'
import { generateFunFact } from './funfactService'
import prisma from '../config/database'

export const scheduleFunFacts = async () => {
    // Récupérer les langues actives
    const activeLanguages = await prisma.language.findMany({
        where: { isActive: true },
    })

    // Planifier à 8h et 20h tous les jours
    schedule.scheduleJob('0 8 * * *', () => generateFunFact(activeLanguages))
    schedule.scheduleJob('0 20 * * *', () => generateFunFact(activeLanguages))
}
