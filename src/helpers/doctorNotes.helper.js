/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const DoctorNote = mongoose.model('doctorNotes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDoctorNote: async (data) => {
        console.log("createDoctorNote HelperFunction is called");
        const doctorNote = new DoctorNote(data)
        await doctorNote.save()
        return doctorNote
        
    },
    getDoctorNotesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDoctorNotes Model Function called")

        const doctorNotes = await DoctorNote.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const doctorNotessize = doctorNotes.length

        return {
            doctorNotes: doctorNotes,
            count: doctorNotessize,
            offset: offset,
            limit: limit
        };
        
    },

    getDoctorNotesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDoctorNotes Model Function called")

        const doctorNotes = await DoctorNote.find(query.critarion).select(query.fields/* '_id DoctorNoteName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const doctorNotessize = doctorNotes.length

        return {
            doctorNotes: doctorNotes,
            count: doctorNotessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDoctorNote: async (data) => {
        console.log("updateDoctorNote HelperFunction is called");
        const result = await promise.all([DoctorNote.findOneAndUpdate({_id: data.doctorNoteid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeDoctorNote: async (data) => {
        console.log("removeDoctorNote HelperFunction is called");

        const doctorNote = await DoctorNote.findById(data.id);
        if(doctorNote == null){
             var error = "DoctorNote does not exists."
             return error
        }
        doctorNote.lastModifiedBy = data.lastModifiedBy
        doctorNote.active = false
        await doctorNote.save()
        return doctorNote;
        

    },

    findDoctorNoteById: async (query) => {
        console.log("findDoctorNoteById HelperFunction is called");
        
        const doctorNote = await DoctorNote.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return doctorNote;
        

    },

    

};
