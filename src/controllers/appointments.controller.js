/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const appointmentHelper = require('../helpers/appointments.helper')
const doctorReservationHelper = require('../helpers/doctorReservations.helper')
const appointmentRequestHelper = require('../helpers/appointmentRequests.helper')
const Appointment = mongoose.model('appointments')
const DoctorReservation = mongoose.model('doctorReservations')
const Customer = mongoose.model('customers')
const MedicalCard = mongoose.model('medicalCards')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createAppointment = async (req, res) => {
    console.log('createAppointment')
    try {
        var appointmentData = req.body
        appointmentData.addedby = req.token_decoded.d

        let { startTime, endTime } = appointmentData

        let stDate = new Date(startTime)
        let enDate = new Date(endTime)

        let istDate = stDate.toISOString()
        let iendDate = enDate.toISOString()

        let reservationobj = {}

        reservationobj.startTime = istDate
        reservationobj.endTime = iendDate
        reservationobj.reservationStatus = "reserved"
        reservationobj.doctor = appointmentData.doctor
        reservationobj.addedby = req.token_decoded.d


        var reservation = await doctorReservationHelper.createDoctorReservation(reservationobj)

        appointmentData.doctorsReservation = reservation._id
        
        var newappointment = await appointmentHelper.createAppointment(appointmentData) 

        const doctorReservation = await DoctorReservation.findOne({_id: reservation._id})
        doctorReservation.appointment = newappointment._id

        await doctorReservation.save()

        var result

        
        if (appointmentData.previousAppointment == undefined) {
            console.log("no previous appointment")
            const appointment = await Appointment.findOne({ _id: newappointment._id })
            appointment.previousAppointment = appointment._id
            result = await appointment.save()

        } else {
            console.log("else part called")
            result = newappointment
        }
        


            var message = "Appointment created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getAppointmentsWithFullDetails = async (req, res) => {
    console.log("getAppointmentsWithFullDetails called")
    var appointmentData = req.body


    try {

        var result = await appointmentHelper.getAppointmentsWithFullDetails(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAppointmentsList = async (req, res) => {
    console.log("getAppointmentsList called")
    var appointmentData = req.body


    try {

        var result = await appointmentHelper.getAppointmentsList(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAppointment = async (req, res) => {
    console.log("request received for updateAppointment")

    var appointmentData = req.body
    var role = req.token_decoded.r
    try {
        appointmentData.lastModifiedBy = req.token_decoded.d
        
            var result = await appointmentHelper.updateAppointment(appointmentData)
            var message = 'Appointment Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAppointment = async (req, res) => {
    console.log("removeAppointment called")
    try {
        var role = req.token_decoded.r

       
            var appointmentData = req.body
            appointmentData.lastModifiedBy = req.token_decoded.d
            var result = await appointmentHelper.removeAppointment(appointmentData)

            var message = "Appointment removed successfully"

            if (result == "Appointment does not exists.") {
                message = "Appointment does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAppointmentById = async (req, res) => {
    console.log("findAppointmentById called")
    try {
        var role = req.token_decoded.r

        
            var appointmentData = req.body

            var result = await appointmentHelper.findAppointmentById(appointmentData)
            console.log(result)
            var message = "Appointment find successfully"
            if (result == null) {
                message = "Appointment does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var getDoctorsEarnings = async (req, res) => {
    console.log("getDoctorsEarnings called")
    var appointmentData = req.body


    try {

        var result = await appointmentHelper.getDoctorsEarnings(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        
        let total = 0
        result.appointments.map(appointment => {
            let apnt = appointment.toObject()
            console.log('apnt')
            
            let {appointmentRequest} = apnt
            
            let {consultationType} = appointmentRequest

            console.log(consultationType)
            
            total += parseInt(consultationType[0].consultationFee)
        })

        result.earnings = total

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getCustomersAppointments = async (req, res) => {
    console.log("getCustomersAppointments called")
    var appointmentData = req.body

    try {

        var result = await appointmentHelper.getCustomersAppointments(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var startAppointment = async (req, res) => {
    console.log("request received for startAppointment")

    var appointmentData = req.body
    var role = req.token_decoded.r
    try {
        appointmentData.lastModifiedBy = req.token_decoded.d
        
            var appointment = await appointmentHelper.updateAppointment(appointmentData)
            var reservation = await doctorReservationHelper.updateDoctorReservation(appointmentData)
            var apntrq = await appointmentRequestHelper.updateAppointmentRequest(appointmentData)
            var message = 'Appointment Started successfully'
        

        responseHelper.success(res, {}, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var completeAppointment = async (req, res) => {
    console.log("request received for completeAppointment")

    var appointmentData = req.body
    
    try {
        appointmentData.lastModifiedBy = req.token_decoded.d
        
        var appointment = await appointmentHelper.updateAppointment(appointmentData)
        var reservation = await doctorReservationHelper.updateDoctorReservation(appointmentData)
        var apntrq = await appointmentRequestHelper.updateAppointmentRequest(appointmentData)
            var message = 'Appointment Completed successfully'
        

        responseHelper.success(res, {}, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var sendMedicalCard = async (req, res) => {
    console.log("request received for completeAppointment")

    var appointmentData = req.body

    try {
        //appointmentData.lastModifiedBy = req.token_decoded.d

        let existingcustomer = await Customer.findById(appointmentData.customer)
            .populate('user', '_id email first_name profile_picture_url')

        //console.log(existingcustomer)

        let stDate = new Date()
        let istDate = stDate.toISOString()

        let medicalCardData = {
            dateOfIssuance: istDate,
            validTillDate: appointmentData.validTillDate
        }

        let mc = new MedicalCard(medicalCardData)

        await mc.save()
        existingcustomer.medicalCards.push(mc._id)

        await existingcustomer.save()

        const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric' }
        
    const issuancedate = new Date(istDate).toLocaleDateString('en-EN', dateOptions)
    
    const validitydate = new Date(appointmentData.validTillDate).toLocaleDateString('en-EN', dateOptions)
    const customerDOB = new Date(existingcustomer.dob).toLocaleDateString('en-EN', dateOptions)
        res.mailer.send('emails/medicalcard.html', {
            customerimage: existingcustomer.user.profile_picture_url,
            customername: existingcustomer.user.first_name,
            dob: customerDOB.split('/').join('-'),
            issuanceDate: issuancedate.split('/').join('-'),
            validityDate:validitydate.split('/').join('-'),
            title: "Medical Card",
            to: "jamshaidsabir411980@gmail.com",//existingcustomer.user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Medical Card', // REQUIRED.
        }, async (err) => {
            if (err) {
                return console.error("Email could not sent: ", err)
            }
        })

        var message = 'Medical Card sent successfully'


        responseHelper.success(res, existingcustomer, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createAppointment,
    getAppointmentsWithFullDetails,
    getAppointmentsList,
    updateAppointment,
    removeAppointment,
    findAppointmentById,
    getDoctorsEarnings,
    getCustomersAppointments,
    startAppointment,
    completeAppointment,
    sendMedicalCard

}



