/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Quote = mongoose.model('quotes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createQuote: async (data) => {
        console.log("createQuote HelperFunction is called");
        const quote = new Quote(data)
        await quote.save()
        return quote
        
    },
    getQuotesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getQuotes Model Function called")

        const quotes = await Quote.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const quotessize = quotes.length

        return {
            quotes: quotes,
            count: quotessize,
            offset: offset,
            limit: limit
        };
        
    },

    getQuotesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getQuotes Model Function called")

        const quotes = await Quote.find(query.critarion).select(query.fields/* '_id QuoteName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = quotes.length

        return {
            quotes: quotes,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateQuote: async (data) => {
        console.log("updateQuote HelperFunction is called");
        
        const result = await Quote.findOneAndUpdate({_id: data.quoteid}, data, {new: true})

        return result; 
                
    },

    

    removeQuote: async (data) => {
        console.log("removeQuote HelperFunction is called");

        const quote = await Quote.findById(data.id);
        if(quote == null){
             var error = "Quote does not exists."
             return error
        }
        quote.lastModifiedBy = data.lastModifiedBy
        quote.active = false
       await quote.save()
        return quote;
        

    },

    findQuoteById: async (query) => {
        console.log("findQuoteById HelperFunction is called");
        
        const quote = await Quote.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return quote;
        

    },

    

};
