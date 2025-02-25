import { Request, Response } from 'express'

import prisma from '../config/database'

// const funFacts = [
//     {
//         content: {
//             en: 'The shortest war in history lasted 38 minutes',
//             fr: "La guerre la plus courte de l'histoire a duré 38 minutes",
//             es: 'La guerra más corta de la historia duró 38 minutos',
//         },
//     },
//     {
//         content: {
//             en: 'Honey never spoils',
//             fr: 'Le miel ne se gâte jamais',
//             es: 'La miel nunca se estropea',
//         },
//     },
//     {
//         content: {
//             en: 'A day on Venus is longer than its year',
//             fr: 'Un jour sur Vénus est plus long que son année',
//             es: 'Un día en Venus es más largo que su año',
//         },
//     },
// ]

const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
]

export const seedDatabase = async (req: Request, res: Response) => {
    try {
        // Supprimer les données existantes
        // await prisma.funFact.deleteMany()
        await prisma.language.deleteMany()

        // Ajouter les langues
        await Promise.all(
            languages.map((language) =>
                prisma.language.create({
                    data: language,
                })
            )
        )

        // Ajouter les fun facts
        // await Promise.all(
        //     funFacts.map((funFact) =>
        //         prisma.funFact.create({
        //             data: {
        //                 content: funFact.content,
        //                 scheduledAt: new Date(),
        //             },
        //         })
        //     )
        // )

        res.status(200).json({ message: 'Database seeded successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to seed database' })
    }
}
