/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskerCompanies

router.post('/createTaskerCompany', permit(['_a']), controller.createTaskerCompany)
router.post('/getTaskerCompaniesWithFullDetails', permit(['_a']), controller.getTaskerCompaniesWithFullDetails)
router.post('/updateTaskerCompany', permit(['_a']), controller.updateTaskerCompany)
router.post('/removeTaskerCompany', permit(['_a']), controller.removeTaskerCompany)

router.post('/findTaskerCompanyById', permit(['_a']), controller.findTaskerCompanyById)


module.exports = router
