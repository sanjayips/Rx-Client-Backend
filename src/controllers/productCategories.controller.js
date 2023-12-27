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

const productCategoryHelper = require('../helpers/productCategory.helper');

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
    categoryData.addedby = req.token_decoded.d

    var result = await productCategoryHelper.createCategory(categoryData)
    var message = "Product Category created successfully"
    return responseHelper.success(res, result, message)


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
  console.log("getCategories new called");
  var categoryData = req.body;
console.log(categoryData
  )

  try {

    var categories = await productCategoryHelper.getCategories(categoryData.sortproperty, categoryData.sortorder, categoryData.offset, categoryData.limit, categoryData.query);

    var message = 'Successfully loaded';


    responseHelper.success(res, categories, message);
  } catch (err) {

    responseHelper.requestfailure(res, err);
  }
};

var updateCategory = async (req, res) => {
  console.log("request received for updateCategory");

  var categoryData = req.body;
  try {
    categoryData.lastModifiedBy = req.token_decoded.d

    var updatedcatg = await productCategoryHelper.updatecategory(categoryData);
    var message = 'Product Updated successfully';


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

  var categoryData = req.body;
  
  var result = await productCategoryHelper.removeCategory(categoryData);

  var message = "Category removed successfully";
  return responseHelper.success(res, result, message);

};

var findCategoryById = async (req, res) => {
  console.log("findCategoryById called")
  try {


    var categoryData = req.body

    var result = await productCategoryHelper.findCategoryById(categoryData)
    console.log(result)
    var message = "Category find successfully"
    if (result == null) {
      message = "Category does not exists."
    }


    return responseHelper.success(res, result, message)

  } catch (err) {
    responseHelper.requestfailure(res, err)
  }
}


module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  removeCategory,
  findCategoryById
};



