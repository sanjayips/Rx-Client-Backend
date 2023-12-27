/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Store = mongoose.model('stores')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createStore: async (data) => {
        console.log("createStore HelperFunction is called");
        const store = new Store(data)
        await store.save()
        return store
        
    },
    getStoresWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getStores Model Function called")

        const stores = await Store.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const storessize = stores.length

        return {
            stores: stores,
            count: storessize,
            offset: offset,
            limit: limit
        };
        
    },

    getStoresList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getStores Model Function called")

        const stores = await Store.find(query.critarion).select(query.fields/* '_id StoreName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const storessize = stores.length

        return {
            stores: stores,
            count: storessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateStore: async (data) => {
        console.log("updateStore HelperFunction is called");
        const result = await promise.all([Store.findOneAndUpdate({_id: data.storeid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeStore: async (data) => {
        console.log("removeStore HelperFunction is called");

        const store = await Store.findById(data.id);
        if(store == null){
             var error = "Store does not exists."
             return error
        }
        store.lastModifiedBy = data.lastModifiedBy
        store.active = false
        await store.save()
        return store;
        

    },

    findStoreById: async (query) => {
        console.log("findStoreById HelperFunction is called");
        
        const store = await Store.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return store;
        

    },

    

};
