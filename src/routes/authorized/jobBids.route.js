/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').jobBids

router.post('/createJobBid', permit(['_a']), controller.createJobBid)
router.post('/getJobBidsWithFullDetails', permit(['_a']), controller.getJobBidsWithFullDetails)
router.post('/updateJobBid', permit(['_a']), controller.updateJobBid)
router.post('/removeJobBid', permit(['_a']), controller.removeJobBid)
router.post('/getJobBidsList', permit(['_a']), controller.getJobBidsList)
router.post('/findJobBidById', permit(['_a']), controller.findJobBidById)


module.exports = router
