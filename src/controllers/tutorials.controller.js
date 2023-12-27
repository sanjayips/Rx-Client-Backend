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

const tutorialHelper = require('../helpers/tutorials.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTutorial = async (req, res) => {
    console.log('createTutorial')
    try {
        var tutorialData = req.body
        var role = req.token_decoded.r
        tutorialData.addedby = req.token_decoded.d

        
            var result = await tutorialHelper.createTutorial(tutorialData)
            var message = "Tutorial created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTutorialsWithFullDetails = async (req, res) => {
    console.log("getTutorialsWithFullDetails called")
    var tutorialData = req.body


    try {

        var result = await tutorialHelper.getTutorialsWithFullDetails(tutorialData.sortproperty, tutorialData.sortTutorial, tutorialData.offset, tutorialData.limit, tutorialData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTutorialsList = async (req, res) => {
    console.log("getTutorialsList called")
    var tutorialData = req.body


    try {

        var result = await tutorialHelper.getTutorialsList(tutorialData.sortproperty, tutorialData.sortTutorial, tutorialData.offset, tutorialData.limit, tutorialData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTutorial = async (req, res) => {
    console.log("request received for updateTutorial")

    var tutorialData = req.body
    var role = req.token_decoded.r
    try {
        tutorialData.lastModifiedBy = req.token_decoded.d
        
            var result = await tutorialHelper.updateTutorial(tutorialData)
            var message = 'Tutorial Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTutorial = async (req, res) => {
    console.log("removeTutorial called")
    try {
        var role = req.token_decoded.r

       
            var tutorialData = req.body
            tutorialData.lastModifiedBy = req.token_decoded.d
            var result = await tutorialHelper.removeTutorial(tutorialData)

            var message = "Tutorial removed successfully"

            if (result == "Tutorial does not exists.") {
                message = "Tutorial does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTutorialById = async (req, res) => {
    console.log("findTutorialById called")
    try {
        var role = req.token_decoded.r

        
            var tutorialData = req.body

            var result = await tutorialHelper.findTutorialById(tutorialData)
            console.log(result)
            var message = "Tutorial find successfully"
            if (result == null) {
                message = "Tutorial does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTutorial,
    getTutorialsWithFullDetails,
    getTutorialsList,
    updateTutorial,
    removeTutorial,
    findTutorialById

}



