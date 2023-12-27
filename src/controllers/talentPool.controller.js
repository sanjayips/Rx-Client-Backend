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

const talentPoolHelper = require('../helpers/talentPool.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTalentPool = async (req, res) => {
    console.log('createTalentPool')
    try {
        var talentPoolData = req.body
        
            var result = await talentPoolHelper.createTalentPool(talentPoolData)
            var message = "TalentPool created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTalentPoolsWithFullDetails = async (req, res) => {
    console.log("getTalentPoolsWithFullDetails called")
    var talentPoolData = req.body


    try {

        var result = await talentPoolHelper.getTalentPoolsWithFullDetails(talentPoolData.sortproperty, talentPoolData.sortTalentPool, talentPoolData.offset, talentPoolData.limit, talentPoolData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTalentPoolsList = async (req, res) => {
    console.log("getTalentPoolsList called")
    var talentPoolData = req.body


    try {

        var result = await talentPoolHelper.getTalentPoolsList(talentPoolData.sortproperty, talentPoolData.sortTalentPool, talentPoolData.offset, talentPoolData.limit, talentPoolData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTalentPool = async (req, res) => {
    console.log("request received for updateTalentPool")

    var talentPoolData = req.body
    var role = req.token_decoded.r
    try {
        talentPoolData.lastModifiedBy = req.token_decoded.d
        
            var result = await talentPoolHelper.updateTalentPool(talentPoolData)
            var message = 'TalentPool Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTalentPool = async (req, res) => {
    console.log("removeTalentPool called")
    try {
        var role = req.token_decoded.r

       
            var talentPoolData = req.body
            talentPoolData.lastModifiedBy = req.token_decoded.d
            var result = await talentPoolHelper.removeTalentPool(talentPoolData)

            var message = "TalentPool removed successfully"

            if (result == "TalentPool does not exists.") {
                message = "TalentPool does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTalentPoolById = async (req, res) => {
    console.log("findTalentPoolById called")
    try {
        var role = req.token_decoded.r

        
            var talentPoolData = req.body

            var result = await talentPoolHelper.findTalentPoolById(talentPoolData)
            console.log(result)
            var message = "TalentPool find successfully"
            if (result == null) {
                message = "TalentPool does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTalentPool,
    getTalentPoolsWithFullDetails,
    getTalentPoolsList,
    updateTalentPool,
    removeTalentPool,
    findTalentPoolById

}



