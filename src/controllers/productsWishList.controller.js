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

const productsWishListHelper = require('../helpers/productsWishList.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createProductsWishList = async (req, res) => {
    console.log('createProductsWishList')
    try {
        var productsWishListData = req.body
        let userid = req.token_decoded.d
        productsWishListData.addedby = userid

        let query = { user: userid }


        var productsWishList = await productsWishListHelper.findUsersWishList(query)
        console.log(productsWishList)

        if (productsWishList.length == 0) {
            let wishlistobj = {
                wishListName: "Wish List",
                wishListItems: [productsWishListData.product],
                user: userid
            }
            let result = await productsWishListHelper.createProductsWishList(wishlistobj)
            let message = "Product added to wishlist successfully"
            return responseHelper.success(res, result, message)
        } else {
            if (!productsWishList[0].wishListItems.includes(productsWishListData.product)) {
                productsWishList[0].wishListItems.push(productsWishListData.product)
                await productsWishList[0].save()
                let message = "Product added to wishlist successfully"
                return responseHelper.success(res, productsWishList, message)
            } else {
                let message = "Product already added to wishlist"
                return responseHelper.success(res, productsWishList, message)
            }

        }






    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getProductsWishListsWithFullDetails = async (req, res) => {
    console.log("getProductsWishListsWithFullDetails called")
    var productsWishListData = req.body


    try {

        var result = await productsWishListHelper.getProductsWishListWithFullDetails(productsWishListData.sortproperty, productsWishListData.sortorder, productsWishListData.offset, productsWishListData.limit, productsWishListData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getProductsWishListsList = async (req, res) => {
    console.log("getProductsWishListsList called")
    var productsWishListData = req.body


    try {

        var result = await productsWishListHelper.getProductsWishListList(productsWishListData.sortproperty, productsWishListData.sortorder, productsWishListData.offset, productsWishListData.limit, productsWishListData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateProductsWishList = async (req, res) => {
    console.log("request received for updateProductsWishList")

    var productsWishListData = req.body
    var role = req.token_decoded.r
    try {
        productsWishListData.lastModifiedBy = req.token_decoded.d
        
            var result = await productsWishListHelper.updateProductsWishList(productsWishListData)
            var message = 'ProductsWishList Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeProductsWishList = async (req, res) => {
    console.log("removeProductsWishList called")
    try {
        var role = req.token_decoded.r

       
            var productsWishListData = req.body
            productsWishListData.lastModifiedBy = req.token_decoded.d
            var result = await productsWishListHelper.removeProductsWishList(productsWishListData)

            var message = "ProductsWishList removed successfully"

            if (result == "ProductsWishList does not exists.") {
                message = "ProductsWishList does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findProductsWishListById = async (req, res) => {
    console.log("findProductsWishListById called")
    try {
        var role = req.token_decoded.r

        
            var productsWishListData = req.body

            var result = await productsWishListHelper.findProductsWishListById(productsWishListData)
            console.log(result)
            var message = "ProductsWishList find successfully"
            if (result == null) {
                message = "ProductsWishList does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createProductsWishList,
    getProductsWishListsWithFullDetails,
    getProductsWishListsList,
    updateProductsWishList,
    removeProductsWishList,
    findProductsWishListById

}



