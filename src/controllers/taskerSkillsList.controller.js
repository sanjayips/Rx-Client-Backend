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

const taskerSkillsListHelper = require('../helpers/taskerSkillsList.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTaskerSkillsList = async (req, res) => {
    console.log('createTaskerSkillsList')
    try {
        var taskerSkillsListData = req.body
        var role = req.token_decoded.r
        taskerSkillsListData.addedby = req.token_decoded.d

        
            var result = await taskerSkillsListHelper.createTaskerSkillsList(taskerSkillsListData)
            var message = "TaskerSkillsList created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskerSkillsListWithFullDetails = async (req, res) => {
    console.log("getTaskerSkillsListWithFullDetails called")
    var taskerSkillsListData = req.body


    try {

        var result = await taskerSkillsListHelper.getTaskerSkillsListWithFullDetails(taskerSkillsListData.sortproperty, taskerSkillsListData.sortTaskerSkill, taskerSkillsListData.offset, taskerSkillsListData.limit, taskerSkillsListData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskerSkillsList = async (req, res) => {
    console.log("getTaskerSkillsList called")
    var taskerSkillsListData = req.body


    try {

        var result = await taskerSkillsListHelper.getTaskerSkillsList(taskerSkillsListData.sortproperty, taskerSkillsListData.sortTaskerSkill, taskerSkillsListData.offset, taskerSkillsListData.limit, taskerSkillsListData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTaskerSkillsList = async (req, res) => {
    console.log("request received for updateTaskerSkill")

    var taskerSkillsListData = req.body
    var role = req.token_decoded.r
    try {
        taskerSkillsListData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskerSkillsListHelper.updateTaskerSkillsList(taskerSkillsListData)
            var message = 'TaskerSkillsList Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTaskerSkillsList = async (req, res) => {
    console.log("removeTaskerSkillsList called")
    try {
        var role = req.token_decoded.r

       
            var taskerSkillsListData = req.body
            taskerSkillsListData.lastModifiedBy = req.token_decoded.d
            var result = await taskerSkillsListHelper.removeTaskerSkillsList(taskerSkillsListData)

            var message = "TaskerSkillsList removed successfully"

            if (result == "TaskerSkillsList does not exists.") {
                message = "TaskerSkillsList does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskerSkillsListById = async (req, res) => {
    console.log("findTaskerSkillById called")
    try {
        var role = req.token_decoded.r

        
            var taskerSkillsListData = req.body

            var result = await taskerSkillsListHelper.findTaskerSkillsListById(taskerSkillsListData)
            
            var message = "TaskerSkillsList find successfully"
            if (result == null) {
                message = "TaskerSkillsList does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTaskerSkillsList,
    getTaskerSkillsListWithFullDetails,
    getTaskerSkillsList,
    updateTaskerSkillsList,
    removeTaskerSkillsList,
    findTaskerSkillsListById

}



