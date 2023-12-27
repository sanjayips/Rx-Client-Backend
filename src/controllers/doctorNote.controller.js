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

const doctorNoteHelper = require('../helpers/doctorNotes.helper')
const Appointment = mongoose.model('appointments')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDoctorNote = async (req, res) => {
    console.log('createDoctorNote')
    try {
        var doctorNoteData = req.body
        var role = req.token_decoded.r
        doctorNoteData.addedby = req.token_decoded.d

        
            var newNote = await doctorNoteHelper.createDoctorNote(doctorNoteData)

            var appointment = await Appointment.findById(doctorNoteData.appointmentid)

            appointment.doctorNotes.push(newNote._id)

            await appointment.save()

            var message = "DoctorNote added successfully"
            return responseHelper.success(res, newNote, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDoctorNotesWithFullDetails = async (req, res) => {
    console.log("getDoctorNotesWithFullDetails called")
    var doctorNoteData = req.body


    try {

        var result = await doctorNoteHelper.getDoctorNotesWithFullDetails(doctorNoteData.sortproperty, doctorNoteData.sortorder, doctorNoteData.offset, doctorNoteData.limit, doctorNoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDoctorNotesList = async (req, res) => {
    console.log("getDoctorNotesList called")
    var doctorNoteData = req.body


    try {

        var result = await doctorNoteHelper.getDoctorNotesList(doctorNoteData.sortproperty, doctorNoteData.sortorder, doctorNoteData.offset, doctorNoteData.limit, doctorNoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDoctorNote = async (req, res) => {
    console.log("request received for updateDoctorNote")

    var doctorNoteData = req.body
    var role = req.token_decoded.r
    try {
        doctorNoteData.lastModifiedBy = req.token_decoded.d
        
            var result = await doctorNoteHelper.updateDoctorNote(doctorNoteData)
            var message = 'DoctorNote Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDoctorNote = async (req, res) => {
    console.log("removeDoctorNote called")
    try {
        var role = req.token_decoded.r

       
            var doctorNoteData = req.body
            doctorNoteData.lastModifiedBy = req.token_decoded.d
            var result = await doctorNoteHelper.removeDoctorNote(doctorNoteData)

            var message = "DoctorNote removed successfully"

            if (result == "DoctorNote does not exists.") {
                message = "DoctorNote does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDoctorNoteById = async (req, res) => {
    console.log("findDoctorNoteById called")
    try {
        var role = req.token_decoded.r

        
            var doctorNoteData = req.body

            var result = await doctorNoteHelper.findDoctorNoteById(doctorNoteData)
            console.log(result)
            var message = "DoctorNote find successfully"
            if (result == null) {
                message = "DoctorNote does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDoctorNote,
    getDoctorNotesWithFullDetails,
    getDoctorNotesList,
    updateDoctorNote,
    removeDoctorNote,
    findDoctorNoteById

}



