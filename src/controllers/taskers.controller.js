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

const taskerHelper = require('../helpers/taskers.helper')
const taskerSkillsHelper = require('../helpers/taskerSkills.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTasker = async (req, res) => {
    console.log('createTasker')
    try {
        var taskerData = req.body
        var role = req.token_decoded.r
        taskerData.addedby = req.token_decoded.d

        
            var result = await taskerHelper.createTasker(taskerData)
            var message = "Tasker created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskersWithFullDetails = async (req, res) => {
    console.log("getTaskersWithFullDetails called")
    var taskerData = req.body


    try {

        var result = await taskerHelper.getTaskersWithFullDetails(taskerData.sortproperty, taskerData.sortTasker, taskerData.offset, taskerData.limit, taskerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskersList = async (req, res) => {
    console.log("getTaskersList called")
    var taskerData = req.body


    try {

        var result = await taskerHelper.getTaskersList(taskerData.sortproperty, taskerData.sortTasker, taskerData.offset, taskerData.limit, taskerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTasker = async (req, res) => {
    console.log("request received for updateTasker")

    var taskerData = req.body
    var role = req.token_decoded.r
    try {
        taskerData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskerHelper.updateTasker(taskerData)
            var message = 'Tasker Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTasker = async (req, res) => {
    console.log("removeTasker called")
    try {
        var role = req.token_decoded.r

       
            var taskerData = req.body
            taskerData.lastModifiedBy = req.token_decoded.d
            var result = await taskerHelper.removeTasker(taskerData)

            var message = "Tasker removed successfully"

            if (result == "Tasker does not exists.") {
                message = "Tasker does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskerById = async (req, res) => {
    console.log("findTaskerById called")
    try {
        var role = req.token_decoded.r

        
            var taskerData = req.body

            var result = await taskerHelper.findTaskerById(taskerData)
           
            var message = "Tasker find successfully"
            if (result == null) {
                message = "Tasker does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var skippedTheTest = async (req, res) => {
    console.log("findTaskerById called")
    try {
        
            var taskerData = req.body
            var result = await taskerHelper.skippedTheTest(taskerData)
           
            var message = "Tasker skipped the test successfully"
            if (result == null) {
                message = "Tasker does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addSkillToTasker = async (req, res) => {
    console.log("addSkillToTasker called")
    try {
        
            var taskerData = req.body
            let newSkill = await taskerSkillsHelper.createTaskerSkill(taskerData)

            let query = {
                critarion: taskerData.critarion,
                skillId: newSkill._id 
            }
            var result = await taskerHelper.addSkillToTasker(query)
           
            var message = "Tasker Skill added successfully"
            if (result == null) {
                message = "Tasker does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTasker,
    getTaskersWithFullDetails,
    getTaskersList,
    updateTasker,
    removeTasker,
    findTaskerById,
    skippedTheTest,
    addSkillToTasker

}



