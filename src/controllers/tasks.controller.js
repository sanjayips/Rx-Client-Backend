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

const tasksHelper = require('../helpers/tasks.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTask = async (req, res) => {
    console.log('createTask')
    try {
        var taskData = req.body
        var role = req.token_decoded.r
        taskData.addedby = req.token_decoded.d

        
            var result = await tasksHelper.createTask(taskData)
            var message = "Task created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTasksWithFullDetails = async (req, res) => {
    console.log("getTasksWithFullDetails called")
    var taskData = req.body


    try {

        var result = await tasksHelper.getTasksWithFullDetails(taskData.sortproperty, taskData.sortTask, taskData.offset, taskData.limit, taskData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTasksList = async (req, res) => {
    console.log("getTasksList called")
    var taskData = req.body


    try {

        var result = await tasksHelper.getTasksList(taskData.sortproperty, taskData.sortTask, taskData.offset, taskData.limit, taskData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTask = async (req, res) => {
    console.log("request received for updateTask")

    var taskData = req.body
    var role = req.token_decoded.r
    try {
        taskData.lastModifiedBy = req.token_decoded.d
        
            var result = await tasksHelper.updateTask(taskData)
            var message = 'Task Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTask = async (req, res) => {
    console.log("removeTask called")
    try {
        var role = req.token_decoded.r

       
            var taskData = req.body
            taskData.lastModifiedBy = req.token_decoded.d
            var result = await tasksHelper.removeTask(taskData)

            var message = "Task removed successfully"

            if (result == "Task does not exists.") {
                message = "Task does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskById = async (req, res) => {
    console.log("findTaskById called")
    try {
        var role = req.token_decoded.r

        
            var taskData = req.body

            var result = await tasksHelper.findTaskById(taskData)
            console.log(result)
            var message = "Task find successfully"
            if (result == null) {
                message = "Task does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTask,
    getTasksWithFullDetails,
    getTasksList,
    updateTask,
    removeTask,
    findTaskById

}



