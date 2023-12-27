/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
var permit = require('../../middlewares').permit
const controller = require('../../controllers').zoho

router.post('/callZoho', permit(['_a']), controller.callZoho)



module.exports = router
