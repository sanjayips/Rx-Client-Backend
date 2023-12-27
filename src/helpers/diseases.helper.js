/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Disease = mongoose.model('diseases')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDisease: async (data) => {
        console.log("createDisease HelperFunction is called");
        const disease = new Disease(data)
        await disease.save()
        return disease
        
    },
    getDiseasesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDiseases Model Function called")

        const diseases = await Disease.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const diseasessize = diseases.length

        return {
            diseases: diseases,
            count: diseasessize,
            offset: offset,
            limit: limit
        };
        
    },

    getDiseasesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDiseases Model Function called")

        const diseases = await Disease.find(query.critarion).select(query.fields/* '_id DiseaseName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const diseasessize = diseases.length

        return {
            diseases: diseases,
            count: diseasessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDisease: async (data) => {
        console.log("updateDisease HelperFunction is called");
        const result = await promise.all([Disease.findOneAndUpdate({_id: data.diseaseid}, data, {new: true})])

        return result; 
                
    },

    

    removeDisease: async (data) => {
        console.log("removeDisease HelperFunction is called");

        const disease = await Disease.findById(data.id);
        if(disease == null){
             var error = "Disease does not exists."
             return error
        }
        disease.lastModifiedBy = data.lastModifiedBy
        disease.active = false
        await disease.save()
        return disease;
        

    },

    findDiseaseById: async (query) => {
        console.log("findDiseaseById HelperFunction is called");
        
        const disease = await Disease.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return disease;
        

    },

    

};
