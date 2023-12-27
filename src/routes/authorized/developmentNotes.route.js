/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').developmentNotes

router.post('/createDevelopmentNote', permit(['_a']), controller.createDevelopmentNote)
router.post('/getDevelopmentNotesWithFullDetails', permit(['_a']), controller.getDevelopmentNotesWithFullDetails)
router.post('/updateDevelopmentNote', permit(['_a']), controller.updateDevelopmentNote)
router.post('/removeDevelopmentNote', permit(['_a']), controller.removeDevelopmentNote)
router.post('/getDevelopmentNotesList', permit(['_a']), controller.getDevelopmentNotesList)
router.post('/findDevelopmentNoteById', permit(['_a']), controller.findDevelopmentNoteById)


module.exports = router
