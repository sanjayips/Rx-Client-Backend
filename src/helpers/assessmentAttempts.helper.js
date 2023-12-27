/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const AssessmentAttempt = mongoose.model('assessmentAttempts')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createAssessmentAttempt: async (data) => {
        console.log("createAssessmentAttempt HelperFunction is called");
        const assessmentAttempts = new AssessmentAttempt(data)
        await assessmentAttempts.save()
        return assessmentAttempts
        
    },
    getAssessmentAttemptsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAssessmentAttempts Model Function called")

        const assessmentAttempts = await AssessmentAttempt.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const assessmentAttemptssize = assessmentAttempts.length

        return {
            assessmentAttempts: assessmentAttempts,
            count: assessmentAttemptssize,
            offset: offset,
            limit: limit
        };
        
    },

    getAssessmentAttemptsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAssessmentAttempts Model Function called")

        const assessmentAttempts = await AssessmentAttempt.find(query.critarion).select(query.fields/* '_id AssessmentAttemptName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const assessmentAttemptssize = assessmentAttempts.length

        return {
            assessmentAttempts: assessmentAttempts,
            count: assessmentAttemptssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateAssessmentAttempt: async (data) => {
        console.log("updateAssessmentAttempt HelperFunction is called");
        const result = await promise.all([AssessmentAttempt.findOneAndUpdate({_id: data.assessmentAttemptsid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeAssessmentAttempt: async (data) => {
        console.log("removeAssessmentAttempt HelperFunction is called");

        const assessmentAttempts = await AssessmentAttempt.findById(data.id);
        if(assessmentAttempts == null){
             var error = "AssessmentAttempt does not exists."
             return error
        }
        assessmentAttempts.lastModifiedBy = data.lastModifiedBy
        assessmentAttempts.active = false
        await assessmentAttempts.save()
        return assessmentAttempts;
        

    },

    findAssessmentAttemptById: async (query) => {
        console.log("findAssessmentAttemptById HelperFunction is called");
        
        const assessmentAttempts = await AssessmentAttempt.findOne(query.critarion)
        .populate('assessments')
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return assessmentAttempts;
        

    },
    findAssessmentAttemptByTaskerId: async (query) => {
        console.log("findAssessmentAttemptByTaskerId HelperFunction is called");
        
        const assessmentAttempts = await AssessmentAttempt.findOne(query.critarion)
        .populate('assessments')
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return assessmentAttempts;
        

    },

    

};
