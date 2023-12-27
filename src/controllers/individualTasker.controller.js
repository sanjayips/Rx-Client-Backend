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

const individualTaskerHelper = require('../helpers/individualTaskers.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createIndividualTasker = async (req, res) => {
    console.log('createIndividualTasker')
    try {
        var individualTaskerData = req.body
        var role = req.token_decoded.r
        individualTaskerData.addedby = req.token_decoded.d

        
            var result = await individualTaskerHelper.createIndividualTasker(individualTaskerData)
            var message = "IndividualTasker created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getIndividualTaskersWithFullDetails = async (req, res) => {
    console.log("getIndividualTaskersWithFullDetails called")
    var individualTaskerData = req.body


    try {

        var result = await individualTaskerHelper.getIndividualTaskersWithFullDetails(individualTaskerData.sortproperty, individualTaskerData.sortIndividualTasker, individualTaskerData.offset, individualTaskerData.limit, individualTaskerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getIndividualTaskersList = async (req, res) => {
    console.log("getIndividualTaskersList called")
    var individualTaskerData = req.body


    try {

        var result = await individualTaskerHelper.getIndividualTaskersList(individualTaskerData.sortproperty, individualTaskerData.sortIndividualTasker, individualTaskerData.offset, individualTaskerData.limit, individualTaskerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateIndividualTasker = async (req, res) => {
    console.log("request received for updateIndividualTasker")

    var individualTaskerData = req.body
    var role = req.token_decoded.r
    try {
        individualTaskerData.lastModifiedBy = req.token_decoded.d
        
            var result = await individualTaskerHelper.updateIndividualTasker(individualTaskerData)
            var message = 'IndividualTasker Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeIndividualTasker = async (req, res) => {
    console.log("removeIndividualTasker called")
    try {
        var role = req.token_decoded.r

       
            var individualTaskerData = req.body
            individualTaskerData.lastModifiedBy = req.token_decoded.d
            var result = await individualTaskerHelper.removeIndividualTasker(individualTaskerData)

            var message = "IndividualTasker removed successfully"

            if (result == "IndividualTasker does not exists.") {
                message = "IndividualTasker does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findIndividualTaskerById = async (req, res) => {
    console.log("findIndividualTaskerById called")
    try {
        var role = req.token_decoded.r

        
            var individualTaskerData = req.body

            var result = await individualTaskerHelper.findIndividualTaskerById(individualTaskerData)
            console.log(result)
            var message = "IndividualTasker find successfully"
            if (result == null) {
                message = "IndividualTasker does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createIndividualTasker,
    getIndividualTaskersWithFullDetails,
    getIndividualTaskersList,
    updateIndividualTasker,
    removeIndividualTasker,
    findIndividualTaskerById

}



