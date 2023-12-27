/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Industry = mongoose.model('industries')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createIndustry: async (data) => {
        console.log("createIndustry HelperFunction is called");
        const industry = new Industry(data)
        await industry.save()
        return industry
        
    },
    getIndustriesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getIndustries Model Function called")

        const industries = await Industry.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('questions', query.questionsFields)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const industriessize = industries.length

        return {
            industries: industries,
            count: industriessize,
            offset: offset,
            limit: limit
        };
        
    },

    getIndustriesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getIndustries Model Function called")

        const industries = await Industry.find(query.critarion).select(query.fields/* '_id IndustryName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const industriessize = industries.length

        return {
            industries: industries,
            count: industriessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateIndustry: async (data) => {
        console.log("updateIndustry HelperFunction is called");
        const result = await promise.all([Industry.findOneAndUpdate({_id: data.industryid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeIndustry: async (data) => {
        console.log("removeIndustry HelperFunction is called");

        const industry = await Industry.findById(data.id);
        if(industry == null){
             var error = "Industry does not exists."
             return error
        }
        industry.lastModifiedBy = data.lastModifiedBy
        industry.active = false
        await industry.save()
        return industry;
        

    },

    findIndustryById: async (query) => {
        console.log("findIndustryById HelperFunction is called");
        
        const industry = await Industry.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('questions', query.questionsFields)
        
        return industry;
        

    },

    findIndustryByIdForAssessments: async (query) => {
        console.log("findIndustryByIdForAssessments HelperFunction is called");
        
        const industry = await Industry.findOne(query.critarion)
        
        .populate('questions', query.questionsFields)
        
        return industry;
        

    },

    

};
