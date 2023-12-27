/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').verifications

router.post('/sendCodeOnEmail', controller.sendCodeOnEmail)
router.post('/verifyemailCode', controller.verifyemailCode)
router.post('/sendCodeOnMobile', controller.sendCodeOnMobile)
router.post('/verifyPhoneNumber', controller.verifyPhoneNumber)



module.exports = router
