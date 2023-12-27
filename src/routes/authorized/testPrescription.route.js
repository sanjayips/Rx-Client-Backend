/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').testPrescriptions

router.post('/createTestPrescription', permit(['_a', '_doc']), controller.createTestPrescription)
router.post('/getTestPrescriptionsWithFullDetails', permit(['_a', '_doc']), controller.getTestPrescriptionsWithFullDetails)
router.post('/updateTestPrescription', permit(['_a', '_doc']), controller.updateTestPrescription)
router.post('/removeTestPrescription', permit(['_a', '_doc']), controller.removeTestPrescription)
router.post('/getTestPrescriptionsList', permit(['_a', '_doc']), controller.getTestPrescriptionsList)
router.post('/findTestPrescriptionById', permit(['_a', '_doc']), controller.findTestPrescriptionById)
router.post('/uploadTestReportFile', permit(['_a', '_doc', '_cust']), controller.uploadTestReportFile)


module.exports = router
