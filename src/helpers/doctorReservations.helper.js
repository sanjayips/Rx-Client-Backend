/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')

const DoctorReservation = mongoose.model('doctorReservations')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDoctorReservation: async (data) => {
        console.log("createStodoctorReservationre HelperFunction is called");
        const doctorReservation = new DoctorReservation(data)
        await doctorReservation.save()
        return doctorReservation
        
    },
    getDoctorReservationsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDoctorReservations Model Function called")

        const doctorReservations = await DoctorReservation.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('doctor', query.doctorfields)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const doctorReservationssize = doctorReservations.length

        return {
            doctorReservations: doctorReservations,
            count: doctorReservationssize,
            offset: offset,
            limit: limit
        };
        
    },

    getDoctorReservationsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDoctorReservations Model Function called")

        const doctorReservations = await DoctorReservation.find(query.critarion).select(query.fields/* '_id DoctorReservationName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const doctorReservationssize = doctorReservations.length

        return {
            doctorReservations: doctorReservations,
            count: doctorReservationssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDoctorReservation: async (data) => {
        console.log("updateDoctorReservation HelperFunction is called");
        const result = await promise.all([DoctorReservation.findOneAndUpdate({_id: data.doctorReservationid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeDoctorReservation: async (data) => {
        console.log("removeDoctorReservation HelperFunction is called");

        const doctorReservation = await DoctorReservation.findById(data.id);
        if(doctorReservation == null){
             var error = "DoctorReservation does not exists."
             return error
        }
        doctorReservation.lastModifiedBy = data.lastModifiedBy
        doctorReservation.active = false
        await doctorReservation.save()
        return doctorReservation;
        

    },

    findDoctorReservationById: async (query) => {
        console.log("findDoctorReservationById HelperFunction is called");
        
        const doctorReservation = await DoctorReservation.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('doctor', query.doctorfields)
        
        return doctorReservation;
        

    },

    findFreeDoctors: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("findFreeDoctors Model Function called")

       /*  let stDate = new Date(query.critarion.startTime)
        let enDate = new Date(query.critarion.endTime)
        
        let istDate = stDate.toISOString()
        let iendDate = enDate.toISOString()
        console.log(istDate)
        console.log(iendDate) */

        let istDate = query.critarion.startTime
        let iendDate = query.critarion.endTime

        

        /* let where= { $and: [
            {"startTime" : { $gte:istDate}},
            {"endTime" : { $lte:iendDate}},
            {"active": query.critarion.active},
            {"status": query.critarion.status}
        ]} */

        /* let where = {$and:[
            {'startTime': { '$gte': istDate, '$lt': istDate}},
            {'endTime': { '$gt': iendDate, '$lt': iendDate}}
        ]} */

        /* let where = {$and:[
            {'startTime': { '$gte': istDate, '$lt': iendDate}}
            ,
            {'endTime': { '$lte': iendDate}}
        ]} */

        /* let where = {$and:[{startTime:{$lte:istDate}},{endTime:{$gte:enDate}}]} */

        /* let where = {$or: [{
            $and:[
                {startTime:{$lte:istDate}},
                {endTime:{$gte:istDate}}
            ]},
            {
                $and:[
                    {startTime:{$lte:enDate}},
                {endTime:{$gte:enDate}}
                    /* {endTime:{$lt:enDate}},
                    {startTime:{$gt:istDate}} 
                ]}]} */

        let where = {$and: [{
            $or: [
                {
                    $and: [
                        {
                            "startTime": {
                                $lte: new Date(new Date(istDate))
                                
                            }
                        }, {
                            "endTime": {
                                $gte: new Date(new Date(istDate))
                            }
                        }
                    ]
                }, {
                    $and: [
                        {
                            "startTime": {
                                $lte: new Date(new Date(iendDate))
                            }
                        }, {
                            "endTime": {
                                $gte: new Date(new Date(iendDate))
                            }
                        }
                    ]
                }, {
                    $and: [
                        {
                            "startTime": {
                                $gte: new Date(new Date(istDate))
                            }
                        }, {
                                "endTime": {
                                    $lte: new Date(new Date(iendDate))
                                }
                            }
                        ]
                }
                ]
        },
        {status: {$nin: ["completed", "ongoing"]}},
        {"active": query.critarion.active}
    ]}
    
            
        const doctorReservations = await DoctorReservation.find(where)
       
        //.populate('addedby', query.addedby)
        
        //.populate('lastModifiedBy', query.lastModifiedBy)
        //.populate('doctor', query.doctorfields)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit)
              
        const doctorReservationssize = doctorReservations.length

        return {
            doctorReservations: doctorReservations,
            count: doctorReservationssize,
            offset: offset,
            limit: limit
        }
        
    },

    

}
