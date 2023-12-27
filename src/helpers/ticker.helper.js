/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const Ticker = mongoose.model('tickers')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTicker: async (data) => {
        console.log("createTicker Helper Function is called");
        const ticker = new Ticker(data)
        await ticker.save()
        return ticker
        
    },
    getTickersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTickersWithFullDetails Helper Function called")

        const tickers = await Ticker.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tickerssize = tickers.length

        return {
            tickers: tickers,
            count: tickerssize,
            offset: offset,
            limit: limit
        };
        
    },

    getActiveTickers: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getActiveTickers Helper Function called")
        let where = {active: true}
        const tickers = await Ticker.find(where)
       
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tickerssize = tickers.length

        return {
            tickers: tickers,
            count: tickerssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTickersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTickersList Helper Function called")

        const tickers = await Ticker.find(query.critarion).select(query.fields/* '_id TickerName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = tickers.length

        return {
            tickers: tickers,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTicker: async (data) => {
        console.log("updateTicker HelperFunction is called");
        
        const result = await Ticker.findOneAndUpdate({_id: data.tickerid}, data, {new: true})

        return result; 
                
    },

    

    removeTicker: async (data) => {
        console.log("removeTicker HelperFunction is called");

        const ticker = await Ticker.findById(data.id);
        if(ticker == null){
             var error = "Ticker does not exists."
             return error
        }
        ticker.lastModifiedBy = data.lastModifiedBy
        ticker.active = false
        ticker.save()
        return ticker;
        

    },

    findTickerById: async (query) => {
        console.log("findTickerById HelperFunction is called");
        
        const ticker = await Ticker.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return ticker;
        

    },

    

};
