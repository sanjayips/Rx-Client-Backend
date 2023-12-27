/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').quotes

router.post('/createQuote', controller.createQuote)

router.post('/updateQuote', controller.updateQuote)
router.post('/removeQuote', controller.removeQuote)
router.post('/getQuotesList', controller.getQuotesList)
router.post('/findQuoteById', controller.findQuoteById)


module.exports = router
