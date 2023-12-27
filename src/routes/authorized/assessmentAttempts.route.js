/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').assessmentAttempts

router.post('/createAssessmentAttempt', permit(['_a', '_indvtskr', '_cmpntskr']), controller.createAssessmentAttempt)
router.post('/getAssessmentAttemptsWithFullDetails', permit(['_a', '_indvtskr', '_cmpntskr']), controller.getAssessmentAttemptsWithFullDetails)
router.post('/updateAssessmentAttempt', permit(['_a', '_indvtskr', '_cmpntskr']), controller.updateAssessmentAttempt)
router.post('/removeAssessmentAttempt', permit(['_a', '_indvtskr', '_cmpntskr']), controller.removeAssessmentAttempt)
router.post('/getAssessmentAttemptsList', permit(['_a', '_indvtskr', '_cmpntskr']), controller.getAssessmentAttemptsList)
router.post('/findAssessmentAttemptById', permit(['_a', '_indvtskr', '_cmpntskr']), controller.findAssessmentAttemptById)
router.post('/findAssessmentAttemptByTaskerId', permit(['_a', '_indvtskr', '_cmpntskr']), controller.findAssessmentAttemptByTaskerId)


module.exports = router
