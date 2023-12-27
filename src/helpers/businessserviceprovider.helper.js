/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const BusinessServiceProvider = mongoose.model('businessServiceProviders')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createBusinessServiceProvider: async (data) => {
        console.log("createBusinessServiceProvider HelperFunction is called");
        const businessserviceprovider = new BusinessServiceProvider(data)
        await businessserviceprovider.save()
        return businessserviceprovider
        
    },
    getBusinessServiceProvidersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getBusinessServiceProviders Model Function called")

        const businessserviceproviders = await BusinessServiceProvider.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const setsize = businessserviceproviders.length

        return {
            businessserviceproviders: businessserviceproviders,
            count: setsize,
            offset: offset,
            limit: limit
        };
        
    },

    getBusinessServiceProvidersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getBusinessServiceProviders Model Function called")

        const businessserviceproviders = await BusinessServiceProvider.find(query.critarion).select(query.fields/* '_id BusinessServiceProviderName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const setsize = businessserviceproviders.length

        return {
            businessserviceproviders: businessserviceproviders,
            count: setsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateBusinessServiceProvider: async (data) => {
        console.log("updateBusinessServiceProvider HelperFunction is called");
        
        const result = await BusinessServiceProvider.findOneAndUpdate({_id: data.businessserviceproviderid}, data, {new: true})

        return result; 
                
    },

    

    removeBusinessServiceProvider: async (data) => {
        console.log("removeBusinessServiceProvider HelperFunction is called");

        const businessserviceprovider = await BusinessServiceProvider.findById(data.id);
        if(businessserviceprovider == null){
             var error = "BusinessServiceProvider does not exists."
             return error
        }
        /* businessserviceprovider.lastModifiedBy = data.lastModifiedBy
        businessserviceprovider.active = false
        businessserviceprovider.save() */
        const result = await businessserviceprovider.remove()
        return result
        

    },

    findBusinessServiceProviderById: async (query) => {
        console.log("find BusinessServiceProviderById HelperFunction is called");
        
        const businessserviceprovider = await BusinessServiceProvider.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return businessserviceprovider;
        

    },

    

};
