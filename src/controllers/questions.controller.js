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

const questionHelper = require('../helpers/questions.helper') 
const Industry = mongoose.model('industries')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createQuestion = async (req, res) => {
    console.log('createQuestion')
    try {
        var questionData = req.body
        var role = req.token_decoded.r
        questionData.addedby = req.token_decoded.d

        
            var result = await questionHelper.createQuestion(questionData)

            let industry = await Industry.findById(questionData.industryid)
            industry.questions.push(result._id)
            await industry.save()

            var message = "Question created and added to Industry successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getQuestionsWithFullDetails = async (req, res) => {
    console.log("getQuestionsWithFullDetails called")
    var questionData = req.body


    try {

        var result = await questionHelper.getQuestionsWithFullDetails(questionData.sortproperty, questionData.sortOrder, questionData.offset, questionData.limit, questionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getQuestionsList = async (req, res) => {
    console.log("getQuestionsList called")
    var questionData = req.body


    try {

        var result = await questionHelper.getQuestionsList(questionData.sortproperty, questionData.sortOrder, questionData.offset, questionData.limit, questionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateQuestion = async (req, res) => {
    console.log("request received for updateQuestion")

    var questionData = req.body
    var role = req.token_decoded.r
    try {
        questionData.lastModifiedBy = req.token_decoded.d
        
            var result = await questionHelper.updateQuestion(questionData)
            var message = 'Question Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeQuestion = async (req, res) => {
    console.log("removeQuestion called")
    try {
        var role = req.token_decoded.r

       
            var questionData = req.body
            questionData.lastModifiedBy = req.token_decoded.d
            var result = await questionHelper.removeQuestion(questionData)

            var message = "Question removed successfully"

            if (result == "Question does not exists.") {
                message = "Question does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findQuestionById = async (req, res) => {
    console.log("findQuestionById called")
    try {
        var role = req.token_decoded.r

        
            var questionData = req.body

            var result = await questionHelper.findQuestionById(questionData)
            console.log(result)
            var message = "Question find successfully"
            if (result == null) {
                message = "Question does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createQuestion,
    getQuestionsWithFullDetails,
    getQuestionsList,
    updateQuestion,
    removeQuestion,
    findQuestionById

}



