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

const taskerSkillHelper = require('../helpers/taskerSkills.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTaskerSkill = async (req, res) => {
    console.log('createTaskerSkill')
    try {
        var taskerSkillData = req.body
        var role = req.token_decoded.r
        taskerSkillData.addedby = req.token_decoded.d

        
            var result = await taskerSkillHelper.createTaskerSkill(taskerSkillData)
            var message = "TaskerSkill created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskerSkillsWithFullDetails = async (req, res) => {
    console.log("getTaskerSkillsWithFullDetails called")
    var taskerSkillData = req.body


    try {

        var result = await taskerSkillHelper.getTaskerSkillsWithFullDetails(taskerSkillData.sortproperty, taskerSkillData.sortTaskerSkill, taskerSkillData.offset, taskerSkillData.limit, taskerSkillData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskerSkillsList = async (req, res) => {
    console.log("getTaskerSkillsList called")
    var taskerSkillData = req.body


    try {

        var result = await taskerSkillHelper.getTaskerSkillsList(taskerSkillData.sortproperty, taskerSkillData.sortTaskerSkill, taskerSkillData.offset, taskerSkillData.limit, taskerSkillData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTaskerSkill = async (req, res) => {
    console.log("request received for updateTaskerSkill")

    var taskerSkillData = req.body
    var role = req.token_decoded.r
    try {
        taskerSkillData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskerSkillHelper.updateTaskerSkill(taskerSkillData)
            var message = 'TaskerSkill Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTaskerSkill = async (req, res) => {
    console.log("removeTaskerSkill called")
    try {
        var role = req.token_decoded.r

       
            var taskerSkillData = req.body
            taskerSkillData.lastModifiedBy = req.token_decoded.d
            var result = await taskerSkillHelper.removeTaskerSkill(taskerSkillData)

            var message = "TaskerSkill removed successfully"

            if (result == "TaskerSkill does not exists.") {
                message = "TaskerSkill does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskerSkillById = async (req, res) => {
    console.log("findTaskerSkillById called")
    try {
        var role = req.token_decoded.r

        
            var taskerSkillData = req.body

            var result = await taskerSkillHelper.findTaskerSkillById(taskerSkillData)
            
            var message = "TaskerSkill find successfully"
            if (result == null) {
                message = "TaskerSkill does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTaskerSkill,
    getTaskerSkillsWithFullDetails,
    getTaskerSkillsList,
    updateTaskerSkill,
    removeTaskerSkill,
    findTaskerSkillById

}



