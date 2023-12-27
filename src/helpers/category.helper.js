/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


var Category = mongoose.model('categories');

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("../helpers/logger");
//notification = require("../controllers/notifications.controller");
const notificationtexts = require("../hardCodedData").notificationtexts;
const constants = require("../hardCodedData").constants;

module.exports = {

    createCategory: async (data) => {
        console.log("createCategory HelperFunction is called");
        const category = new Category(data);
        await category.save()
        return category;
        
    },
    getCategories: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000) => {
        console.log("getCategories Model Function called")
        const categories = await Category.find()
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = categories.length

        return {
            categories: categories,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updatecategory: async (data) => {
        console.log("updatecategory HelperFunction is called");
        
        const result = await Category.findOneAndUpdate({_id: data.catgid}, data, {new: true})

        return result; 
                
    },

    removeCategory: async (id) => {
        console.log("removeUser HelperFunction is called");

        const category = await Category.findById(id);
        
        const result = await category.remove();
        return result;
        

    },

};
