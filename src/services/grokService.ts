import axios from 'axios'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'
import { Language } from '@prisma/client'

// Configuration de l'API Grok
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions'
const GROK_API_KEY = process.env.GROK_API_KEY || ''

const grokResultJsonFormat = z.array(
    z.object({
        languageCode: z.string().describe('Code of the language'),
        content: z.string().describe('The content of the fact'),
    })
)

export const promptFunFacts = async (languages: Language[]) => {
    const langList = languages.map((languages) => languages.code).join(', ')
    try {
        const response = await axios.post(
            GROK_API_URL,
            {
                messages: [
                    {
                        role: 'system',
                        content:
                            'The answer will be fun and short enough to be adapted as a tiktok or youtube short post',
                    },
                    {
                        role: 'user',
                        content: `Generate one fun fact and translate it for each of these languages: ${langList}. Return only an array with language codes as keys and fun facts as values`,
                    },
                ],
                response_format: zodResponseFormat(
                    grokResultJsonFormat,
                    'funFacts'
                ),
                languages: languages,
                stream: false,
                model: 'grok-2-1212',
            },
            {
                headers: {
                    Authorization: `Bearer ${GROK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const result = JSON.parse(response.data.choices[0].message.content)
        return result
    } catch (error) {
        console.error('Erreur lors de la génération des fun facts:', error)
        throw new Error('Erreur lors de la génération des fun facts')
    }
}
