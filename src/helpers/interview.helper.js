/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



var Interview = mongoose.model('interviews')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("../helpers/logger");
//notification = require("../controllers/notifications.controller");
const notificationtexts = require("../hardCodedData").notificationtexts;
const constants = require("../hardCodedData").constants;

module.exports = {

    createInterview: async (data) => {
        console.log("createInterview HelperFunction is called");
        const interview = new Interview(data);
        await interview.save()
        return interview;
        
    },
    getInterviews: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getInterviews Model Function called")
        let requiredFields = '_id email first_name phoneNumber'
        const interviews = await Interview.find(query)
        .populate('jobApplicant', requiredFields)
        .populate('interviewers', requiredFields)
        .populate('interviewForJob')
        .populate('zoomMeeting')
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const interviewsize = interviews.length

        return {
            interviews: interviews,
            count: interviewsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateInterview: async (data) => {
        console.log("updateInterview HelperFunction is called");
        
        const result = await Interview.findOneAndUpdate({_id: data.interviewid}, data, {new: true})

        return result; 
                
    },

    removeInterview: async (data) => {
        console.log("removeUser HelperFunction is called");

        const interview = await Interview.findById(data.interviewid);
        
        const result = await interview.remove();
        return result;
        

    },

};
