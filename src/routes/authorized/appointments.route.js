/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').appointments

router.post('/createAppointment', permit(['_a', '_doc']), controller.createAppointment)
router.post('/getAppointmentsWithFullDetails', permit(['_a', '_doc']), controller.getAppointmentsWithFullDetails)
router.post('/getDoctorsEarnings', permit(['_a', '_doc']), controller.getDoctorsEarnings)
router.post('/updateAppointment', permit(['_a', '_doc']), controller.updateAppointment)
router.post('/removeAppointment', permit(['_a', '_doc']), controller.removeAppointment)
router.post('/getAppointmentsList', permit(['_a', '_doc']), controller.getAppointmentsList)
router.post('/findAppointmentById', permit(['_a', '_doc']), controller.findAppointmentById)
router.post('/getCustomersAppointments', permit(['_a', '_doc']), controller.getCustomersAppointments)
router.post('/startAppointment', permit(['_a', '_doc', '_cust']), controller.startAppointment)
router.post('/completeAppointment', permit(['_a', '_doc', '_cust']), controller.completeAppointment)
router.post('/sendMedicalCard', permit(['_a', '_doc', '_cust']), controller.sendMedicalCard)


module.exports = router
