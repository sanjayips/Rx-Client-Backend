/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Tutorial = mongoose.model('tutorials')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTutorial: async (data) => {
        console.log("createTutorial HelperFunction is called");
        const tutorials = new Tutorial(data)
        await tutorials.save()
        return tutorials
        
    },
    getTutorialsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTutorials Model Function called")

        const tutorials = await Tutorial.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tutorialssize = tutorials.length

        return {
            tutorials: tutorials,
            count: tutorialssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTutorialsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTutorials Model Function called")

        const tutorials = await Tutorial.find(query.critarion).select(query.fields/* '_id TutorialName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tutorialssize = tutorials.length

        return {
            tutorials: tutorials,
            count: tutorialssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTutorial: async (data) => {
        console.log("updateTutorial HelperFunction is called");
        const result = await promise.all([Tutorial.findOneAndUpdate({_id: data.tutorialsid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTutorial: async (data) => {
        console.log("removeTutorial HelperFunction is called");

        const tutorials = await Tutorial.findById(data.id);
        if(tutorials == null){
             var error = "Tutorial does not exists."
             return error
        }
        tutorials.lastModifiedBy = data.lastModifiedBy
        tutorials.active = false
        await tutorials.save()
        return tutorials;
        

    },

    findTutorialById: async (query) => {
        console.log("findTutorialById HelperFunction is called");
        
        const tutorials = await Tutorial.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tutorials;
        

    },

    

};
