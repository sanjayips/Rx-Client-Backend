/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').assessments

router.post('/createAssessment', permit(['_indvtskr', '_cmpntskr']), controller.createAssessment)
router.post('/getAssessmentsWithFullDetails', permit(['_indvtskr', '_cmpntskr']), controller.getAssessmentsWithFullDetails)
router.post('/updateAssessment', permit(['_indvtskr', '_cmpntskr']), controller.updateAssessment)
router.post('/removeAssessment', permit(['_indvtskr', '_cmpntskr']), controller.removeAssessment)
router.post('/getAssessmentsList', permit(['_indvtskr', '_cmpntskr']), controller.getAssessmentsList)
router.post('/findAssessmentById', permit(['_indvtskr', '_cmpntskr']), controller.findAssessmentById)


module.exports = router
