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

const MedicinePrescriptionHelper = require("../helpers/medicinePrescriptions.helper")
const Appointment = mongoose.model('appointments')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createMedicinePrescription = async (req, res) => {
    console.log('createMedicinePrescription')
    try {
        var medicinePrescriptionData = req.body
        medicinePrescriptionData.addedby = req.token_decoded.d

        
            var newPrescription = await MedicinePrescriptionHelper.createMedicinePrescription(medicinePrescriptionData)

            var appointment = await Appointment.findById(medicinePrescriptionData.appointmentid)

            appointment.medicinePrescriptions.push(newPrescription._id)

            await appointment.save()

            var message = "MedicinePrescription added successfully"
            return responseHelper.success(res, newPrescription, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getMedicinePrescriptionsWithFullDetails = async (req, res) => {
    console.log("getMedicinePrescriptionsWithFullDetails called")
    var medicinePrescriptionData = req.body


    try {

        var result = await MedicinePrescriptionHelper.getMedicinePrescriptionsWithFullDetails(medicinePrescriptionData.sortproperty, medicinePrescriptionData.sortorder, medicinePrescriptionData.offset, medicinePrescriptionData.limit, medicinePrescriptionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getMedicinePrescriptionsList = async (req, res) => {
    console.log("getMedicinePrescriptionsList called")
    var medicinePrescriptionData = req.body


    try {

        var result = await MedicinePrescriptionHelper.getMedicinePrescriptionsList(medicinePrescriptionData.sortproperty, medicinePrescriptionData.sortorder, medicinePrescriptionData.offset, medicinePrescriptionData.limit, medicinePrescriptionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateMedicinePrescription = async (req, res) => {
    console.log("request received for updateMedicinePrescription")

    var medicinePrescriptionData = req.body
    var role = req.token_decoded.r
    try {
        medicinePrescriptionData.lastModifiedBy = req.token_decoded.d
        
            var result = await MedicinePrescriptionHelper.updateMedicinePrescription(medicinePrescriptionData)
            var message = 'MedicinePrescription Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeMedicinePrescription = async (req, res) => {
    console.log("removeMedicinePrescription called")
    try {
        var role = req.token_decoded.r

       
            var medicinePrescriptionData = req.body
            medicinePrescriptionData.lastModifiedBy = req.token_decoded.d
            var result = await MedicinePrescriptionHelper.removeMedicinePrescription(medicinePrescriptionData)

            var message = "MedicinePrescription removed successfully"

            if (result == "MedicinePrescription does not exists.") {
                message = "MedicinePrescription does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findMedicinePrescriptionById = async (req, res) => {
    console.log("findMedicinePrescriptionById called")
    try {
        var role = req.token_decoded.r

        
            var medicinePrescriptionData = req.body

            var result = await MedicinePrescriptionHelper.findMedicinePrescriptionById(medicinePrescriptionData)
            console.log(result)
            var message = "MedicinePrescription find successfully"
            if (result == null) {
                message = "MedicinePrescription does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createMedicinePrescription,
    getMedicinePrescriptionsWithFullDetails,
    getMedicinePrescriptionsList,
    updateMedicinePrescription,
    removeMedicinePrescription,
    findMedicinePrescriptionById

}



