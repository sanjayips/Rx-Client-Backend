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


const lexiconHelper = require('../helpers/lexicon.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createLexicon = async (req, res) => {
    console.log('createLexicon')
    try {
        var lexiconData = req.body
        
        lexiconData.addedby = req.token_decoded.d

        
            var result = await lexiconHelper.createLexicon(lexiconData)
            var message = "Lexicon created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getLexiconsWithFullDetails = async (req, res) => {
    console.log("getLexiconsWithFullDetails called")
    var lexiconData = req.body


    try {

        var result = await lexiconHelper.getLexiconsWithFullDetails(lexiconData.sortproperty, lexiconData.sortorder, lexiconData.offset, lexiconData.limit, lexiconData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getLexiconsWithFullDetailsPublic = async (req, res) => {
    console.log("getLexiconsWithFullDetailsPublic called")
    var lexiconData = req.body


    try {

        var result = await lexiconHelper.getLexiconsWithFullDetails(lexiconData.sortproperty, lexiconData.sortorder, lexiconData.offset, lexiconData.limit, lexiconData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getLexiconsList = async (req, res) => {
    console.log("getLexiconsList called")
    var lexiconData = req.body


    try {

        var result = await lexiconHelper.getLexiconsList(lexiconData.sortproperty, lexiconData.sortorder, lexiconData.offset, lexiconData.limit, lexiconData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateLexicon = async (req, res) => {
    console.log("request received for updateLexicon")

    var lexiconData = req.body
    var role = req.token_decoded.r
    try {
        lexiconData.lastModifiedBy = req.token_decoded.d
        
            var result = await lexiconHelper.updateLexicon(lexiconData)
            var message = 'Lexicon Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeLexicon = async (req, res) => {
    console.log("removeLexicon called")
    try {
        var role = req.token_decoded.r

       
            var lexiconData = req.body
            lexiconData.lastModifiedBy = req.token_decoded.d
            var result = await lexiconHelper.removeLexicon(lexiconData)

            var message = "Lexicon removed successfully"

            if (result == "Lexicon does not exists.") {
                message = "Lexicon does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findLexiconById = async (req, res) => {
    console.log("findLexiconById called")
    try {
        var role = req.token_decoded.r

        
            var lexiconData = req.body

            var result = await lexiconHelper.findLexiconById(lexiconData)
            console.log(result)
            var message = "Lexicon find successfully"
            if (result == null) {
                message = "Lexicon does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createLexicon,
    getLexiconsWithFullDetails,
    getLexiconsList,
    updateLexicon,
    removeLexicon,
    findLexiconById,
    getLexiconsWithFullDetailsPublic

}



