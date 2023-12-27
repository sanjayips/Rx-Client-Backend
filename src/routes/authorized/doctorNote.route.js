/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').doctorNotes

router.post('/createDoctorNote', permit(['_a', '_doc']), controller.createDoctorNote)
router.post('/getDoctorNotesWithFullDetails', permit(['_a', '_doc']), controller.getDoctorNotesWithFullDetails)
router.post('/updateDoctorNote', permit(['_a', '_doc']), controller.updateDoctorNote)
router.post('/removeDoctorNote', permit(['_a', '_doc']), controller.removeDoctorNote)
router.post('/getDoctorNotesList', permit(['_a', '_doc']), controller.getDoctorNotesList)
router.post('/findDoctorNoteById', permit(['_a', '_doc']), controller.findDoctorNoteById)


module.exports = router
