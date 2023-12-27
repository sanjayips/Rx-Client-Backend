/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').medicinePrescriptions

router.post('/createMedicinePrescription', permit(['_a', '_doc']), controller.createMedicinePrescription)
router.post('/getMedicinePrescriptionsWithFullDetails', permit(['_a', '_doc']), controller.getMedicinePrescriptionsWithFullDetails)
router.post('/updateMedicinePrescription', permit(['_a', '_doc']), controller.updateMedicinePrescription)
router.post('/removeMedicinePrescription', permit(['_a', '_doc']), controller.removeMedicinePrescription)
router.post('/getMedicinePrescriptionsList', permit(['_a', '_doc']), controller.getMedicinePrescriptionsList)
router.post('/findMedicinePrescriptionById', permit(['_a', '_doc']), controller.findMedicinePrescriptionById)


module.exports = router
