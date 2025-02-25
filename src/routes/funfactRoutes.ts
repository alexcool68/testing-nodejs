import express from 'express'
import {
    createFunFact,
    getAllFunFacts,
    addLanguage,
    removeLanguage,
    generateGrokFunFact,
} from '../controllers/funfactController'

const router = express.Router()

router.post('/funfacts', createFunFact)
router.get('/funfacts', getAllFunFacts)
router.get('/grokGenerate', generateGrokFunFact)
router.post('/languages', addLanguage)
router.delete('/languages/:code', removeLanguage)

export default router
