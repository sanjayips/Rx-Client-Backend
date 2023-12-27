/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Appointment = mongoose.model('appointments')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createAppointment: async (data) => {
        console.log("createAppointment HelperFunction is called");
        const appointment = new Appointment(data)
        await appointment.save()
        return appointment
        
    },
    getAppointmentsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointments Model Function called")

        const appointments = await Appointment.find(query.critarion)

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
            .populate({
                path: 'appointmentRequest',
                //select: query.customerfields,
                populate: [{
                    path: 'medicalHistory.disease',
                    model: 'diseases',
                    select: query.diseasefields
                }, {
                    path: 'symptoms',
                    model: 'symptoms',
                    select: query.symptomsfields
                }, {
                    path: 'familyDiseases.disease',
                    model: 'diseases',
                    select: query.diseasefields
                }]
            })
            .populate('doctor', query.doctorfields)
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit);

        const appointmentssize = appointments.length

        return {
            appointments: appointments,
            count: appointmentssize,
            offset: offset,
            limit: limit
        };

    },

    getAppointmentsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointments Model Function called")

        const appointments = await Appointment.find(query.critarion).select(query.fields/* '_id AppointmentName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const appointmentssize = appointments.length

        return {
            appointments: appointments,
            count: appointmentssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateAppointment: async (data) => {
        console.log("updateAppointment HelperFunction is called");
        const result = await promise.all([Appointment.findOneAndUpdate({_id: data.appointmentid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeAppointment: async (data) => {
        console.log("removeAppointment HelperFunction is called");

        const appointment = await Appointment.findById(data.id);
        if(appointment == null){
             var error = "Appointment does not exists."
             return error
        }
        appointment.lastModifiedBy = data.lastModifiedBy
        appointment.active = false
        await appointment.save()
        return appointment;
        

    },

    findAppointmentById: async (query) => {
        console.log("findAppointmentById HelperFunction is called");
        
        const appointment = await Appointment.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('doctorsReservation')
        .populate({
            path: 'customer',
            select: query.customerfields,
            populate: {
                path: 'user',
                model: 'users',
                select: query.customeruserfields
            }
        })
        .populate({
            path: 'appointmentRequest',
            //select: query.customerfields,
            populate: [{
                path: 'medicalHistory.disease',
                model: 'diseases',
                select: query.diseasefields
            }, {
                path: 'symptoms',
                model: 'symptoms',
                select: query.symptomsfields
            }, {
                path: 'familyDiseases.disease',
                model: 'diseases',
                select: query.diseasefields
            },{
                path: 'zoomMeeting',
                model: 'zoommeetings',
                //select: query.diseasefields
            }]
        })
        .populate('doctor', query.doctorfields)
        
        return appointment;
        

    },

    getDoctorsEarnings: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointments Model Function called")

        const appointments = await Appointment.find(query.critarion)

            
            
            .populate({
                path: 'appointmentRequest',
                select: "consultationType",
                
            })
            
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit);

        const appointmentssize = appointments.length

        return {
            appointments: appointments,
            count: appointmentssize,
            offset: offset,
            limit: limit
        };

    },

    getCustomersAppointments: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getAppointments Model Function called")

        const appointments = await Appointment.find(query.critarion)

            .populate('addedby', query.addedby)

            .populate('lastModifiedBy', query.lastModifiedBy)
            .populate('doctorsReservation')
            .populate({
                path: 'customer',
                select: query.customerfields,
                populate: {
                    path: 'user',
                    model: 'users',
                    select: query.customeruserfields
                }
            })
            .populate({
                path: 'appointmentRequest',
                //select: query.customerfields,
                populate: [{
                    path: 'medicalHistory.disease',
                    model: 'diseases',
                    select: query.diseasefields
                }, {
                    path: 'symptoms',
                    model: 'symptoms',
                    select: query.symptomsfields
                }, {
                    path: 'familyDiseases.disease',
                    model: 'diseases',
                    select: query.diseasefields
                }]
            })
            .populate('doctor', query.doctorfields)
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit);

        const appointmentssize = appointments.length

        return {
            appointments: appointments,
            count: appointmentssize,
            offset: offset,
            limit: limit
        };

    },

    

};
