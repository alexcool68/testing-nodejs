export interface FunFactTranslation {
    [languageCode: string]: string // ex: { "en": "texte", "fr": "texte", "es": "texte" }
}

export interface FunFact {
    id: number
    content: FunFactTranslation
    createdAt: Date
    scheduledAt: Date
}
