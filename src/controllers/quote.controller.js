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



const quoteHelper = require('../helpers/quote.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createQuote = async (req, res) => {
    console.log('createQuote')
    try {
        var quoteData = req.body
        var role = req.token_decoded.r
        quoteData.addedby = req.token_decoded.d

        
            var result = await quoteHelper.createQuote(quoteData)
            var message = "Quote created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getQuotesWithFullDetails = async (req, res) => {
    console.log("getQuotesWithFullDetails called")
    var quoteData = req.body


    try {

        var result = await quoteHelper.getQuotesWithFullDetails(quoteData.sortproperty, quoteData.sortorder, quoteData.offset, quoteData.limit, quoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getQuotesList = async (req, res) => {
    console.log("getQuotesList called")
    var quoteData = req.body


    try {

        var result = await quoteHelper.getQuotesList(quoteData.sortproperty, quoteData.sortorder, quoteData.offset, quoteData.limit, quoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateQuote = async (req, res) => {
    console.log("request received for updateQuote")

    var quoteData = req.body
    var role = req.token_decoded.r
    try {
        quoteData.lastModifiedBy = req.token_decoded.d
        
            var result = await quoteHelper.updateQuote(quoteData)
            var message = 'Quote Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeQuote = async (req, res) => {
    console.log("removeQuote called")
    try {
        var role = req.token_decoded.r

       
            var quoteData = req.body
            quoteData.lastModifiedBy = req.token_decoded.d
            var result = await quoteHelper.removeQuote(quoteData)

            var message = "Quote removed successfully"

            if (result == "Quote does not exists.") {
                message = "Quote does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findQuoteById = async (req, res) => {
    console.log("findQuoteById called")
    try {
        var role = req.token_decoded.r

        
            var quoteData = req.body

            var result = await quoteHelper.findQuoteById(quoteData)
            console.log(result)
            var message = "Quote find successfully"
            if (result == null) {
                message = "Quote does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createQuote,
    getQuotesWithFullDetails,
    getQuotesList,
    updateQuote,
    removeQuote,
    findQuoteById

}



