/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').tickers

router.post('/getTickersWithFullDetailsPublic', controller.getTickersWithFullDetailsPublic)



module.exports = router
