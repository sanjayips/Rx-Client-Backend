/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').lexicons

router.post('/createLexicon', permit(['_a']), controller.createLexicon)
router.post('/getLexiconsWithFullDetails', permit(['_a']), controller.getLexiconsWithFullDetails)
router.post('/updateLexicon', permit(['_a']), controller.updateLexicon)
router.post('/removeLexicon', permit(['_a']), controller.removeLexicon)
router.post('/getLexiconsList', permit(['_a']), controller.getLexiconsList)
router.post('/findLexiconById', permit(['_a']), controller.findLexiconById)


module.exports = router
