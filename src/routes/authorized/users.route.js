
 
const express = require('express')
const router = express.Router()
var permit = require("../../middlewares").permit
const constants = require('../../hardCodedData').constants
const controller = require('../../controllers').user


//restricted routes

router.post('/change-password-after-code-verification', controller.changePasswordAfterVerifyingCode)
router.post('/update-profile', controller.updateprofile)
router.get('/getprofilefromid', controller.getprofilefromid)
router.post('/report-user', controller.reportUser)
router.post('/block-user', controller.blockUser)
router.post('/unblock-user', controller.unblockUser)
router.get('/get-blocked-users', controller.listBlockedUsers)
router.post('/updateprofilepic', controller.updateprofilepic)
router.post('/ageVerificationEmail', controller.ageVerificationEmail)

router.post('/listAllUsers', controller.listAllUsers)
router.post('/updateuser', controller.updateuser)
router.post('/approveDisapproveUser', controller.approveDisapproveUser)
router.post('/activeUser', controller.activeUser)
router.post('/passwordLessLogin',permit(['_a']), controller.passwordLessLogin)
router.post('/verifyToken',permit(constants.allRolesPermitted), controller.verifyToken)
router.post("/logout", controller.logout)

//test
router.post('/test-socket', controller.testSocket)
  
module.exports = router;
