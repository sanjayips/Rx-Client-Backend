/**
 * Created by Mb
 */


//import mongoose and models
var mongoose = require('mongoose')
var User = mongoose.model('users')
var Job = mongoose.model('jobs')
var config = require('dotenv').config()
const Recruitment = mongoose.model('recruitments')


//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')
const jobsHelper = require('../helpers/jobs.helper')
const {json} = require('body-parser')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

const constants = require("../hardCodedData").constants
const rectruitmentHelper = require('../helpers/recruitment.helper')

var pageSize = parseInt(config.PAGE_SIZE)

var createjob = async (req, res) => {
    console.log("request received for createjob")
    var userData = req.body

    try {
        var role = req.token_decoded.r

        if (role == '_a') {
            var result = await jobsHelper.createJob(userData)

            let obj = {
                recruitmentid: userData.recruitmentid,
                jobid: result._id
            }

            await rectruitmentHelper.addJobsToRecruitment(obj)


            var message = "Job posted successfully"
            return responseHelper.success(res, result, message)
        } else {
            let err = "Unauthorized to create Job"
            return responseHelper.requestfailure(res, err)
        }
    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }

}


var listjobs = async (req, res) => {
    console.log("listjobs called")

    var userData = req.body


    try {

        var jobs = await jobsHelper.getAllJobs(userData.sortproperty, userData.sortorder, userData.radius, userData.offset, userData.limit)

        var message = 'Successfully loaded'
        var responseData = jobs

        responseHelper.success(res, responseData, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAllJobsWithFullDetails = async (req, res) => {
    console.log("getAllJobsWithFullDetails called")

    var userData = req.body
    console.log(userData)


    try {

        var jobs = await jobsHelper.getAllJobsWithFullDetails(userData.sortproperty, userData.sortorder, userData.offset, userData.limit, userData.query)

        var message = 'Successfully loaded'
        var responseData = jobs

        responseHelper.success(res, responseData, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var listjobsforpublicview = async (req, res) => {
    console.log("listjobs called")

    var userData = req.body


    try {

        var jobs = await jobsHelper.getAllJobsForPublicView(userData.sortproperty, userData.sortorder, userData.radius, userData.offset, userData.limit)

        var message = 'Successfully loaded'
        var responseData = jobs

        responseHelper.success(res, responseData, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var applyForJob = async (req, res) => {
    console.log("request received for applyForJob")

    try {
        var userData = req.body
        var result = await jobsHelper.addApplicant(userData)

        var message = "Job applied successfully"

        if(result === "already applied")
        {
            message = "already applied"
        }
        
        return responseHelper.success(res, result, message)

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }

}

var addApprovedApplicants = async (req, res) => {
    console.log("request received for addApprovedApplicants")

    try {
        var userData = req.body
        var result = await jobsHelper.addApprovedApplicant(userData)
        var message = "Applicant approved for the job successfully"

        if(result === "already added to approved applicants")
        {
            message = "already added to approved applicants"
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }

}

var addSelectedApplicant = async (req, res) => {
    console.log("request received for addSelectedApplicant")

    try {
        var userData = req.body
        var result = await jobsHelper.addSelectedApplicant(userData)
        var message = "Approved Selected successfully"
        return responseHelper.success(res, result, message)

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }

    //res.send(result)
}


var getApprovedApplicants = async (req, res) => {
    console.log("request received for getApprovedApplicants")

    try {
        var userData = req.body
        var result = await jobsHelper.getApprovedApplicants(userData)
        var message = "Approved applicants fetched successfully"
        return responseHelper.success(res, result, message)

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }

}


var changejobstatus = async (req, res) => {
    console.log("changejobstatus called")

    var jobdata = req.body

    try {
        var role = req.token_decoded.r

        if (role === '_a') {
            var jobstatuschanged = await jobsHelper.changeJobStatus(jobdata)
            var message = 'Status changed successfully'


            responseHelper.success(res, jobstatuschanged, message)
        } else {
            let err = "Unauthorized to Update Job"
            return responseHelper.requestfailure(res, err)
        }
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updatejob = async (req, res) => {
    console.log("updatejob called")

    var jobdata = req.body

    try {

        var updatedjob = await jobsHelper.updateJob(jobdata)
        var message = 'Job Updated successfully'


        responseHelper.success(res, updatedjob, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var deletejob = async (req, res) => {
    console.log("deletejob called")

    var jobdata = req.body

    try {

        var recruitement = await Recruitment.findById(jobdata.recruitmentid)
        
        recruitement.openJobs.splice(recruitement.openJobs.indexOf(jobdata.jobid), 1)
        
        await recruitement.save() 


        var deletedjob = await jobsHelper.deleteJob(jobdata)
        var message = 'Job Deleted successfully'


        responseHelper.success(res, deletedjob, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }

}

var findJobById = async (req, res) => {
    console.log("findFaqById called")
    var jobdata = req.body

    
    try {
        
        
            var jobdata = req.body

            var result = await jobsHelper.findJobById(jobdata.jobid)
            console.log(result)
            var message = "Job find successfully"
            if (result == null) {
                message = "Job does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}

var saveApplicantJob = async (req, res) => {
    console.log("saveApplicantJob called")
    var jobdata = req.body

    try {       
        
            var jobdata = req.body
            var where = {_id: jobdata.userid}
            const existUser = await User.findOne(where)
            
            var message = "Job saved successfully"
            if (existUser == null) {
                message = "User does not exists."
            } else {
            
                if(!existUser._doc.savedJobs.includes(jobdata.jobid)){
                    existUser._doc.savedJobs.push(jobdata.jobid)
                    await existUser.save()
                } else {
                    message = "Job already saved"
                }
            }

            return responseHelper.success(res, {}, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}

var saveFavouriteJobs = async (req, res) => {
    console.log("saveFavouriteJobs called")
    var jobdata = req.body

    try {       
        
            var jobdata = req.body
            var where = {_id: jobdata.userid}
            const existUser = await User.findOne(where)
            
            var message = "Job added to favourite Jobs successfully"
            if (existUser == null) {
                message = "User does not exists."
            } else {
            
                if(!existUser._doc.favouriteJobs.includes(jobdata.jobid)){
                    existUser._doc.favouriteJobs.push(jobdata.jobid)
                    await existUser.save()
                } else {
                    message = "Job already saved"
                }
            }

            return responseHelper.success(res, {}, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}

var getRecommendedJobs = async (req, res) => {
    console.log("getRecommendedJobs called")
    var jobdata = req.body

    
    try {
        
        
            var jobdata = req.body

            var result = await jobsHelper.getRecommendedJobs(jobdata.sortproperty, jobdata.sortorder, jobdata.offset, jobdata.limit, jobdata.query)
            console.log(result)
            var message = "Jobs find successfully"
            if (result == null) {
                message = "Jobs does not match your categories."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}

var getSavedJobs = async (req, res) => {
    console.log("getSavedJobs called")
    var jobdata = req.body

    
    try {
        
        
            var jobdata = req.body

            var result = await jobsHelper.getSavedJobs(jobdata)
            //console.log(result)
            var message = "Jobs find successfully"
            if (result == null) {
                message = "Jobs does not found any saved job(s)."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}

var getFavouriteJobs = async (req, res) => {
    console.log("getFavouriteJobs called")
    var jobdata = req.body

    
    try {
        
        
            var jobdata = req.body

            var result = await jobsHelper.getFavouriteJobs(jobdata)
            //console.log(result)
            var message = "Jobs find successfully"
            if (result == null) {
                message = "Jobs does not found any saved job(s)."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }

}


module.exports = {
    createjob,
    updatejob,
    listjobs,
    applyForJob,
    addApprovedApplicants,
    getApprovedApplicants,
    addSelectedApplicant,
    changejobstatus,
    listjobsforpublicview,
    deletejob,
    findJobById,
    saveApplicantJob,
    getRecommendedJobs,
    getSavedJobs,
    getAllJobsWithFullDetails,
    saveFavouriteJobs,
    getFavouriteJobs
}



