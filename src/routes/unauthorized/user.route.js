/**
 * Created by Mb
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').user

router.post('/signup', controller.signup)
router.post('/signin', controller.signin)

router.post('/forgot-password', controller.forgotPassword)
router.post('/verify-code', controller.verifyCode)
router.post('/verifyPhoneNumber', controller.verifyPhoneNumber)
router.post('/sendVerificationEmail', controller.sendVerificationEmail)
router.get('/as', controller.AS)
router.post('/jobapplicantsignup', controller.jobapplicantsignup)



module.exports = router;
