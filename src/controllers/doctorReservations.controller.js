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

const doctorReservationHelper = require('../helpers/doctorReservations.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

const Doctors = mongoose.model('individualServiceProviders')

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDoctorReservation = async (req, res) => {
    console.log('createDoctorReservation')
    try {
        var doctorReservationData = req.body

        doctorReservationData.addedby = req.token_decoded.d

        let { startTime, endTime } = doctorReservationData

        let stDate = new Date(startTime)
        let enDate = new Date(endTime)

        let istDate = stDate.toISOString()
        let iendDate = enDate.toISOString()

        doctorReservationData.startTime = istDate
        doctorReservationData.endTime = iendDate

        /* 
        to be used for converting db date to response human date
        .split('/').join('-')
        const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric' }
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    const date = new Date(istDate).toLocaleDateString('en-EN', dateOptions)
    const time = new Date(istDate).toLocaleTimeString('en-EN', timeOptions)
        
        console.log(date)
        console.log(time) */

        var result = await doctorReservationHelper.createDoctorReservation(doctorReservationData)
        var message = "DoctorReservation created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDoctorReservationsWithFullDetails = async (req, res) => {
    console.log("getDoctorReservationsWithFullDetails called")
    var doctorReservationData = req.body


    try {

        var result = await doctorReservationHelper.getDoctorReservationsWithFullDetails(doctorReservationData.sortproperty, doctorReservationData.sortorder, doctorReservationData.offset, doctorReservationData.limit, doctorReservationData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDoctorReservationsList = async (req, res) => {
    console.log("getDoctorReservationsList called")
    var doctorReservationData = req.body


    try {

        var result = await doctorReservationHelper.getDoctorReservationsList(doctorReservationData.sortproperty, doctorReservationData.sortorder, doctorReservationData.offset, doctorReservationData.limit, doctorReservationData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDoctorReservation = async (req, res) => {
    console.log("request received for updateDoctorReservation")

    var doctorReservationData = req.body
    var role = req.token_decoded.r
    try {
        doctorReservationData.lastModifiedBy = req.token_decoded.d
        let { startTime, endTime } = doctorReservationData

        let stDate = new Date(startTime)
        let enDate = new Date(endTime)

        let istDate = stDate.toISOString()
        let iendDate = enDate.toISOString()

        doctorReservationData.startTime = istDate
        doctorReservationData.endTime = iendDate

        var result = await doctorReservationHelper.updateDoctorReservation(doctorReservationData)
        var message = 'DoctorReservation Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDoctorReservation = async (req, res) => {
    console.log("removeDoctorReservation called")
    try {
        var role = req.token_decoded.r


        var doctorReservationData = req.body
        doctorReservationData.lastModifiedBy = req.token_decoded.d
        var result = await doctorReservationHelper.removeDoctorReservation(doctorReservationData)

        var message = "DoctorReservation removed successfully"

        if (result == "DoctorReservation does not exists.") {
            message = "DoctorReservation does not exists."
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDoctorReservationById = async (req, res) => {
    console.log("findDoctorReservationById called")
    try {
        var role = req.token_decoded.r


        var DoctorReservationData = req.body

        var result = await doctorReservationHelper.findDoctorReservationById(DoctorReservationData)

        var message = "DoctorReservation find successfully"
        if (result == null) {
            message = "DoctorReservation does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var findFreeDoctors = async (req, res) => {
    console.log("findFreeDoctors called")
    var doctorReservationData = req.body


    try {

        var result = await doctorReservationHelper.findFreeDoctors(doctorReservationData.sortproperty, doctorReservationData.sortorder, doctorReservationData.offset, doctorReservationData.limit, doctorReservationData.query)

        let { doctorfields } = doctorReservationData.query
        doctorfields += " availableForJob"

        let alldoctors = await Doctors.find({ category: "Doctors" }).select(doctorfields)

        let availabledoctors = []
        if (result.doctorReservations.length > 0) {

            availabledoctors = result.doctorReservations.map(reservation => {
                let rsvtn = reservation.toObject()
                let { doctor } = rsvtn
                return alldoctors.filter(avlbldoctor => avlbldoctor._id != doctor && avlbldoctor.availableForJob)

            })
        } else {
            //availabledoctors.push(alldoctors)

            availabledoctors.push(alldoctors.filter(avlbldoctor => avlbldoctor.availableForJob))
        }
        let resultset = {
            doctors: availabledoctors[0],
            size: availabledoctors[0].length
        }

        var message = 'Successfully loaded'

        responseHelper.success(res, resultset, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDoctorReservation,
    getDoctorReservationsWithFullDetails,
    getDoctorReservationsList,
    updateDoctorReservation,
    removeDoctorReservation,
    findDoctorReservationById,
    findFreeDoctors

}



