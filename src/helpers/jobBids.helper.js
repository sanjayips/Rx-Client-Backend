/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const JobBid = mongoose.model('jobBids')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createJobBid: async (data) => {
        console.log("createJobBid HelperFunction is called");
        const jobBids = new JobBid(data)
        await jobBids.save()
        return jobBids
        
    },
    getJobBidsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getJobBids Model Function called")

        const jobBidss = await JobBid.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const jobBidsssize = jobBidss.length

        return {
            jobBidss: jobBidss,
            count: jobBidsssize,
            offset: offset,
            limit: limit
        };
        
    },

    getJobBidsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getJobBids Model Function called")

        const jobBidss = await JobBid.find(query.critarion).select(query.fields/* '_id JobBidName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const jobBidsssize = jobBidss.length

        return {
            jobBidss: jobBidss,
            count: jobBidsssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateJobBid: async (data) => {
        console.log("updateJobBid HelperFunction is called");
        const result = await promise.all([JobBid.findOneAndUpdate({_id: data.jobBidsid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeJobBid: async (data) => {
        console.log("removeJobBid HelperFunction is called");

        const jobBids = await JobBid.findById(data.id);
        if(jobBids == null){
             var error = "JobBid does not exists."
             return error
        }
        jobBids.lastModifiedBy = data.lastModifiedBy
        jobBids.active = false
        await jobBids.save()
        return jobBids;
        

    },

    findJobBidById: async (query) => {
        console.log("findJobBidById HelperFunction is called");
        
        const jobBids = await JobBid.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return jobBids;
        

    },

    

};
