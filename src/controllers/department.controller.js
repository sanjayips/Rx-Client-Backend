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


const departmentHelper = require('../helpers/department.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDepartment = async (req, res) => {
    console.log('createDepartment')
    try {
        var DepartmentData = req.body
        var role = req.token_decoded.r
        DepartmentData.addedby = req.token_decoded.d

        /* if (role == '_a') { */
            var result = await departmentHelper.createDepartment(DepartmentData)
            var message = "Job Department created successfully"
            return responseHelper.success(res, result, message)
        /* } else {
            let err = "Unauthorized to create Job Department"
            return responseHelper.requestfailure(res, err)
        } */

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDepartmentsWithFullDetails = async (req, res) => {
    console.log("getDepartmentsWithFullDetails called")
    var departmentData = req.body


    try {

        var result = await departmentHelper.getDepartmentsWithFullDetails(departmentData.sortproperty, departmentData.sortorder, departmentData.offset, departmentData.limit, departmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDepartmentsList = async (req, res) => {
    console.log("getDepartmentsList called")
    var departmentData = req.body


    try {

        var result = await departmentHelper.getDepartmentsList(departmentData.sortproperty, departmentData.sortorder, departmentData.offset, departmentData.limit, departmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDepartment = async (req, res) => {
    console.log("request received for updateDepartment")

    var DepartmentData = req.body
    var role = req.token_decoded.r
    try {
        DepartmentData.lastModifiedBy = req.token_decoded.d
        if (role == '_a') {
            var result = await departmentHelper.updateDepartment(DepartmentData)
            var message = 'Department Updated successfully'
        } else {
            let err = "Unauthorized to Update Department"
            return responseHelper.requestfailure(res, err)
        }

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDepartment = async (req, res) => {
    console.log("removeDepartment called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body
            departmentData.lastModifiedBy = req.token_decoded.d
            var result = await departmentHelper.removeDepartment(departmentData)

            var message = "Department removed successfully"

            if (result == "Department does not exists.") {
                message = "Department does not exists."
            }
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDepartmentById = async (req, res) => {
    console.log("findDepartmentById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body

            var result = await departmentHelper.findDepartmentById(departmentData)
            console.log(result)
            var message = "Department find successfully"
            if (result == null) {
                message = "Department does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addDepartmentHead = async (req, res) => {
    console.log("addDepartmentHead called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body

            var result = await departmentHelper.addDepartmentHead(departmentData)

            var message = "Head Added to Department successfully"
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can add a Head to Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDepartmentHead = async (req, res) => {
    console.log("removeDepartmentHead called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body

            var result = await departmentHelper.removeDepartmentHead(departmentData)

            var message = "Head Removed from Department successfully"
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Head from Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addSingleEmployeeToDepartment = async (req, res) => {
    console.log("addSingleEmployeeToDepartment called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body

            var result = await departmentHelper.addSingleEmployeeToDepartment(departmentData)

            var message = "Head Removed from Department successfully"
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Head from Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addEmployeesToDepartment = async (req, res) => {
    console.log("addEmployeesToDepartment called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var departmentData = req.body

            var result = await departmentHelper.addEmployeesToDepartment(departmentData)

            var message = "Head Removed from Department successfully"
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Head from Department"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}




module.exports = {
    createDepartment,
    getDepartmentsWithFullDetails,
    getDepartmentsList,
    updateDepartment,
    removeDepartment,
    findDepartmentById,
    addDepartmentHead,
    removeDepartmentHead,
    addSingleEmployeeToDepartment,
    addEmployeesToDepartment

}



