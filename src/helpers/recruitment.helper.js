/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Recruitment = mongoose.model('recruitments')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createRecruitment: async (data) => {
        console.log("createRecruitment HelperFunction is called");
        const recruitment = new Recruitment(data);
        await recruitment.save()
        return recruitment;
        
    },
    getRecruitments: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000) => {
        console.log("getRecruitments Model Function called")

        let requiredFields = '_id email first_name'


        const recruitments = await Recruitment.find()
        .populate('startedBy', requiredFields)
        .populate('openJobs')
        .populate('filledJobs')
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = recruitments.length

        return {
            recruitments: recruitments,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateRecruitment: async (data) => {
        console.log("updateRecruitment HelperFunction is called");
        
        const result = await Recruitment.findOneAndUpdate({_id: data.recruitmentid}, data, {new: true})

        return result; 
                
    },

    

    removeRecruitment: async (id) => {
        console.log("removeUser HelperFunction is called");

        const recruitment = await Recruitment.findById(id);
        if(recruitment == null){
             var error = "Recruitment does not exists."
             return error
        }
        const result = await recruitment.remove();
        return result;
        

    },

    findRecruitmentById: async (id) => {
        console.log("findRecruitmentById HelperFunction is called");
        let requiredFields = '_id email first_name'
        const recruitment = await Recruitment.findById(id)
        .populate('startedBy', requiredFields)
        .populate('openJobs')
        .populate('filledJobs')
        
        return recruitment;
        

    },

    addJobsToRecruitment: async (data) => {
        console.log("addJobsToRecruitment HelperFunction is called");
        
        const recruitment = await Recruitment.findById(data.recruitmentid)
        recruitment.totalJobsCount += 1
        recruitment.openJobs.unshift(data.jobid)
        await recruitment.save()
        return recruitment
        

    },

    fillJob: async (data) => {
        console.log("fillJob HelperFunction is called");
       
        const recruitment = await Recruitment.findById(data.recruitmentid)
        recruitment.filledJobsCount += 1
        recruitment.filledJobs.unshift(data.jobid)
        await recruitment.save()
        return recruitment
        

    },

};
