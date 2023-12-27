/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').tickers

router.post('/createTicker', controller.createTicker)
router.post('/getTickersWithFullDetails', controller.getTickersWithFullDetails)
router.post('/updateTicker', controller.updateTicker)
router.post('/removeTicker', controller.removeTicker)
router.post('/getTickersList', controller.getTickersList)
router.post('/findTickerById', controller.findTickerById)


module.exports = router
