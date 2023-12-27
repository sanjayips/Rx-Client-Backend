/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').feedbacks

router.post('/createPublicFeedback', controller.createPublicFeedback)



module.exports = router
