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


const variantHelper = require('../helpers/variants.helper')
const Product = mongoose.model('products')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createVariant = async (req, res) => {
    console.log('createVariant')
    try {
        let variantData = req.body
        variantData.addedby = req.token_decoded.d

        
            let result = await variantHelper.createVariant(variantData)

            let product = await Product.findById(variantData.productid)

            product.variants.push(result._id)

            await product.save()

            let message = "Variant created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getVariantsWithFullDetails = async (req, res) => {
    console.log("getVariantsWithFullDetails called")
    var variantData = req.body


    try {

        var result = await variantHelper.getVariantsWithFullDetails(variantData.sortproperty, variantData.sortorder, variantData.offset, variantData.limit, variantData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getVariantsList = async (req, res) => {
    console.log("getVariantsList called")
    var variantData = req.body


    try {

        var result = await variantHelper.getVariantsList(variantData.sortproperty, variantData.sortorder, variantData.offset, variantData.limit, variantData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateVariant = async (req, res) => {
    console.log("request received for updateVariant")

    var variantData = req.body
    var role = req.token_decoded.r
    try {
        variantData.lastModifiedBy = req.token_decoded.d
        
            var result = await variantHelper.updateVariant(variantData)
            var message = 'Variant Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeVariant = async (req, res) => {
    console.log("removeVariant called")
    try {
        var role = req.token_decoded.r

       
            var variantData = req.body
            variantData.lastModifiedBy = req.token_decoded.d
            var result = await variantHelper.removeVariant(variantData)

            var message = "Variant removed successfully"

            if (result == "Variant does not exists.") {
                message = "Variant does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findVariantById = async (req, res) => {
    console.log("findVariantById called")
    try {
        var role = req.token_decoded.r

        
            var variantData = req.body

            var result = await variantHelper.findVariantById(variantData)
            console.log(result)
            var message = "Variant find successfully"
            if (result == null) {
                message = "Variant does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createVariant,
    getVariantsWithFullDetails,
    getVariantsList,
    updateVariant,
    removeVariant,
    findVariantById

}



