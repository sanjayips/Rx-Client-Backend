/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose');

var config = require('dotenv').config();
var multer = require('multer');
const fs = require('fs');
//var notificationCtrl = require("./notifications.controller");

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');
var Category = mongoose.model('categories');
const categoryHelper = require('../helpers/category.helper');

//helper functions
logger = require("../helpers/logger");

responseHelper = require("../helpers/response.helper");

//const notificationtexts = require("../hardCodedData").notificationtexts;
const constants = require("../hardCodedData").constants;

var pageSize = parseInt(config.PAGE_SIZE);

var createCategory = async (req, res) => {
  console.log('createCategory')
  try {
    var categoryData = req.body
    var role = req.token_decoded.r

    if (role == '_a') {
      var result = await categoryHelper.createCategory(categoryData)
      var message = "Job Category created successfully"
      return responseHelper.success(res, result, message)
    } else {
      let err = "Unauthorized to create Job Category"
      return responseHelper.requestfailure(res, err)
    }

  } catch (err) {
    logger.error(err);
    if (err.code == 11000) {
      responseHelper.requestfailure(res, "Duplicate Category not allowed");
    } else {
      responseHelper.requestfailure(res, err);
    }
  }
} //end function


var getCategories = async (req, res) => {
  console.log("getCategories called");
  var userData = req.body;
      
      
      try {
          
      var jobs = await categoryHelper.getCategories( userData.sortproperty, userData.sortorder, userData.offset, userData.limit);
      
      var message = 'Successfully loaded';
          var responseData = jobs;
          
          responseHelper.success(res, responseData, message);
      } catch (err) {
          
          responseHelper.requestfailure(res, err);
      }
};

var updateCategory = async (req, res) => {
  console.log("request received for updateCategory");

  var categoryData = req.body;
  var role = req.token_decoded.r
  try {
    if (role == '_a') {
      var updatedcatg = await categoryHelper.updatecategory(categoryData);
      var message = 'Job Updated successfully';
    } else {
      let err = "Unauthorized to Update Job Category"
      return responseHelper.requestfailure(res, err)
    }

    responseHelper.success(res, updatedcatg, message);
  } catch (err) {
    if (err.code == 11000) {
      responseHelper.requestfailure(res, "Duplicate Category not allowed");
    } else {
      responseHelper.requestfailure(res, err);
    }
  }
};

var removeCategory = async (req, res) => {
  console.log("removeCategory called");

  var role = req.token_decoded.r;

  if (role == "_a") {
    var userData = req.body;
    var id = userData.catgid;
    var result = await categoryHelper.removeCategory(id);

    var message = "Category removed successfully";
    return responseHelper.success(res, result, message);
  } else {
    var error = "Only Admin can remove a Category";
    responseHelper.requestfailure(res, error);
  }
};


module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  removeCategory
};



