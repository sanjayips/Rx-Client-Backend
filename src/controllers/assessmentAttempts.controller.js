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

const assessmentAttemptHelper = require('../helpers/assessmentAttempts.helper')
const industryHelper = require('../helpers/industries.helper')
const Industry = mongoose.model('industries')
const Tasker = mongoose.model('taskers')
const IndividualTasker = mongoose.model('individualTaskers')
const TaskerCompany = mongoose.model('taskerCompanies')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createAssessmentAttempt = async (req, res) => {
    console.log('createAssessmentAttempt')
    try {
        var assessmentAttemptData = req.body

        assessmentAttemptData.addedby = req.token_decoded.d

        let { industries } = assessmentAttemptData
        let fetchedIndustries = []
        for (let ind of industries) {
            //console.log(ind)
            let query = {}
            query.critarion = { "_id": ind }
            query.questionsFields = "questionText answers marks"
            let inds = await industryHelper.findIndustryByIdForAssessments(query)
            console.log(inds._id)
            fetchedIndustries.push(inds)
        }

        fetchedIndustries.map(ind => {

            const nums = new Set();
            while (nums.size !== 10) {
                nums.add(Math.floor(Math.random() * ind.questions.length));
            }

            let finalquestions = []
            let newnums = [...nums]

            for (let index of newnums) {
                finalquestions.push(ind.questions[index])
            }


            ind.questions = finalquestions
        })


        var newAssessmentAttempt = await assessmentAttemptHelper.createAssessmentAttempt(assessmentAttemptData)
        let existingTasker = await Tasker.findById(assessmentAttemptData.tasker)
        existingTasker.skippedTest = false
        await existingTasker.save()
        let extTsk = existingTasker.toObject()
        

        if (extTsk.isIndividual) {
            let extIndTskr = await IndividualTasker.findById(extTsk._id)
            extIndTskr.assessmentAttempts.push(newAssessmentAttempt._id)
            await extIndTskr.save()

        } else {
            let extTskrCmpny = await TaskerCompany.findById(extTsk._id)
            extTskrCmpny.assessmentAttempts.push(newAssessmentAttempt._id)
            await extTskrCmpny.save()
        }

        let resultSet = {
            industries: fetchedIndustries,
            assessmentAttemptId: newAssessmentAttempt._id
        }
        var message = "AssessmentAttempt created successfully"
        return responseHelper.success(res, resultSet, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getAssessmentAttemptsWithFullDetails = async (req, res) => {
    console.log("getAssessmentAttemptsWithFullDetails called")
    var assessmentAttemptData = req.body


    try {

        var result = await assessmentAttemptHelper.getAssessmentAttemptsWithFullDetails(assessmentAttemptData.sortproperty, assessmentAttemptData.sortOrder, assessmentAttemptData.offset, assessmentAttemptData.limit, assessmentAttemptData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAssessmentAttemptsList = async (req, res) => {
    console.log("getAssessmentAttemptsList called")
    var assessmentAttemptData = req.body


    try {

        var result = await assessmentAttemptHelper.getAssessmentAttemptsList(assessmentAttemptData.sortproperty, assessmentAttemptData.sortOrder, assessmentAttemptData.offset, assessmentAttemptData.limit, assessmentAttemptData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAssessmentAttempt = async (req, res) => {
    console.log("request received for updateAssessmentAttempt")

    var assessmentAttemptData = req.body
    var role = req.token_decoded.r
    try {
        assessmentAttemptData.lastModifiedBy = req.token_decoded.d

        var result = await assessmentAttemptHelper.updateAssessmentAttempt(assessmentAttemptData)
        var message = 'AssessmentAttempt Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAssessmentAttempt = async (req, res) => {
    console.log("removeAssessmentAttempt called")
    try {
        var role = req.token_decoded.r


        var assessmentAttemptData = req.body
        assessmentAttemptData.lastModifiedBy = req.token_decoded.d
        var result = await assessmentAttemptHelper.removeAssessmentAttempt(assessmentAttemptData)

        var message = "AssessmentAttempt removed successfully"

        if (result == "AssessmentAttempt does not exists.") {
            message = "AssessmentAttempt does not exists."
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAssessmentAttemptById = async (req, res) => {
    console.log("findAssessmentAttemptById called")
    try {
        var role = req.token_decoded.r


        var assessmentAttemptData = req.body

        var result = await assessmentAttemptHelper.findAssessmentAttemptById(assessmentAttemptData)
        var message = "AssessmentAttempt find successfully"
        if (result == null) {
            message = "AssessmentAttempt does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var findAssessmentAttemptByTaskerId = async (req, res) => {
    console.log("findAssessmentAttemptById called")
    try {
        var role = req.token_decoded.r


        var assessmentAttemptData = req.body

        var result = await assessmentAttemptHelper.findAssessmentAttemptByTaskerId(assessmentAttemptData)
        var message = "AssessmentAttempt find successfully"
        if (result == null) {
            message = "AssessmentAttempt does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createAssessmentAttempt,
    getAssessmentAttemptsWithFullDetails,
    getAssessmentAttemptsList,
    updateAssessmentAttempt,
    removeAssessmentAttempt,
    findAssessmentAttemptById,
    findAssessmentAttemptByTaskerId

}



