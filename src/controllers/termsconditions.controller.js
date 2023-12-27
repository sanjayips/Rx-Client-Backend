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


const termsHelper = require('../helpers/termsconditions.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTerms = async (req, res) => {
    console.log('createTerms')
    try {
        var termsData = req.body
        var role = req.token_decoded.r
        //termsData.addedby = req.token_decoded.d

        
            var result = await termsHelper.createTerms(termsData)
            var message = "Terms created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTermsWithFullDetails = async (req, res) => {
    console.log("getTermssWithFullDetails called")
    var termsData = req.body


    try {

        var result = await termsHelper.getTermsWithFullDetails(termsData.sortproperty, termsData.sortorder, termsData.offset, termsData.limit, termsData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTermsList = async (req, res) => {
    console.log("getTermssList called")
    var termsData = req.body


    try {

        var result = await termsHelper.getTermsList(termsData.sortproperty, termsData.sortorder, termsData.offset, termsData.limit, termsData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTerms = async (req, res) => {
    console.log("request received for updateTerms")

    var termsData = req.body
    var role = req.token_decoded.r
    try {
        termsData.lastModifiedBy = req.token_decoded.d
        
            var result = await termsHelper.updateTerms(termsData)
            var message = 'Terms Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTerms = async (req, res) => {
    console.log("removeTerms called")
    try {
        var role = req.token_decoded.r

       
            var termsData = req.body
            termsData.lastModifiedBy = req.token_decoded.d
            var result = await termsHelper.removeTerms(termsData)

            var message = "Terms removed successfully"

            if (result == "Terms does not exists.") {
                message = "Terms does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTermsById = async (req, res) => {
    console.log("findTermsById called")
    try {
        var role = req.token_decoded.r

        
            var termsData = req.body

            var result = await termsHelper.findTermsById(termsData)
            console.log(result)
            var message = "Terms find successfully"
            if (result == null) {
                message = "Terms does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTerms,
    getTermsWithFullDetails,
    getTermsList,
    updateTerms,
    removeTerms,
    findTermsById

}



