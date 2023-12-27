/**
 * Created by Mb
 */


//import mongoose and models
var mongoose = require('mongoose');

var config = require('dotenv').config();


//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');
var Interview = mongoose.model('interviews');
const interviewHelper = require('../helpers/interview.helper')
const jobsHelper = require('../helpers/jobs.helper')

//helper functions
logger = require("../helpers/logger");

responseHelper = require("../helpers/response.helper");

//const notificationtexts = require("../hardCodedData").notificationtexts;
const constants = require("../hardCodedData").constants;

var pageSize = parseInt(config.PAGE_SIZE);

var createInterview = async (req, res) => {
    console.log('createInterview')
    try {
        var interviewData = req.body
        var role = req.token_decoded.r

        if (role == '_a') {
            var result = await interviewHelper.createInterview(interviewData)
            
            let interviewdataForJob = {
                jobid: interviewData.interviewForJob,
                interviewid: result._id
            }
            await jobsHelper.addInterviews(interviewdataForJob)
            var message = "Job Interview created successfully"
            return responseHelper.success(res, result, message)
        } else {
            let err = "Unauthorized to create Job Interview"
            return responseHelper.requestfailure(res, err)
        }

    } catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
} //end function


var getInterviews = async (req, res) => {
  console.log("getInterviews called");
  var userData = req.body;
            
      try {
          
      var jobs = await interviewHelper.getInterviews( userData.sortproperty, userData.sortorder, userData.offset, userData.limit, userData.query);
      
      var message = 'Interview loaded successfully';
          var responseData = jobs;
          
          responseHelper.success(res, responseData, message);
      } catch (err) {
          
          responseHelper.requestfailure(res, err);
      }
};

var updateInterview = async (req, res) => {
  console.log("request received for updateInterview");

  var categoryData = req.body;
  var role = req.token_decoded.r
  try {
    if (role == '_a') {
      var updatedcatg = await interviewHelper.updateInterview(categoryData);
      var message = 'Job Updated successfully';
    } else {
      let err = "Unauthorized to Update Job Interview"
      return responseHelper.requestfailure(res, err)
    }

    responseHelper.success(res, updatedcatg, message);
  } catch (err) {
    responseHelper.requestfailure(res, err);
  }
};

var removeInterview = async (req, res) => {
  console.log("removeInterview called");

  var role = req.token_decoded.r;

  if (role == "_a") {
    var userData = req.body;
    
    var result = await interviewHelper.removeInterview(userData);

    var message = "Interview removed successfully";
    return responseHelper.success(res, result, message);
  } else {
    var error = "Only Admin can remove an Interview";
    responseHelper.requestfailure(res, error);
  }
};


module.exports = {
  createInterview,
  getInterviews,
  updateInterview,
  removeInterview
};



