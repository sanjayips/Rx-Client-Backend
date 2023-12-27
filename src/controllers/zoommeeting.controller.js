/**
 * Created by Mb
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

//helper functions
logger = require("../helpers/logger");
const axios = require('axios')
responseHelper = require("../helpers/response.helper");
const zoomauth = require('../middlewares/zoomauth')
const Interview = mongoose.model('interviews')
//const AppointmentRequest = mongoose.model('appointmentRequests')

const zoomHelper = require('../helpers/zoommeeting.helper')
//const notificationtexts = require("../hardCodedData").notificationtexts;

var zoomuserInfo = async (req, res) => {
    console.log('request received for zoomuserInfo')
    try {
        var role = req.token_decoded.r
        var token = zoomauth.zoomtoken
        const email = zoomauth.hostemail
        const options = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }

        if (role == '_a') {

            const result = await axios.get("https://api.zoom.us/v2/users/" + email, options)
            var message = "User verified successfully"
            return responseHelper.success(res, result.data, message)
        } else {
            let err = "Unauthorized to create Job Category"
            return responseHelper.requestfailure(res, err)
        }

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var createZoomMeeting = async (req, res) => {
    try {
        var token = zoomauth.zoomtoken
        const email = zoomauth.hostemail
        const options = req.body
        const interviewid = options.interviewid

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }
        const zoomresult = await axios.post("https://api.zoom.us/v2/users/" + email + "/meetings", options, headers)

        const result = await zoomHelper.createZoomMeeting(zoomresult.data)

        let interview = await Interview.findById(interviewid)

        interview.zoomMeeting = result._id

        await interview.save()

        var message = "New Meeting created successfully"
        return responseHelper.success(res, result, message)



    } catch (error) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
}

var createZoomMeetingForDoct = async (req, res) => {
    try {
        var token = zoomauth.zoomtoken
        const email = zoomauth.hostemail
        const options = req.body
        //const appointmentmeetingid = options.appointmentmeetingid

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }
        const zoomresult = await axios.post("https://api.zoom.us/v2/users/" + email + "/meetings", options, headers)

        const result = await zoomHelper.createZoomMeeting(zoomresult.data)

        /* let appmetng = await AppointmentRequest.findById(appointmentmeetingid)

        appmetng.zoomMeeting = result._id

        await appmetng.save() */

        var message = "New Meeting created successfully"
        return responseHelper.success(res, result._id, message)



    } catch (error) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
}

var updateZoomMeeting = async (req, res) => {
    console.log('updateZoomMeeting called')
    try {
        var token = zoomauth.zoomtoken

        const options = req.body


        let meetingid = options._id

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }
        const zoomresult = await axios.patch("https://api.zoom.us/v2/meetings/" + options.id + '', options, headers)

        var updatedmeeting = await getMeetingData(options.id)

        updatedmeeting.meetingid = meetingid

        const result = await zoomHelper.updateZoomMeeting(updatedmeeting)

        var message = "Meeting Updated successfully"
        return responseHelper.success(res, result, message)



    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
}

var removeZoomMeeting = async (req, res) => {
    console.log('updateZoomMeeting called')
    try {
        var token = zoomauth.zoomtoken
        const options = req.body
        let meetingid = options._id

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }
        const zoomresult = await axios.delete("https://api.zoom.us/v2/meetings/" + options.id + '', headers)

        //var updatedmeeting = await getMeetingData(options.id)

        const result = await zoomHelper.removeZoomMeeting(meetingid)

        var message = "Meeting Removed successfully"
        return responseHelper.success(res, result, message)



    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
}

var getMeetingData = async (id) => {
    try {
        var token = zoomauth.zoomtoken
        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }

        const zoomresult = await axios.get("https://api.zoom.us/v2/meetings/" + id, headers)
        return zoomresult.data


    } catch (err) {
        logger.error(err)
        return err
    }


} //end function

var getZoomMeetings = async (req, res) => {
    console.log("getZoomMeetings called");
    var userData = req.body;


    try {

        var jobs = await zoomHelper.getZoomMeetings(userData.sortproperty, userData.sortorder, userData.offset, userData.limit);

        var message = 'Successfully loaded';
        var responseData = jobs;

        responseHelper.success(res, responseData, message);
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
}


module.exports = {
    zoomuserInfo,
    createZoomMeeting,
    getZoomMeetings,
    updateZoomMeeting,
    removeZoomMeeting,
    createZoomMeetingForDoct
};



