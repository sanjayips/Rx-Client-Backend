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


const serviceCategoryHelper = require('../helpers/servicecategories.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createServiceCategory = async (req, res) => {
    console.log('createServiceCategory')
    try {
        var serviceCategoryData = req.body
        
        serviceCategoryData.addedby = req.token_decoded.d

        
            var result = await serviceCategoryHelper.createServiceCategory(serviceCategoryData)
            var message = "ServiceCategory created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getServiceCategorysWithFullDetails = async (req, res) => {
    console.log("getServiceCategorysWithFullDetails called")
    var serviceCategoryData = req.body


    try {

        var result = await serviceCategoryHelper.getServiceCategorysWithFullDetails(serviceCategoryData.sortproperty, serviceCategoryData.sortorder, serviceCategoryData.offset, serviceCategoryData.limit, serviceCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getServiceCategorysList = async (req, res) => {
    console.log("getServiceCategorysList called")
    var serviceCategoryData = req.body


    try {

        var result = await serviceCategoryHelper.getServiceCategorysList(serviceCategoryData.sortproperty, serviceCategoryData.sortorder, serviceCategoryData.offset, serviceCategoryData.limit, serviceCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateServiceCategory = async (req, res) => {
    console.log("request received for updateServiceCategory")

    var serviceCategoryData = req.body
    var role = req.token_decoded.r
    try {
        serviceCategoryData.lastModifiedBy = req.token_decoded.d
        
            var result = await serviceCategoryHelper.updateServiceCategory(serviceCategoryData)
            var message = 'ServiceCategory Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeServiceCategory = async (req, res) => {
    console.log("removeServiceCategory called")
    try {
        var role = req.token_decoded.r

       
            var serviceCategoryData = req.body
            serviceCategoryData.lastModifiedBy = req.token_decoded.d
            var result = await serviceCategoryHelper.removeServiceCategory(serviceCategoryData)

            var message = "ServiceCategory removed successfully"

            if (result == "ServiceCategory does not exists.") {
                message = "ServiceCategory does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findServiceCategoryById = async (req, res) => {
    console.log("findServiceCategoryById called")
    try {
        var role = req.token_decoded.r

        
            var serviceCategoryData = req.body

            var result = await serviceCategoryHelper.findServiceCategoryById(serviceCategoryData)
            console.log(result)
            var message = "ServiceCategory find successfully"
            if (result == null) {
                message = "ServiceCategory does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createServiceCategory,
    getServiceCategorysWithFullDetails,
    getServiceCategorysList,
    updateServiceCategory,
    removeServiceCategory,
    findServiceCategoryById

}



