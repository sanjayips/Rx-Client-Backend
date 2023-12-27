/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Lexicon = mongoose.model('lexicons')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createLexicon: async (data) => {
        console.log("createLexicon HelperFunction is called");
        const lexicon = new Lexicon(data)
        await lexicon.save()
        return lexicon
        
    },
    getLexiconsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getLexicons Model Function called")

        const lexicons = await Lexicon.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const lexiconssize = lexicons.length

        return {
            lexicons: lexicons,
            count: lexiconssize,
            offset: offset,
            limit: limit
        };
        
    },

    getLexiconsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getLexicons Model Function called")

        const lexicons = await Lexicon.find(query.critarion).select(query.fields/* '_id LexiconName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const lexiconssize = lexicons.length

        return {
            lexicons: lexicons,
            count: lexiconssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateLexicon: async (data) => {
        console.log("updateLexicon HelperFunction is called");
        const result = await promise.all([Lexicon.findOneAndUpdate({_id: data.lexiconid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeLexicon: async (data) => {
        console.log("removeLexicon HelperFunction is called");

        const lexicon = await Lexicon.findById(data.id);
        if(lexicon == null){
             var error = "Lexicon does not exists."
             return error
        }
        lexicon.lastModifiedBy = data.lastModifiedBy
        lexicon.active = false
        await lexicon.save()
        return lexicon;
        

    },

    findLexiconById: async (query) => {
        console.log("findLexiconById HelperFunction is called");
        
        const lexicon = await Lexicon.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return lexicon;
        

    },

    

};
