/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Variant = mongoose.model('variants')
//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createVariant: async (data) => {
        console.log("createVariant HelperFunction is called");
        const variant = new Variant(data)
        await variant.save()
        return variant
        
    },
    getVariantsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getVariants Model Function called")

        const variants = await Variant.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const variantssize = variants.length

        return {
            variants: variants,
            count: variantssize,
            offset: offset,
            limit: limit
        };
        
    },

    getVariantsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getVariants Model Function called")

        const variants = await Variant.find(query.critarion).select(query.fields/* '_id VariantName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const variantssize = variants.length

        return {
            variants: variants,
            count: variantssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateVariant: async (data) => {
        console.log("updateVariant HelperFunction is called");
        
        const result = await Variant.findOneAndUpdate({_id: data.variantid}, data, {new: true})

        return result; 
                
    },

    

    removeVariant: async (data) => {
        console.log("removeVariant HelperFunction is called");

        const variant = await Variant.findById(data.id);
        if(variant == null){
             var error = "Variant does not exists."
             return error
        }
        variant.lastModifiedBy = data.lastModifiedBy
        variant.active = false
       await variant.save()
        return variant;
        

    },

    findVariantById: async (query) => {
        console.log("findVariantById HelperFunction is called");
        
        const variant = await Variant.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
       
        return variant;
        

    },

    

};
