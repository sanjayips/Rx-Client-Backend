/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const ServiceCategory = mongoose.model('serviceCategories')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createServiceCategory: async (data) => {
        console.log("createservicecategory HelperFunction is called");
        const servicecategory = new ServiceCategory(data)
        await servicecategory.save()
        return servicecategory
        
    },
    getServiceCategorysWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getServiceCategorys Model Function called")

        const servicecategorys = await ServiceCategory.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const servicecategoryssize = servicecategorys.length

        return {
            servicecategorys: servicecategorys,
            count: servicecategoryssize,
            offset: offset,
            limit: limit
        };
        
    },

    getServiceCategorysList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getServiceCategorys Model Function called")

        const servicecategorys = await ServiceCategory.find(query.critarion).select(query.fields/* '_id ServiceCategoryName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = servicecategorys.length

        return {
            servicecategorys: servicecategorys,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateServiceCategory: async (data) => {
        console.log("updateServiceCategory HelperFunction is called");
        
        const result = await ServiceCategory.findOneAndUpdate({_id: data.servicecategoryid}, data, {new: true})

        return result; 
                
    },

    

    removeServiceCategory: async (data) => {
        console.log("removeServiceCategory HelperFunction is called");

        const servicecategory = await ServiceCategory.findById(data.id);
        if(servicecategory == null){
             var error = "ServiceCategory does not exists."
             return error
        }
        servicecategory.lastModifiedBy = data.lastModifiedBy
        servicecategory.active = false
        await servicecategory.save()
        return servicecategory;
        

    },

    findServiceCategoryById: async (query) => {
        console.log("findServiceCategoryById HelperFunction is called");
        
        const servicecategory = await ServiceCategory.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return servicecategory;
        

    },

    

};
