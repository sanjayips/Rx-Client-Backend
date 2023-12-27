/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').questions

router.post('/createQuestion', permit(['_a']), controller.createQuestion)
router.post('/getQuestionsWithFullDetails', permit(['_a']), controller.getQuestionsWithFullDetails)
router.post('/updateQuestion', permit(['_a']), controller.updateQuestion)
router.post('/removeQuestion', permit(['_a']), controller.removeQuestion)
router.post('/getQuestionsList', permit(['_a']), controller.getQuestionsList)
router.post('/findQuestionById', permit(['_a']), controller.findQuestionById)


module.exports = router
