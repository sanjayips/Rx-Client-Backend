/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').customers

router.post('/createCustomer', permit(['_a']), controller.createCustomer)
router.post('/getCustomersWithFullDetails', permit(['_a']), controller.getCustomersWithFullDetails)
router.post('/updateCustomer', permit(['_a']), controller.updateCustomer)
router.post('/removeCustomer', permit(['_a']), controller.removeCustomer)
router.post('/getCustomersList', permit(['_a']), controller.getCustomersList)
router.post('/findCustomerById', permit(['_a']), controller.findCustomerById)


module.exports = router
