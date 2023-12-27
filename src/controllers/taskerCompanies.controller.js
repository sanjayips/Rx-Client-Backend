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

const taskerCompanyHelper = require('../helpers/taskerCompanies.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTaskerCompany = async (req, res) => {
    console.log('createTaskerCompany')
    try {
        var taskerCompanyData = req.body
        var role = req.token_decoded.r
        taskerCompanyData.addedby = req.token_decoded.d

        
            var result = await taskerCompanyHelper.createTaskerCompany(taskerCompanyData)
            var message = "TaskerCompany created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaskerCompaniesWithFullDetails = async (req, res) => {
    console.log("getTaskerCompaniesWithFullDetails called")
    var taskerCompanyData = req.body


    try {

        var result = await taskerCompanyHelper.getTaskerCompaniesWithFullDetails(taskerCompanyData.sortproperty, taskerCompanyData.sortTaskerCompany, taskerCompanyData.offset, taskerCompanyData.limit, taskerCompanyData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaskerCompaniesList = async (req, res) => {
    console.log("getTaskerCompaniesList called")
    var taskerCompanyData = req.body


    try {

        var result = await taskerCompanyHelper.getTaskerCompaniesList(taskerCompanyData.sortproperty, taskerCompanyData.sortTaskerCompany, taskerCompanyData.offset, taskerCompanyData.limit, taskerCompanyData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTaskerCompany = async (req, res) => {
    console.log("request received for updateTaskerCompany")

    var taskerCompanyData = req.body
    var role = req.token_decoded.r
    try {
        taskerCompanyData.lastModifiedBy = req.token_decoded.d
        
            var result = await taskerCompanyHelper.updateTaskerCompany(taskerCompanyData)
            var message = 'TaskerCompany Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTaskerCompany = async (req, res) => {
    console.log("removeTaskerCompany called")
    try {
        var role = req.token_decoded.r

       
            var taskerCompanyData = req.body
            taskerCompanyData.lastModifiedBy = req.token_decoded.d
            var result = await taskerCompanyHelper.removeTaskerCompany(taskerCompanyData)

            var message = "TaskerCompany removed successfully"

            if (result == "TaskerCompany does not exists.") {
                message = "TaskerCompany does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaskerCompanyById = async (req, res) => {
    console.log("findTaskerCompanyById called")
    try {
        var role = req.token_decoded.r

        
            var taskerCompanyData = req.body

            var result = await taskerCompanyHelper.findTaskerCompanyById(taskerCompanyData)
            console.log(result)
            var message = "TaskerCompany find successfully"
            if (result == null) {
                message = "TaskerCompany does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTaskerCompany,
    getTaskerCompaniesWithFullDetails,
    getTaskerCompaniesList,
    updateTaskerCompany,
    removeTaskerCompany,
    findTaskerCompanyById

}



