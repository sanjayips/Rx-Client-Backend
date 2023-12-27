/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').termsconditions

router.post('/createTerms', controller.createTerms)

router.post('/updateTerms', controller.updateTerms)
router.post('/removeTerms', controller.removeTerms)
router.post('/getTermsList', controller.getTermsList)
router.post('/findTermsById', controller.findTermsById)


module.exports = router
