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

const taskerFeedbackHelper = require('../helpers/taskerfeedbacks.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTaskerFeedback = async (req, res) => {
    console.log('createTaskerFeedback')
    try {
        var taskerFeedbackData = req.body
        var role = req.token_decoded.r
        taskerFeedbackData.addedby = req.token_decoded.d

        
            var result = await taskerFeedbackHelper.createTaskerFeedback(taskerFeedbackData)
            var message = "TaskerFeedback created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskerFeedbacksWithFullDetails = async (req, res) => {
    console.log("getTaskerFeedbacksWithFullDetails called")
    var taskerFeedbackData = req.body


    try {

        var result = await taskerFeedbackHelper.getTaskerFeedbacksWithFullDetails(taskerFeedbackData.sortproperty, taskerFeedbackData.sortTaskerFeedback, taskerFeedbackData.offset, taskerFeedbackData.limit, taskerFeedbackData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskerFeedbacksList = async (req, res) => {
    console.log("getTaskerFeedbacksList called")
    var taskerFeedbackData = req.body


    try {

        var result = await taskerFeedbackHelper.getTaskerFeedbacksList(taskerFeedbackData.sortproperty, taskerFeedbackData.sortTaskerFeedback, taskerFeedbackData.offset, taskerFeedbackData.limit, taskerFeedbackData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTaskerFeedback = async (req, res) => {
    console.log("request received for updateTaskerFeedback")

    var taskerFeedbackData = req.body
    var role = req.token_decoded.r
    try {
        taskerFeedbackData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskerFeedbackHelper.updateTaskerFeedback(taskerFeedbackData)
            var message = 'TaskerFeedback Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTaskerFeedback = async (req, res) => {
    console.log("removeTaskerFeedback called")
    try {
        var role = req.token_decoded.r

       
            var taskerFeedbackData = req.body
            taskerFeedbackData.lastModifiedBy = req.token_decoded.d
            var result = await taskerFeedbackHelper.removeTaskerFeedback(taskerFeedbackData)

            var message = "TaskerFeedback removed successfully"

            if (result == "TaskerFeedback does not exists.") {
                message = "TaskerFeedback does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskerFeedbackById = async (req, res) => {
    console.log("findTaskerFeedbackById called")
    try {
        var role = req.token_decoded.r

        
            var taskerFeedbackData = req.body

            var result = await taskerFeedbackHelper.findTaskerFeedbackById(taskerFeedbackData)
            
            var message = "TaskerFeedback find successfully"
            if (result == null) {
                message = "TaskerFeedback does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTaskerFeedback,
    getTaskerFeedbacksWithFullDetails,
    getTaskerFeedbacksList,
    updateTaskerFeedback,
    removeTaskerFeedback,
    findTaskerFeedbackById

}



