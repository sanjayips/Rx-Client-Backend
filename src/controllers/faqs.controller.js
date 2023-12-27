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

const faqHelper = require('../helpers/faqs.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createFaq = async (req, res) => {
    console.log('createFaq')
    try {
        var faqData = req.body
        var role = req.token_decoded.r
        faqData.addedby = req.token_decoded.d

        
            var result = await faqHelper.createFaq(faqData)
            var message = "Faq created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getFaqsWithFullDetails = async (req, res) => {
    console.log("getFaqsWithFullDetails called")
    var faqData = req.body


    try {

        var result = await faqHelper.getFaqsWithFullDetails(faqData.sortproperty, faqData.sortFaq, faqData.offset, faqData.limit, faqData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getFaqsList = async (req, res) => {
    console.log("getFaqsList called")
    var faqData = req.body


    try {

        var result = await faqHelper.getFaqsList(faqData.sortproperty, faqData.sortFaq, faqData.offset, faqData.limit, faqData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateFaq = async (req, res) => {
    console.log("request received for updateFaq")

    var faqData = req.body
    var role = req.token_decoded.r
    try {
        faqData.lastModifiedBy = req.token_decoded.d
        
            var result = await faqHelper.updateFaq(faqData)
            var message = 'Faq Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeFaq = async (req, res) => {
    console.log("removeFaq called")
    try {
        var role = req.token_decoded.r

       
            var faqData = req.body
            faqData.lastModifiedBy = req.token_decoded.d
            var result = await faqHelper.removeFaq(faqData)

            var message = "Faq removed successfully"

            if (result == "Faq does not exists.") {
                message = "Faq does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findFaqById = async (req, res) => {
    console.log("findFaqById called")
    try {
        var role = req.token_decoded.r

        
            var faqData = req.body

            var result = await faqHelper.findFaqById(faqData)
            console.log(result)
            var message = "Faq find successfully"
            if (result == null) {
                message = "Faq does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createFaq,
    getFaqsWithFullDetails,
    getFaqsList,
    updateFaq,
    removeFaq,
    findFaqById

}



