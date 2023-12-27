/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').quotes


router.post('/getQuotesWithFullDetails', controller.getQuotesWithFullDetails)



module.exports = router
