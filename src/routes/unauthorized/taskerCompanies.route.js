/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()


const controller = require('../../controllers').taskerCompanies

router.post('/getTaskerCompaniesList', controller.getTaskerCompaniesList)



module.exports = router
