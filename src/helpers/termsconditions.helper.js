/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const Terms = mongoose.model('termsconditions')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTerms: async (data) => {
        console.log("createterm HelperFunction is called");
        const term = new Terms(data)
        await term.save()
        return term
        
    },
    getTermsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTerms Model Function called")

        const terms = await Terms.find(query.critarion)       
        .populate('addedby', query.addedby)        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const termssize = terms.length

        return {
            terms: terms,
            count: termssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTermsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTerms Model Function called")

        const terms = await Terms.find(query.critarion).select(query.fields/* '_id termName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const termsize = terms.length

        return {
            terms: terms,
            count: termsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTerms: async (data) => {
        console.log("updateTerms HelperFunction is called");
        
        const result = await Terms.findOneAndUpdate({_id: data.termid}, data, {new: true})

        return result; 
                
    },

    

    removeTerms: async (data) => {
        console.log("removeTerms HelperFunction is called");

        const term = await Terms.findById(data.id);
        if(term == null){
             var error = "Terms does not exists."
             return error
        }
        term.lastModifiedBy = data.lastModifiedBy
        term.active = false
        await term.save()
        return term;
        

    },

    findTermsById: async (query) => {
        console.log("findtermById HelperFunction is called");
        
        const term = await Terms.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return term;
        

    },

    

};
