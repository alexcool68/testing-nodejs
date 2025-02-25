import prisma from '../config/database'

// Liste de fun facts de base (à enrichir ou remplacer par une API externe)
const funFactBase = [
    'The shortest war in history lasted 38 minutes',
    'Honey never spoils',
    // ...
]

export const generateFunFact = async (languages: { code: string }[]) => {
    const randomFact =
        funFactBase[Math.floor(Math.random() * funFactBase.length)]

    // Simulation de traduction (à remplacer par un vrai service de traduction)
    const translations = languages.reduce(
        (acc, lang) => ({
            ...acc,
            [lang.code]: `${randomFact} (${lang.code})`,
        }),
        {}
    )

    await prisma.fact.create({
        data: {
            content: translations,
        },
    })
}

export const getFunFacts = async () => {
    return prisma.fact.findMany({
        orderBy: { createdAt: 'desc' },
    })
}
