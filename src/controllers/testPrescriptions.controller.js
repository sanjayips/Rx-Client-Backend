/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')
var multer = require('multer');
const fs = require('fs');
//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const TestPrescription = require('../helpers/testsPrescriptions.helper')
const Appointment = mongoose.model('appointments')
const TestPrescriptionModel = mongoose.model('testPrescriptions')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTestPrescription = async (req, res) => {
    console.log('createTestPrescription')
    try {
        var testPrescriptionData = req.body
        testPrescriptionData.addedby = req.token_decoded.d

        
            var newPrescription = await TestPrescription.createTestPrescription(testPrescriptionData)

            var appointment = await Appointment.findById(testPrescriptionData.appointmentid)

            appointment.testsPrescription.push(newPrescription._id)

            await appointment.save()

            var message = "TestPrescription added successfully"
            return responseHelper.success(res, newPrescription, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTestPrescriptionsWithFullDetails = async (req, res) => {
    console.log("getTestPrescriptionsWithFullDetails called")
    var testPrescriptionData = req.body


    try {

        var result = await TestPrescription.getTestPrescriptionsWithFullDetails(testPrescriptionData.sortproperty, testPrescriptionData.sortorder, testPrescriptionData.offset, testPrescriptionData.limit, testPrescriptionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTestPrescriptionsList = async (req, res) => {
    console.log("getTestPrescriptionsList called")
    var testPrescriptionData = req.body


    try {

        var result = await TestPrescription.getTestPrescriptionsList(testPrescriptionData.sortproperty, testPrescriptionData.sortorder, testPrescriptionData.offset, testPrescriptionData.limit, testPrescriptionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTestPrescription = async (req, res) => {
    console.log("request received for updateTestPrescription")

    var testPrescriptionData = req.body
    var role = req.token_decoded.r
    try {
        testPrescriptionData.lastModifiedBy = req.token_decoded.d
        
            var result = await TestPrescription.updateTestPrescription(testPrescriptionData)
            var message = 'TestPrescription Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTestPrescription = async (req, res) => {
    console.log("removeTestPrescription called")
    try {
        var role = req.token_decoded.r

       
            var testPrescriptionData = req.body
            testPrescriptionData.lastModifiedBy = req.token_decoded.d
            var result = await TestPrescription.removeTestPrescription(testPrescriptionData)

            var message = "TestPrescription removed successfully"

            if (result == "TestPrescription does not exists.") {
                message = "TestPrescription does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTestPrescriptionById = async (req, res) => {
    console.log("findTestPrescriptionById called")
    try {
        var role = req.token_decoded.r

        
            var testPrescriptionData = req.body

            var result = await TestPrescription.findTestPrescriptionById(testPrescriptionData)
            console.log(result)
            var message = "TestPrescription find successfully"
            if (result == null) {
                message = "TestPrescription does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var uploadTestReportFile = async (req, res) => {
    console.log('uploadTestReportFile')
    var testreportfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "testreportfile") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "testreportfile") {
                testreportfile = Date.now() + '-' + file.originalname
                cb(null, testreportfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);
            //console.log("ext " + ext)

            let extentions = ['.png', '.jpg', '.gif', '.pdf']
            if (!extentions.includes(ext)) {

                errorMessage = "Only PNG, JPG, GIF and PDF Files allowed"
                isErr = true

            }
            cb(null, true)
        }
    }).fields(
        [
            {
                name: 'testreportfile',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "testreportfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                var message = "Only 1 file can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "testreportfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5MB";

                isErr = true

            }



        } else if (err) {

            return res.status(500).json(err)
        }

        if (isErr) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + testreportfile);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            responseHelper.requestfailure(res, errorMessage)
        } else {

            userData = JSON.parse(req.body.request)

            try {
                if (testreportfile !== undefined) {
                    testreportfile = '/uploads/medicalfiles/' + testreportfile;
                } else {
                    let message = "Please attach test file"
                    return responseHelper.requestfailure(res, message, err)
                }

                userData.addedby = req.token_decoded.d

                let tp = await TestPrescriptionModel.findById(userData.testPrescriptionId)

                if (testreportfile !== undefined && tp.reportFile !== undefined && tp.reportFile !== '') {
                    const imgpath = './public/' + tp.reportFile;
                    try {
                        fs.unlinkSync(imgpath);
                    } catch (err) {

                        let message = 'Error Deleting old file, probably already removed'
                        return responseHelper.requestfailure(res, message, err);
                    }
                }

                tp.reportFile = testreportfile

                await tp.save()

                var message = "Test Report Uploaded Successfully"
                return responseHelper.success(res, tp, message)


            } catch (err) {

                try {
                    fs.unlinkSync('./public/uploads/medicalfiles/' + testreportfile);
                } catch (err) {
                    responseHelper.requestfailure(res, err);

                }

                logger.error(err)
                responseHelper.requestfailure(res, err)
            }



        }

    })

} //end function






module.exports = {
    createTestPrescription,
    getTestPrescriptionsWithFullDetails,
    getTestPrescriptionsList,
    updateTestPrescription,
    removeTestPrescription,
    findTestPrescriptionById,
    uploadTestReportFile

}



