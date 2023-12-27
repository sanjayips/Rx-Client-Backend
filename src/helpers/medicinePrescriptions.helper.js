/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const MedicinePrescription = mongoose.model('medicinePrescriptions')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createMedicinePrescription: async (data) => {
        console.log("createMedicinePrescription HelperFunction is called");
        const medicinePrescription = new MedicinePrescription(data)
        await medicinePrescription.save()
        return medicinePrescription
        
    },
    getMedicinePrescriptionsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getMedicinePrescriptions Model Function called")

        const medicinePrescriptions = await MedicinePrescription.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const medicinePrescriptionssize = medicinePrescriptions.length

        return {
            medicinePrescriptions: medicinePrescriptions,
            count: medicinePrescriptionssize,
            offset: offset,
            limit: limit
        };
        
    },

    getMedicinePrescriptionsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getMedicinePrescriptions Model Function called")

        const medicinePrescriptions = await MedicinePrescription.find(query.critarion).select(query.fields/* '_id MedicinePrescriptionName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const medicinePrescriptionssize = medicinePrescriptions.length

        return {
            medicinePrescriptions: medicinePrescriptions,
            count: medicinePrescriptionssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateMedicinePrescription: async (data) => {
        console.log("updateMedicinePrescription HelperFunction is called");
        const result = await promise.all([MedicinePrescription.findOneAndUpdate({_id: data.medicinePrescriptionid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeMedicinePrescription: async (data) => {
        console.log("removeMedicinePrescription HelperFunction is called");

        const medicinePrescription = await MedicinePrescription.findById(data.id);
        if(medicinePrescription == null){
             var error = "MedicinePrescription does not exists."
             return error
        }
        medicinePrescription.lastModifiedBy = data.lastModifiedBy
        medicinePrescription.active = false
        await medicinePrescription.save()
        return medicinePrescription;
        

    },

    findMedicinePrescriptionById: async (query) => {
        console.log("findMedicinePrescriptionById HelperFunction is called");
        
        const medicinePrescription = await MedicinePrescription.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return medicinePrescription;
        

    },

    

};
