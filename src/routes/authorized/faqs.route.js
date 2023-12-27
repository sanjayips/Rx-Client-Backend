/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').faqs

router.post('/createFaq', permit(['_a']), controller.createFaq)
router.post('/getFaqsWithFullDetails', permit(['_a']), controller.getFaqsWithFullDetails)
router.post('/updateFaq', permit(['_a']), controller.updateFaq)
router.post('/removeFaq', permit(['_a']), controller.removeFaq)
router.post('/getFaqsList', permit(['_a']), controller.getFaqsList)
router.post('/findFaqById', permit(['_a']), controller.findFaqById)


module.exports = router
