/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const ProductsWishList = mongoose.model('productsWishLists')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createProductsWishList: async (data) => {
        console.log("createProductsWishList HelperFunction is called");
        const productsWishList = new ProductsWishList(data)
        await productsWishList.save()
        return productsWishList
        
    },
    getProductsWishListWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductsWishList Model Function called")

        const productsWishList = await ProductsWishList.find(query.critarion)
        .populate('wishListItems', query.wishListItemsFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('user', query.userFields)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productsWishListsize = productsWishList.length

        return {
            productsWishList: productsWishList,
            count: productsWishListsize,
            offset: offset,
            limit: limit
        };
        
    },

    getProductsWishListList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductsWishLists Model Function called")

        const productsWishList = await ProductsWishList.find(query.critarion).select(query.fields/* '_id ProductsWishListName' */)
        .populate('user', query.user)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productsWishListsize = productsWishList.length

        return {
            productsWishList: productsWishList,
            count: productsWishListsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateProductsWishList: async (data) => {
        console.log("updateProductsWishList HelperFunction is called");
        const result = await promise.all([ProductsWishList.findOneAndUpdate({_id: data.productsWishListid}, data, {new: true})])
        

        return result; 
                
    },

    

    removeProductsWishList: async (data) => {
        console.log("removeProductsWishList HelperFunction is called");

        const productsWishList = await ProductsWishList.findById(data.id);
        if(productsWishList == null){
             var error = "productsWishList does not exists."
             return error
        }
        productsWishList.lastModifiedBy = data.lastModifiedBy
        productsWishList.active = false
        await productsWishList.save()
        return productsWishList;
        

    },

    findProductsWishListById: async (query) => {
        console.log("findProductsWishListById HelperFunction is called");
        
        const productsWishList = await ProductsWishList.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('user', query.user)
        
        return productsWishList
        

    },

    findUsersWishList: async (query) => {
        console.log("findUsersWishList Model Function called")

        const productsWishList = await ProductsWishList.find(query)
               
        return productsWishList
        
    },

    

};
