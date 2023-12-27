/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').doctorsReservations

router.post('/createDoctorReservation', permit(['_a']), controller.createDoctorReservation)
router.post('/getDoctorReservationsWithFullDetails', permit(['_a']), controller.getDoctorReservationsWithFullDetails)
router.post('/updateDoctorReservation', permit(['_a']), controller.updateDoctorReservation)
router.post('/removeDoctorReservation', permit(['_a']), controller.removeDoctorReservation)
router.post('/getDoctorReservationsList', permit(['_a']), controller.getDoctorReservationsList)
router.post('/findDoctorReservationById', permit(['_a']), controller.findDoctorReservationById)
router.post('/findFreeDoctors', permit(['_a']), controller.findFreeDoctors)


module.exports = router
