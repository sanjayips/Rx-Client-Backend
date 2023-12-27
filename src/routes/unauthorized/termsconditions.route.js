/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').termsconditions


router.post('/getTermsWithFullDetailsPublic', controller.getTermsWithFullDetails)



module.exports = router
