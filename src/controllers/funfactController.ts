import { Request, Response } from 'express'
import prisma from '../config/database'
import { generateFunFact, getFunFacts } from '../services/funfactService'
import { promptFunFacts } from '../services/grokService'
import { JsonObject } from '@prisma/client/runtime/library'

export const createFunFact = async (req: Request, res: Response) => {
    await generateFunFact()
    res.status(201).json({ message: 'Fun fact created' })
}

export const generateGrokFunFact = async (req: Request, res: Response) => {
    const languages = await prisma.language.findMany({
        where: { isActive: true },
    })
    const result: JsonObject = await promptFunFacts(languages)

    console.log(result)

    if (result.length !== 0) {
        await prisma.fact.create({
            data: { content: result },
        })
    }

    res.status(201).json({ message: 'Facts generated via Grok' })
}

export const getAllFunFacts = async (req: Request, res: Response) => {
    const funFacts = await getFunFacts()
    res.json(funFacts)
}

export const addLanguage = async (req: Request, res: Response) => {
    const { code, name } = req.body
    const language = await prisma.language.create({
        data: { code, name },
    })
    res.status(201).json(language)
}

export const removeLanguage = async (req: Request, res: Response) => {
    const { code } = req.params
    await prisma.language.update({
        where: { code },
        data: { isActive: false },
    })
    res.json({ message: 'Language deactivated' })
}
