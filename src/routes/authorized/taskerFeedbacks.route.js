/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskerFeedbacks

router.post('/createTaskerFeedback', permit(['_a']), controller.createTaskerFeedback)
router.post('/getTaskerFeedbacksWithFullDetails', permit(['_a']), controller.getTaskerFeedbacksWithFullDetails)
router.post('/updateTaskerFeedback', permit(['_a']), controller.updateTaskerFeedback)
router.post('/removeTaskerFeedback', permit(['_a']), controller.removeTaskerFeedback)
router.post('/getTaskerFeedbacksList', permit(['_a']), controller.getTaskerFeedbacksList)
router.post('/findTaskerFeedbackById', permit(['_a']), controller.findTaskerFeedbackById)


module.exports = router
