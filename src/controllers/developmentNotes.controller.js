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

const developmentNoteHelper = require('../helpers/developmentNotes.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDevelopmentNote = async (req, res) => {
    console.log('createDevelopmentNote')
    try {
        var developmentNoteData = req.body
        var role = req.token_decoded.r
        developmentNoteData.addedby = req.token_decoded.d

        
            var result = await developmentNoteHelper.createDevelopmentNote(developmentNoteData)
            var message = "DevelopmentNote created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDevelopmentNotesWithFullDetails = async (req, res) => {
    console.log("getDevelopmentNotesWithFullDetails called")
    var developmentNoteData = req.body


    try {

        var result = await developmentNoteHelper.getDevelopmentNotesWithFullDetails(developmentNoteData.sortproperty, developmentNoteData.sortorder, developmentNoteData.offset, developmentNoteData.limit, developmentNoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDevelopmentNotesList = async (req, res) => {
    console.log("getDevelopmentNotesList called")
    var developmentNoteData = req.body


    try {

        var result = await developmentNoteHelper.getDevelopmentNotesList(developmentNoteData.sortproperty, developmentNoteData.sortorder, developmentNoteData.offset, developmentNoteData.limit, developmentNoteData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDevelopmentNote = async (req, res) => {
    console.log("request received for updateDevelopmentNote")

    var developmentNoteData = req.body
    
    try {
        developmentNoteData.lastModifiedBy = req.token_decoded.d
        
            var result = await developmentNoteHelper.updateDevelopmentNote(developmentNoteData)
            var message = 'DevelopmentNote Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDevelopmentNote = async (req, res) => {
    console.log("removeDevelopmentNote called")
    try {
              
            var developmentNoteData = req.body
            developmentNoteData.lastModifiedBy = req.token_decoded.d
            var result = await developmentNoteHelper.removeDevelopmentNote(developmentNoteData)

            var message = "DevelopmentNote removed successfully"

            if (result == "DevelopmentNote does not exists.") {
                message = "DevelopmentNote does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDevelopmentNoteById = async (req, res) => {
    console.log("findDevelopmentNoteById called")
    try {
        var role = req.token_decoded.r

        
            var developmentNoteData = req.body

            var result = await developmentNoteHelper.findDevelopmentNoteById(developmentNoteData)
            console.log(result)
            var message = "DevelopmentNote find successfully"
            if (result == null) {
                message = "DevelopmentNote does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDevelopmentNote,
    getDevelopmentNotesWithFullDetails,
    getDevelopmentNotesList,
    updateDevelopmentNote,
    removeDevelopmentNote,
    findDevelopmentNoteById

}



