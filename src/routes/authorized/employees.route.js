

const express = require('express')
const router = express.Router()

const controller = require('../../controllers').employees


router.post('/createEmployee', controller.createEmployee)
router.post('/getEmployees', controller.getEmployees)
router.post('/findEmployeeById', controller.findEmployeeById)
router.post('/updateEmployee', controller.updateEmployee)

module.exports = router;
