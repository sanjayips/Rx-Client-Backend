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

const customerHelper = require('../helpers/customers.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createCustomer = async (req, res) => {
    console.log('createCustomer')
    try {
        var customerData = req.body
        customerData.addedby = req.token_decoded.d

        
            var result = await customerHelper.createCustomer(customerData)
            var message = "Customer created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getCustomersWithFullDetails = async (req, res) => {
    console.log("getCustomersWithFullDetails called")
    var customerData = req.body


    try {

        var result = await customerHelper.getCustomerWithFullDetails(customerData.sortproperty, customerData.sortorder, customerData.offset, customerData.limit, customerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getCustomersList = async (req, res) => {
    console.log("getCustomersList called")
    var customerData = req.body


    try {

        var result = await customerHelper.getCustomerList(customerData.sortproperty, customerData.sortorder, customerData.offset, customerData.limit, customerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateCustomer = async (req, res) => {
    console.log("request received for updateCustomer")

    var customerData = req.body
    var role = req.token_decoded.r
    try {
        customerData.lastModifiedBy = req.token_decoded.d
        
            var result = await customerHelper.updateCustomer(customerData)
            var message = 'Customer Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeCustomer = async (req, res) => {
    console.log("removeCustomer called")
    try {
        var role = req.token_decoded.r

       
            var customerData = req.body
            customerData.lastModifiedBy = req.token_decoded.d
            var result = await customerHelper.removeCustomer(customerData)

            var message = "Customer removed successfully"

            if (result == "Customer does not exists.") {
                message = "Customer does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findCustomerById = async (req, res) => {
    console.log("findCustomerById called")
    try {
        var role = req.token_decoded.r

        
            var customerData = req.body

            var result = await customerHelper.findCustomerById(customerData)
            console.log(result)
            var message = "Customer find successfully"
            if (result == null) {
                message = "Customer does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createCustomer,
    getCustomersWithFullDetails,
    getCustomersList,
    updateCustomer,
    removeCustomer,
    findCustomerById

}



