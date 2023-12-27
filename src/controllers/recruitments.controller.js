/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose');

var config = require('dotenv').config();
//var notificationCtrl = require("./notifications.controller");

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');

//var Recruitment = mongoose.model('recruitments')

const recruitmentHelper = require('../helpers/recruitment.helper')

//helper functions
logger = require("../helpers/logger");

responseHelper = require("../helpers/response.helper");

//const notificationtexts = require("../hardCodedData").notificationtexts;
const constants = require("../hardCodedData").constants;

var pageSize = parseInt(config.PAGE_SIZE);

var createRecruitment = async (req, res) => {
  console.log('createRecruitment')
  try {
    var recruitmentData = req.body
    var role = req.token_decoded.r

    if (role == '_a') {
      var result = await recruitmentHelper.createRecruitment(recruitmentData)
      var message = "Job Recruitment created successfully"
      return responseHelper.success(res, result, message)
    } else {
      let err = "Unauthorized to create Job Recruitment"
      return responseHelper.requestfailure(res, err)
    }

  } catch (err) {
    logger.error(err);
    responseHelper.requestfailure(res, err)
  }
} //end function


var getRecruitments = async (req, res) => {
  console.log("getRecruitments called");
  var userData = req.body;
      
      
      try {
          
      var result = await recruitmentHelper.getRecruitments( userData.sortproperty, userData.sortorder, userData.offset, userData.limit);
      
      var message = 'Successfully loaded';
      
          responseHelper.success(res, result, message);
      } catch (err) {
          
          responseHelper.requestfailure(res, err);
      }
};

var updateRecruitment = async (req, res) => {
  console.log("request received for updateRecruitment");

  var RecruitmentData = req.body;
  var role = req.token_decoded.r
  try {
    if (role == '_a') {
      var result = await recruitmentHelper.updateRecruitment(RecruitmentData);
      var message = 'Recruitment Updated successfully';
    } else {
      let err = "Unauthorized to Update Recruitment"
      return responseHelper.requestfailure(res, err)
    }

    responseHelper.success(res, result, message);
  } catch (err) {
    responseHelper.requestfailure(res, err);
  }
};

var removeRecruitment = async (req, res) => {
  console.log("removeRecruitment called");

  var role = req.token_decoded.r;

  if (role == "_a") {
    var userData = req.body;
   
    var result = await recruitmentHelper.removeRecruitment(userData.id);

    var message = "Recruitment removed successfully"
    
      if(result == "Recruitment does not exists."){
        message = "Recruitment does not exists."
      }
    return responseHelper.success(res, result, message);
  } else {
    var error = "Only Admin can remove a Recruitment";
    responseHelper.requestfailure(res, error);
  }
}

var findRecruitmentById = async (req, res) => {
    console.log("findRecruitmentById called");
  
    var role = req.token_decoded.r;
  
    if (role == "_a") {
      var userData = req.body;
     
      var result = await recruitmentHelper.findRecruitmentById(userData.id);
      console.log(result)
      var message = "Recruitment find successfully"
      if(result == null){
        message = "Recruitment does not exists."
      }
  
      ;
      return responseHelper.success(res, result, message);
    } else {
      var error = "Only Admin can find a Recruitment";
      responseHelper.requestfailure(res, error);
    }
  }

  var addJobsToRecruitment = async (req, res) => {
    console.log("addJobsToRecruitment called");
  
    var role = req.token_decoded.r;
  
    if (role == "_a") {
      var userData = req.body;
     
      var result = await recruitmentHelper.addJobsToRecruitment(userData);
  
      var message = "Job Added to Recruitment successfully";
      return responseHelper.success(res, result, message);
    } else {
      var error = "Only Admin can add a Job to Recruitment";
      responseHelper.requestfailure(res, error);
    }
  }

  var fillJob = async (req, res) => {
    console.log("fillJob called");
  
    var role = req.token_decoded.r;
  
    if (role == "_a") {
      var userData = req.body;
     
      var result = await recruitmentHelper.fillJob(userData);
  
      var message = "Job Filled in Recruitment successfully";
      return responseHelper.success(res, result, message);
    } else {
      var error = "Only Admin can fill a Job to Recruitment";
      responseHelper.requestfailure(res, error);
    }
  }


module.exports = {
  createRecruitment,
  getRecruitments,
  updateRecruitment,
  removeRecruitment,
  findRecruitmentById,
  addJobsToRecruitment,
  fillJob
};



