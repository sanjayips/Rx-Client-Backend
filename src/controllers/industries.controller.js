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

const industryHelper = require('../helpers/industries.helper')
const TaskerSkillsList = mongoose.model('taskerSkillsList')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createIndustry = async (req, res) => {
    console.log('createIndustry')
    try {
        var industryData = req.body
        var role = req.token_decoded.r
        industryData.addedby = req.token_decoded.d

        
            var result = await industryHelper.createIndustry(industryData)

            let taskerSkillsListItem = {
                skillname: industryData.industryName,
                industry: result._id
            }

            let newTaskerSkillsListItem = new TaskerSkillsList(taskerSkillsListItem)
            await newTaskerSkillsListItem.save()
            var message = "Industry created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getIndustriesWithFullDetails = async (req, res) => {
    console.log("getIndustriesWithFullDetails called")
    var industryData = req.body


    try {

        var result = await industryHelper.getIndustriesWithFullDetails(industryData.sortproperty, industryData.sortIndustry, industryData.offset, industryData.limit, industryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getIndustriesList = async (req, res) => {
    console.log("getIndustriesList called")
    var industryData = req.body


    try {

        var result = await industryHelper.getIndustriesList(industryData.sortproperty, industryData.sortIndustry, industryData.offset, industryData.limit, industryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateIndustry = async (req, res) => {
    console.log("request received for updateIndustry")

    var industryData = req.body
    var role = req.token_decoded.r
    try {
        industryData.lastModifiedBy = req.token_decoded.d
        
            var result = await industryHelper.updateIndustry(industryData)
            var message = 'Industry Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeIndustry = async (req, res) => {
    console.log("removeIndustry called")
    try {
        var role = req.token_decoded.r

       
            var industryData = req.body
            industryData.lastModifiedBy = req.token_decoded.d
            var result = await industryHelper.removeIndustry(industryData)

            var message = "Industry removed successfully"

            if (result == "Industry does not exists.") {
                message = "Industry does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findIndustryById = async (req, res) => {
    console.log("findIndustryById called")
    try {
        var role = req.token_decoded.r

        
            var industryData = req.body

            var result = await industryHelper.findIndustryById(industryData)
            console.log(result)
            var message = "Industry find successfully"
            if (result == null) {
                message = "Industry does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createIndustry,
    getIndustriesWithFullDetails,
    getIndustriesList,
    updateIndustry,
    removeIndustry,
    findIndustryById

}



