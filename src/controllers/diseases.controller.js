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


const diseaseHelper = require('../helpers/diseases.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDisease = async (req, res) => {
    console.log('createDisease')
    try {
        var diseaseData = req.body
        var role = req.token_decoded.r
        diseaseData.addedby = req.token_decoded.d

        
            var result = await diseaseHelper.createDisease(diseaseData)
            var message = "Disease created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDiseasesWithFullDetails = async (req, res) => {
    console.log("getDiseasesWithFullDetails called")
    var diseaseData = req.body


    try {

        var result = await diseaseHelper.getDiseasesWithFullDetails(diseaseData.sortproperty, diseaseData.sortorder, diseaseData.offset, diseaseData.limit, diseaseData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDiseasesList = async (req, res) => {
    console.log("getDiseasesList called")
    var diseaseData = req.body


    try {

        var result = await diseaseHelper.getDiseasesList(diseaseData.sortproperty, diseaseData.sortorder, diseaseData.offset, diseaseData.limit, diseaseData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDisease = async (req, res) => {
    console.log("request received for updateDisease")

    var diseaseData = req.body
    var role = req.token_decoded.r
    try {
        diseaseData.lastModifiedBy = req.token_decoded.d
        
            var result = await diseaseHelper.updateDisease(diseaseData)
            var message = 'Disease Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDisease = async (req, res) => {
    console.log("removeDisease called")
    try {
        var role = req.token_decoded.r

       
            var diseaseData = req.body
            diseaseData.lastModifiedBy = req.token_decoded.d
            var result = await diseaseHelper.removeDisease(diseaseData)

            var message = "Disease removed successfully"

            if (result == "Disease does not exists.") {
                message = "Disease does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDiseaseById = async (req, res) => {
    console.log("findDiseaseById called")
    try {
        var role = req.token_decoded.r

        
            var diseaseData = req.body

            var result = await diseaseHelper.findDiseaseById(diseaseData)
            console.log(result)
            var message = "Disease find successfully"
            if (result == null) {
                message = "Disease does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDisease,
    getDiseasesWithFullDetails,
    getDiseasesList,
    updateDisease,
    removeDisease,
    findDiseaseById

}



