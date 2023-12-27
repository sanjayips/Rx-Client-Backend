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

const productAttributesHelper = require('../helpers/productAttributes.helper')
const Variant = mongoose.model('variants')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createProductAttributes = async (req, res) => {
    console.log('createProductAttributes')
    try {
        var productAttributesData = req.body
        productAttributesData.addedby = req.token_decoded.d

        console.log(productAttributesData)
            let result = await productAttributesHelper.createProductAttributes(productAttributesData)

            let variant = await Variant.findById(productAttributesData.variantid)

            variant.attributes.push(result._id)

            await variant.save()

            var message = "variantAttributes created successfully"
            return responseHelper.success(res, variant, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getProductAttributessWithFullDetails = async (req, res) => {
    console.log("getProductAttributessWithFullDetails called")
    var productAttributesData = req.body


    try {

        var result = await productAttributesHelper.getProductAttributesWithFullDetails(productAttributesData.sortproperty, productAttributesData.sortorder, productAttributesData.offset, productAttributesData.limit, productAttributesData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getProductAttributessList = async (req, res) => {
    console.log("getProductAttributessList called")
    var productAttributesData = req.body


    try {

        var result = await productAttributesHelper.getProductAttributesList(productAttributesData.sortproperty, productAttributesData.sortorder, productAttributesData.offset, productAttributesData.limit, productAttributesData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateProductAttributes = async (req, res) => {
    console.log("request received for updateProductAttributes")

    var productAttributesData = req.body
    var role = req.token_decoded.r
    try {
        productAttributesData.lastModifiedBy = req.token_decoded.d
        
            var result = await productAttributesHelper.updateProductAttributes(productAttributesData)
            var message = 'ProductAttributes Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeProductAttributes = async (req, res) => {
    console.log("removeProductAttributes called")
    try {
        var role = req.token_decoded.r

       
            var productAttributesData = req.body
            productAttributesData.lastModifiedBy = req.token_decoded.d
            var result = await productAttributesHelper.removeProductAttributes(productAttributesData)

            var message = "ProductAttributes removed successfully"

            if (result == "ProductAttributes does not exists.") {
                message = "ProductAttributes does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findProductAttributesById = async (req, res) => {
    console.log("findProductAttributesById called")
    try {
        var role = req.token_decoded.r

        
            var productAttributesData = req.body

            var result = await productAttributesHelper.findProductAttributesById(productAttributesData)
            console.log(result)
            var message = "ProductAttributes find successfully"
            if (result == null) {
                message = "ProductAttributes does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createProductAttributes,
    getProductAttributessWithFullDetails,
    getProductAttributessList,
    updateProductAttributes,
    removeProductAttributes,
    findProductAttributesById

}



