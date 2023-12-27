//import mongoose and models
var mongoose = require('mongoose');
//var User = mongoose.model('users');
//var Employee = mongoose.model('employees');
var config = require('dotenv').config();


//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');
const employeeHelpers = require('../helpers/employees.helper');

//helper functions
logger = require("../helpers/logger");

responseHelper = require("../helpers/response.helper");

const constants = require("../hardCodedData").constants;

var pageSize = parseInt(config.PAGE_SIZE);

var createEmployee = async (req, res) => {
    console.log("request received for employee");
    var employeeData = req.body;

    try {
        var role = req.token_decoded.r

        if (role === '_a') {
            var result = await employeeHelpers.createEmployee(employeeData)
            var message = "Employee created successfully";
            return responseHelper.success(res, result, message)
        } else {
            let err = "Unauthorized to create Employee"
            return responseHelper.requestfailure(res, err)
        }
    } catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }

};

var getEmployees = async (req, res) => {
    console.log("getEmployees called");
    var userData = req.body;
    
    try {

        var employees = await employeeHelpers.getAllEmployees(userData.sortproperty, userData.sortorder, userData.offset, userData.limit);

        var message = 'Successfully loaded';
        responseHelper.success(res, employees, message);
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
};

var updateEmployee = async (req, res) => {
    console.log("request received for updateEmployee");

    var employeeData = req.body;
    var role = req.token_decoded.r
    try {
        if (role === '_a') {
            var updatedEmployee = await employeeHelpers.updateEmployee(employeeData);
            var message = 'Employee Updated successfully';
        } else {
            let err = "Unauthorized to Update Employee"
            return responseHelper.requestfailure(res, err)
        }

        responseHelper.success(res, updatedEmployee, message);
    } catch (err) {
        if (err.code === 11000) {
            responseHelper.requestfailure(res, "Duplicate Employee not allowed");
        } else {
            responseHelper.requestfailure(res, err);
        }
    }
};

var findEmployeeById = async (req, res) => {
    console.log("findEmployeeById called")

    var employeeid = req.body;

    try {

        var employee = await employeeHelpers.findEmployeeById(employeeid);
        var message = 'Employee fetched successfully';


        responseHelper.success(res, employee, message);
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }

}

module.exports = {
    createEmployee,
    getEmployees,
    updateEmployee,
    findEmployeeById
}