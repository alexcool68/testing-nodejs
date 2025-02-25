import prisma from '../config/database'
import { JsonObject } from '@prisma/client/runtime/library'
import { promptFunFacts } from './grokService'

// Liste de fun facts de base (à enrichir ou remplacer par une API externe)
const funFactBase = [
    'The shortest war in history lasted 38 minutes',
    'Honey never spoils',
    // ...
]

export const generateFunFact = async () => {
    const languages = await prisma.language.findMany({
        where: { isActive: true },
    })
    const result: JsonObject = await promptFunFacts(languages)

    if (result.length !== 0) {
        await prisma.fact.create({
            data: { content: result },
        })
    }
}

export const getFunFacts = async () => {
    return prisma.fact.findMany({
        orderBy: { createdAt: 'desc' },
    })
}
