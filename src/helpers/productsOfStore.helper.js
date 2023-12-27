/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const ProductsOfStore = mongoose.model('productsOfStore')

//bluebird for promises
const promise = require('bluebird')
//helper functions
logger = require("./logger");

module.exports = {

    createProductsOfStore: async (data) => {
        console.log("createProductsOfStore HelperFunction is called");
        const productsOfProductsOfStore = new ProductsOfStore(data)
        await productsOfProductsOfStore.save()
        return productsOfProductsOfStore
        
    },
    getProductsOfStoresWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductsOfStores Model Function called")

        const productsOfProductsOfStores = await ProductsOfStore.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productsOfProductsOfStoressize = productsOfProductsOfStores.length

        return {
            productsOfProductsOfStores: productsOfProductsOfStores,
            count: productsOfProductsOfStoressize,
            offset: offset,
            limit: limit
        };
        
    },

    getProductsOfStoresList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductsOfStores Model Function called")

        const productsOfProductsOfStores = await ProductsOfStore.find(query.critarion).select(query.fields/* '_id productsOfProductsOfStoreName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productsOfProductsOfStoressize = productsOfProductsOfStores.length

        return {
            productsOfProductsOfStores: productsOfProductsOfStores,
            count: productsOfProductsOfStoressize,
            offset: offset,
            limit: limit
        };
        
    },

    updateProductsOfStore: async (data) => {
        console.log("updateProductsOfStore HelperFunction is called");
        const result = await promise.all([ProductsOfStore.findOneAndUpdate({_id: data.productsOfStoreid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeProductsOfStore: async (data) => {
        console.log("removeProductsOfStore HelperFunction is called");

        const productsOfProductsOfStore = await ProductsOfStore.findById(data.id);
        if(productsOfProductsOfStore == null){
             var error = "ProductsOfStore does not exists."
             return error
        }
        productsOfProductsOfStore.lastModifiedBy = data.lastModifiedBy
        productsOfProductsOfStore.active = false
        await productsOfProductsOfStore.save()
        return productsOfProductsOfStore;
        

    },

    findProductsOfStoreById: async (query) => {
        console.log("findProductsOfStoreById HelperFunction is called");
        
        const productsOfProductsOfStore = await ProductsOfStore.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return productsOfProductsOfStore;
        

    },

    

};
