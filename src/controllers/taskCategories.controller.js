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


const taskCategoriesHelper = require('../helpers/taskCategories.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTaskCategory = async (req, res) => {
    console.log('createTaskCategory')
    try {
        var taskCategoryData = req.body
        var role = req.token_decoded.r
        taskCategoryData.addedby = req.token_decoded.d

        
            var result = await taskCategoriesHelper.createTaskCategory(taskCategoryData)
            var message = "TaskCategory created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskCategoriesWithFullDetails = async (req, res) => {
    console.log("getTaskCategoriesWithFullDetails called")
    var taskCategoryData = req.body


    try {

        var result = await taskCategoriesHelper.getTaskCategoriesWithFullDetails(taskCategoryData.sortproperty, taskCategoryData.sortTaskCategory, taskCategoryData.offset, taskCategoryData.limit, taskCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskCategoriesList = async (req, res) => {
    console.log("getTaskCategoriesList called")
    var taskCategoryData = req.body


    try {

        var result = await taskCategoriesHelper.getTaskCategoriesList(taskCategoryData.sortproperty, taskCategoryData.sortTaskCategory, taskCategoryData.offset, taskCategoryData.limit, taskCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTaskCategory = async (req, res) => {
    console.log("request received for updateTaskCategory")

    var taskCategoryData = req.body
    var role = req.token_decoded.r
    try {
        taskCategoryData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskCategoriesHelper.updateTaskCategory(taskCategoryData)
            var message = 'TaskCategory Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTaskCategory = async (req, res) => {
    console.log("removeTaskCategory called")
    try {
        var role = req.token_decoded.r

       
            var taskCategoryData = req.body
            taskCategoryData.lastModifiedBy = req.token_decoded.d
            var result = await taskCategoriesHelper.removeTaskCategory(taskCategoryData)

            var message = "TaskCategory removed successfully"

            if (result == "TaskCategory does not exists.") {
                message = "TaskCategory does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskCategoryById = async (req, res) => {
    console.log("findTaskCategoryById called")
    try {
        var role = req.token_decoded.r

        
            var taskCategoryData = req.body

            var result = await taskCategoriesHelper.findTaskCategoryById(taskCategoryData)
            
            var message = "TaskCategory find successfully"
            if (result == null) {
                message = "TaskCategory does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTaskCategory,
    getTaskCategoriesWithFullDetails,
    getTaskCategoriesList,
    updateTaskCategory,
    removeTaskCategory,
    findTaskCategoryById

}



