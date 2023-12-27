/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const Service = mongoose.model('services')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createService: async (data) => {
        console.log("createService HelperFunction is called");
        const service = new Service(data)
        await service.save()
        return service
        
    },
    getServicesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getServices Model Function called")

        const services = await Service.find(query.critarion)
       
        //.populate('addedby', query.addedby)
        
        //.populate('lastModifiedBy', query.lastModifiedBy)
        .populate('individualServiceProvider', query.individualServiceProvider)
        .populate('businessServiceProvider', query.businessServiceProvider)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const servicessize = services.length

        return {
            services: services,
            count: servicessize,
            offset: offset,
            limit: limit
        };
        
    },

    getServicesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getServices Model Function called")

        const services = await Service.find(query.critarion).select(query.fields/* '_id ServiceName' */)
        .populate('individualServiceProvider', query.individualServiceProvider)
        .populate('businessServiceProvider', query.businessServiceProvider)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const servicessize = services.length

        return {
            services: services,
            count: servicessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateService: async (data) => {
        console.log("updateService HelperFunction is called");
        
        const result = await Service.findOneAndUpdate({_id: data.serviceid}, data, {new: true})

        return result; 
                
    },

    removeService: async (data) => {
        console.log("removeService HelperFunction is called");

        const service = await Service.findById(data.id);
        if(service == null){
             var error = "Service does not exists."
             return error
        }
        /* service.lastModifiedBy = data.lastModifiedBy
        service.active = false
        service.save() */
        const result = await service.remove()
        return result;
        

    },

    findServiceById: async (query) => {
        console.log("findServiceById HelperFunction is called");
        
        const service = await Service.findOne(query.critarion)
        .populate('individualServiceProvider', query.individualServiceProvider)
        .populate('businessServiceProvider', query.businessServiceProvider)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return service;
        

    },

    locateAllServices: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, minDistance, maxDistance, location, query) => {
        console.log("locateActiveCalls HelperFunction is called");
                
         var where ={$and : [ {'serviceLocation': {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates:[parseFloat(location.lng), parseFloat(location.lat)]
              },
              $minDistance: minDistance,
              $maxDistance: maxDistance,
            },
          }}, 
          {"category": {$in: query.categories}},           
          {"serviceCountry": {$in: query.serviceCountry}},           
          {"serviceCity": {$in: query.serviceCity}}
        ]
            
        }
        const services = await Service.find(where)
        .populate('individualServiceProvider', query.individualServiceProvider)
        .populate('businessServiceProvider', query.businessServiceProvider)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit)

        return {
            services: services,
            count: services.length,
            offset: offset,
            limit: limit
        };
        
        
    },

    

};
