/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const JobMessage = mongoose.model("jobMessages")


//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createJobMessage: async (data) => {
        console.log("createJobMessage HelperFunction is called");
        const jobMessages = new JobMessage(data)
        await jobMessages.save()
        return jobMessages
        
    },
    getJobMessagesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getJobMessages Model Function called")

        const jobMessages = await JobMessage.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('applicant', query.applicantFields)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const jobMessagessize = jobMessages.length

        return {
            jobMessages: jobMessages,
            count: jobMessagessize,
            offset: offset,
            limit: limit
        };
        
    },

    getJobMessagesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getJobMessages Model Function called")

        const jobMessages = await JobMessage.find(query.critarion).select(query.fields/* '_id JobMessageName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const jobMessagessize = jobMessages.length

        return {
            jobMessages: jobMessages,
            count: jobMessagessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateJobMessage: async (data) => {
        console.log("updateJobMessage HelperFunction is called");
        const result = await promise.all([JobMessage.findOneAndUpdate({_id: data.jobMessagesid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeJobMessage: async (data) => {
        console.log("removeJobMessage HelperFunction is called");

        const jobMessages = await JobMessage.findById(data.id);
        if(jobMessages == null){
             var error = "JobMessage does not exists."
             return error
        }
        jobMessages.lastModifiedBy = data.lastModifiedBy
        jobMessages.active = false
        await jobMessages.save()
        return jobMessages;
        

    },

    findJobMessageById: async (query) => {
        console.log("findJobMessageById HelperFunction is called");
        
        const jobMessages = await JobMessage.findOne(query.critarion)
        .populate('applicant', query.applicantFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return jobMessages;
        

    },

    

};
