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


const jobBidHelper = require('../helpers/jobBids.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createJobBid = async (req, res) => {
    console.log('createJobBid')
    try {
        var jobBidData = req.body
        var role = req.token_decoded.r
        jobBidData.addedby = req.token_decoded.d

        
            var result = await jobBidHelper.createJobBid(jobBidData)
            var message = "JobBid created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getJobBidsWithFullDetails = async (req, res) => {
    console.log("getJobBidsWithFullDetails called")
    var jobBidData = req.body


    try {

        var result = await jobBidHelper.getJobBidsWithFullDetails(jobBidData.sortproperty, jobBidData.sortJobBid, jobBidData.offset, jobBidData.limit, jobBidData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getJobBidsList = async (req, res) => {
    console.log("getJobBidsList called")
    var jobBidData = req.body


    try {

        var result = await jobBidHelper.getJobBidsList(jobBidData.sortproperty, jobBidData.sortJobBid, jobBidData.offset, jobBidData.limit, jobBidData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateJobBid = async (req, res) => {
    console.log("request received for updateJobBid")

    var jobBidData = req.body
    var role = req.token_decoded.r
    try {
        jobBidData.lastModifiedBy = req.token_decoded.d
        
            var result = await jobBidHelper.updateJobBid(jobBidData)
            var message = 'JobBid Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeJobBid = async (req, res) => {
    console.log("removeJobBid called")
    try {
        var role = req.token_decoded.r

       
            var jobBidData = req.body
            jobBidData.lastModifiedBy = req.token_decoded.d
            var result = await jobBidHelper.removeJobBid(jobBidData)

            var message = "JobBid removed successfully"

            if (result == "JobBid does not exists.") {
                message = "JobBid does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findJobBidById = async (req, res) => {
    console.log("findJobBidById called")
    try {
        var role = req.token_decoded.r

        
            var jobBidData = req.body

            var result = await jobBidHelper.findJobBidById(jobBidData)
            console.log(result)
            var message = "JobBid find successfully"
            if (result == null) {
                message = "JobBid does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createJobBid,
    getJobBidsWithFullDetails,
    getJobBidsList,
    updateJobBid,
    removeJobBid,
    findJobBidById

}



