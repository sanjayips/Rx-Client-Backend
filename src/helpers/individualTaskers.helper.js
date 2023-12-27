/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const IndividualTasker = mongoose.model('individualTaskers')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createIndividualTasker: async (data) => {
        console.log("createTasker HelperFunction is called");
        const individualTasker = new IndividualTasker(data)
        await individualTasker.save()
        return individualTasker
        
    },
    getIndividualTaskersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getIndividualTaskers Model Function called")

        const individualTaskers = await IndividualTasker.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const individualTaskerssize = individualTaskers.length

        return {
            individualTaskers: individualTaskers,
            count: individualTaskerssize,
            offset: offset,
            limit: limit
        };
        
    },

    getIndividualTaskersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getIndividualTaskers Model Function called")

        const individualTaskers = await IndividualTasker.find(query.critarion).select(query.fields/* '_id IndividualTaskerName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const individualTaskerssize = individualTaskers.length

        return {
            individualTaskers: individualTaskers,
            count: individualTaskerssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateIndividualTasker: async (data) => {
        console.log("updateIndividualTasker HelperFunction is called");
        const result = await promise.all([IndividualTasker.findOneAndUpdate({_id: data.individualTaskerid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeIndividualTasker: async (data) => {
        console.log("removeIndividualTasker HelperFunction is called");

        const individualTasker = await IndividualTasker.findById(data.id);
        if(individualTasker == null){
             var error = "Tasker does not exists."
             return error
        }
        individualTasker.lastModifiedBy = data.lastModifiedBy
        individualTasker.active = false
        await individualTasker.save()
        return individualTasker;
        

    },

    findIndividualTaskerById: async (query) => {
        console.log("findIndividualTaskerById HelperFunction is called");
        
        const individualTasker = await IndividualTasker.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return individualTasker;
        

    },

    

};
