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

const jobMessageHelper = require('../helpers/jobMessages.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createJobMessage = async (req, res) => {
    console.log('createJobMessage')
    try {
        var jobMessageData = req.body
        var role = req.token_decoded.r
        jobMessageData.addedby = req.token_decoded.d

        
            var result = await jobMessageHelper.createJobMessage(jobMessageData)
            var message = "JobMessage created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getJobMessagesWithFullDetails = async (req, res) => {
    console.log("getJobMessagesWithFullDetails called")
    var jobMessageData = req.body


    try {

        var result = await jobMessageHelper.getJobMessagesWithFullDetails(jobMessageData.sortproperty, jobMessageData.sortJobMessage, jobMessageData.offset, jobMessageData.limit, jobMessageData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getJobMessagesList = async (req, res) => {
    console.log("getJobMessagesList called")
    var jobMessageData = req.body


    try {

        var result = await jobMessageHelper.getJobMessagesList(jobMessageData.sortproperty, jobMessageData.sortJobMessage, jobMessageData.offset, jobMessageData.limit, jobMessageData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateJobMessage = async (req, res) => {
    console.log("request received for updateJobMessage")

    var jobMessageData = req.body
    var role = req.token_decoded.r
    try {
        jobMessageData.lastModifiedBy = req.token_decoded.d
        
            var result = await jobMessageHelper.updateJobMessage(jobMessageData)
            var message = 'JobMessage Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeJobMessage = async (req, res) => {
    console.log("removeJobMessage called")
    try {
        var role = req.token_decoded.r

       
            var jobMessageData = req.body
            jobMessageData.lastModifiedBy = req.token_decoded.d
            var result = await jobMessageHelper.removeJobMessage(jobMessageData)

            var message = "JobMessage removed successfully"

            if (result == "JobMessage does not exists.") {
                message = "JobMessage does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findJobMessageById = async (req, res) => {
    console.log("findJobMessageById called")
    try {
        var role = req.token_decoded.r

        
            var jobMessageData = req.body

            var result = await jobMessageHelper.findJobMessageById(jobMessageData)
            console.log(result)
            var message = "JobMessage find successfully"
            if (result == null) {
                message = "JobMessage does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createJobMessage,
    getJobMessagesWithFullDetails,
    getJobMessagesList,
    updateJobMessage,
    removeJobMessage,
    findJobMessageById

}



