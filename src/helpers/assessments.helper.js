/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Assessment = mongoose.model('assessments')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createAssessment: async (data) => {
        console.log("createAssessment HelperFunction is called");
        const assessments = new Assessment(data)
        await assessments.save()
        return assessments
        
    },
    getAssessmentsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAssessments Model Function called")

        const assessments = await Assessment.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const assessmentssize = assessments.length

        return {
            assessments: assessments,
            count: assessmentssize,
            offset: offset,
            limit: limit
        };
        
    },

    getAssessmentsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAssessments Model Function called")

        const assessments = await Assessment.find(query.critarion).select(query.fields/* '_id AssessmentName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const assessmentssize = assessments.length

        return {
            assessments: assessments,
            count: assessmentssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateAssessment: async (data) => {
        console.log("updateAssessment HelperFunction is called");
        const result = await promise.all([Assessment.findOneAndUpdate({_id: data.assessmentsid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeAssessment: async (data) => {
        console.log("removeAssessment HelperFunction is called");

        const assessments = await Assessment.findById(data.id);
        if(assessments == null){
             var error = "Assessment does not exists."
             return error
        }
        assessments.lastModifiedBy = data.lastModifiedBy
        assessments.active = false
        await assessments.save()
        return assessments;
        

    },

    findAssessmentById: async (query) => {
        console.log("findAssessmentById HelperFunction is called");
        
        const assessments = await Assessment.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return assessments;
        

    },

    

};
