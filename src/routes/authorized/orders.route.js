/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').orders

router.post('/createOrder', permit(['_a']), controller.createOrder)
router.post('/getOrdersWithFullDetails', permit(['_a']), controller.getOrdersWithFullDetails)
router.post('/updateOrder', permit(['_a']), controller.updateOrder)
router.post('/removeOrder', permit(['_a']), controller.removeOrder)
router.post('/getOrdersList', permit(['_a']), controller.getOrdersList)
router.post('/findOrderById', permit(['_a']), controller.findOrderById)


module.exports = router
