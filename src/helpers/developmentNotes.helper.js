/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const DevelopmentNote = mongoose.model('developmentNotes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDevelopmentNote: async (data) => {
        console.log("createDevelopmentNote HelperFunction is called");
        const developmentNote = new DevelopmentNote(data)
        await developmentNote.save()
        return developmentNote
        
    },
    getDevelopmentNotesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDevelopmentNotes Model Function called")

        const developmentNotes = await DevelopmentNote.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const developmentNotessize = developmentNotes.length

        return {
            developmentNotes: developmentNotes,
            count: developmentNotessize,
            offset: offset,
            limit: limit
        };
        
    },

    getDevelopmentNotesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getDevelopmentNotes Model Function called")

        const developmentNotes = await DevelopmentNote.find(query.critarion).select(query.fields/* '_id DevelopmentNoteName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const developmentNotessize = developmentNotes.length

        return {
            developmentNotes: developmentNotes,
            count: developmentNotessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDevelopmentNote: async (data) => {
        console.log("updateDevelopmentNote HelperFunction is called");
        const result = await promise.all([DevelopmentNote.findOneAndUpdate({_id: data.developmentNoteid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeDevelopmentNote: async (data) => {
        console.log("removeDevelopmentNote HelperFunction is called");

        const developmentNote = await DevelopmentNote.findById(data.id);
        if(developmentNote == null){
             var error = "developmentNote does not exists."
             return error
        }
        developmentNote.lastModifiedBy = data.lastModifiedBy
        developmentNote.active = false
        await developmentNote.save()
        return developmentNote;
        

    },

    findDevelopmentNoteById: async (query) => {
        console.log("findDevelopmentNoteById HelperFunction is called");
        
        const developmentNote = await DevelopmentNote.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return developmentNote;
        

    },

    

};
