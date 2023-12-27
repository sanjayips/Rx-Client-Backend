/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const IndvidualServiceProvider = mongoose.model('individualServiceProviders')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createIndvidualServiceProvider: async (data) => {
        console.log("createIndvidualServiceProvider HelperFunction is called");
        const individualserviceprovider = new IndvidualServiceProvider(data)
        await individualserviceprovider.save()
        return individualserviceprovider
        
    },
    getIndvidualServiceProvidersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getIndvidualServiceProviders Model Function called")

        const individualserviceproviders = await IndvidualServiceProvider.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const setsize = individualserviceproviders.length

        return {
            individualserviceproviders: individualserviceproviders,
            count: setsize,
            offset: offset,
            limit: limit
        };
        
    },

    getIndvidualServiceProvidersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getIndvidualServiceProviders Model Function called")

        const individualserviceproviders = await IndvidualServiceProvider.find(query.critarion).select(query.fields/* '_id IndvidualServiceProviderName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const setsize = individualserviceproviders.length

        return {
            individualserviceproviders: individualserviceproviders,
            count: setsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateIndvidualServiceProvider: async (data) => {
        console.log("updateIndvidualServiceProvider HelperFunction is called");
        
        const result = await IndvidualServiceProvider.findOneAndUpdate({_id: data.individualserviceproviderid}, data, {new: true})

        return result; 
                
    },

    

    removeIndvidualServiceProvider: async (data) => {
        console.log("removeIndvidualServiceProvider HelperFunction is called");

        const individualserviceprovider = await IndvidualServiceProvider.findById(data.id);
        if(individualserviceprovider == null){
             var error = "IndvidualServiceProvider does not exists."
             return error
        }
        const result = await individualserviceprovider.remove()
        return result;
        

    },

    findIndvidualServiceProviderById: async (query) => {
        console.log("find IndvidualServiceProviderById HelperFunction is called");
        
        const individualserviceprovider = await IndvidualServiceProvider.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return individualserviceprovider;
        

    },

    

};
