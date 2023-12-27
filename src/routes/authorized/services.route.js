/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
var permit = require('../../middlewares').permit
const controller = require('../../controllers').services



router.post('/updateService', controller.updateService)
router.post('/approveDisapproveService', permit(['_a']), controller.approveDisapproveService)
router.post('/removeService', controller.removeService)
router.post('/getServicesWithFullDetails', controller.getServicesWithFullDetails)
router.post('/getServicesList', controller.getServicesList)

router.post('/populateDBWithSrvsPrvs', controller.populateDBWithSrvsPrvs)
router.post('/populateDBWithDoctorsPrvs', controller.populateDBWithDoctorsPrvs)
router.post('/populateDBWithLawyersPrvs', controller.populateDBWithLawyersPrvs)

router.post('/getDoctorsList', controller.getDoctorsList)


module.exports = router
