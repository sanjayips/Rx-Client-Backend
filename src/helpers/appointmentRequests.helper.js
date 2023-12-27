/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const AppointmentRequest = mongoose.model('appointmentRequests')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createAppointmentRequest: async (data) => {
        console.log("createAppointmentRequest HelperFunction is called");
        const appointmentRequest = new AppointmentRequest(data)
        await appointmentRequest.save()
        return appointmentRequest
        
    },
    getAppointmentRequestsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointmentRequests Model Function called")

        const appointmentRequests = await AppointmentRequest.find(query.critarion)
       
        .populate('addedby', query.addedby)        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('zoomMeeting')
        
        .populate({
            path: 'customer',
            select: query.customerfields,
            populate: {
                path: 'user',
                model: 'users',
                select: query.customeruserfields
            }
        })
       
        .populate('medicalHistory.disease', query.medicalHistoryDiseaseFields)
        .populate('familyDiseases.disease', query.medicalHistoryDiseaseFields)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit)
              
        const appointmentRequestssize = appointmentRequests.length

        return {
            appointmentRequests: appointmentRequests,
            count: appointmentRequestssize,
            offset: offset,
            limit: limit
        };
        
    },

    getAppointmentRequestsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointmentRequests Model Function called")

        const appointmentRequests = await AppointmentRequest.find(query.critarion)
        .select(query.fields)
        .populate({
            path: 'customer',
            select: query.customerfields,
            populate: {
                path: 'user',
                model: 'users',
                select: query.customeruserfields
            }
        })
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit)
        
              
        const appointmentRequestssize = appointmentRequests.length

        return {
            appointmentRequests: appointmentRequests,
            count: appointmentRequestssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateAppointmentRequest: async (data) => {
        console.log("updateAppointmentRequest HelperFunction is called");
        const result = await promise.all([AppointmentRequest.findOneAndUpdate({_id: data.appointmentRequestid}, data, {new: true})])
        return result
                
    },

    

    removeAppointmentRequest: async (data) => {
        console.log("removeAppointmentRequest HelperFunction is called");

        const appointmentRequest = await AppointmentRequest.findById(data.id);
        if(appointmentRequest == null){
             var error = "AppointmentRequest does not exists."
             return error
        }
        
        appointmentRequest.active = false
        await appointmentRequest.save()
        return appointmentRequest;
        

    },

    findAppointmentRequestById: async (query) => {
        console.log("findAppointmentRequestById HelperFunction is called");
        
        const appointmentRequest = await AppointmentRequest.findOne(query.critarion)
        
        .populate('addedby', query.addedby)        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        .populate({
            path: 'customer',
            select: query.customerfields,
            populate: {
                path: 'user',
                model: 'users',
                select: query.customeruserfields
            }
        })
        .populate('medicalHistory.disease', query.medicalHistoryDiseaseFields)
        .populate('familyDiseases.disease', query.medicalHistoryDiseaseFields)
        
        
        return appointmentRequest;
        

    },

    

};
