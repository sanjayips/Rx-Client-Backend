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


const orderHelper = require('../helpers/orders.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createOrder = async (req, res) => {
    console.log('createOrder')
    try {
        var orderData = req.body
        var role = req.token_decoded.r
        orderData.addedby = req.token_decoded.d

        
            var result = await orderHelper.createOrder(orderData)
            var message = "Order created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getOrdersWithFullDetails = async (req, res) => {
    console.log("getOrdersWithFullDetails called")
    var orderData = req.body


    try {

        var result = await orderHelper.getOrdersWithFullDetails(orderData.sortproperty, orderData.sortorder, orderData.offset, orderData.limit, orderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getOrdersList = async (req, res) => {
    console.log("getOrdersList called")
    var orderData = req.body


    try {

        var result = await orderHelper.getOrdersList(orderData.sortproperty, orderData.sortorder, orderData.offset, orderData.limit, orderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateOrder = async (req, res) => {
    console.log("request received for updateOrder")

    var orderData = req.body
    var role = req.token_decoded.r
    try {
        orderData.lastModifiedBy = req.token_decoded.d
        
            var result = await orderHelper.updateOrder(orderData)
            var message = 'Order Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeOrder = async (req, res) => {
    console.log("removeOrder called")
    try {
        var role = req.token_decoded.r

       
            var orderData = req.body
            orderData.lastModifiedBy = req.token_decoded.d
            var result = await orderHelper.removeOrder(orderData)

            var message = "Order removed successfully"

            if (result == "Order does not exists.") {
                message = "Order does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findOrderById = async (req, res) => {
    console.log("findOrderById called")
    try {
        var role = req.token_decoded.r

        
            var orderData = req.body

            var result = await orderHelper.findOrderById(orderData)
            console.log(result)
            var message = "Order find successfully"
            if (result == null) {
                message = "Order does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createOrder,
    getOrdersWithFullDetails,
    getOrdersList,
    updateOrder,
    removeOrder,
    findOrderById

}



