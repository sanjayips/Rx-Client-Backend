/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const ProductAttributes = mongoose.model('productAttributes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createProductAttributes: async (data) => {
        console.log("createProductAttributes HelperFunction is called");
        const productAttribute = new ProductAttributes(data)
        await productAttribute.save()
        return productAttribute
        
    },
    getProductAttributesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductAttributes Model Function called")

        const productAttributes = await ProductAttributes.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productAttributessize = productAttributes.length

        return {
            productAttributes: productAttributes,
            count: productAttributessize,
            offset: offset,
            limit: limit
        };
        
    },

    getProductAttributesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getProductAttributess Model Function called")

        const productAttributes = await ProductAttributes.find(query.critarion).select(query.fields/* '_id ProductAttributesName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productAttributessize = productAttributes.length

        return {
            productAttributes: productAttributes,
            count: productAttributessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateProductAttributes: async (data) => {
        console.log("updateProductAttributes HelperFunction is called");
        const result = await promise.all([ProductAttributes.findOneAndUpdate({_id: data.productAttributeid}, data, {new: true})])
        //const result = await ProductAttributes.findOneAndUpdate({_id: data.productAttributeid}, data, {new: true})

        console.log('result')
        console.log(result[0])

        return result; 
                
    },

    

    removeProductAttributes: async (data) => {
        console.log("removeProductAttributes HelperFunction is called");

        const productAttribute = await ProductAttributes.findById(data.id);
        if(productAttribute == null){
             var error = "productAttribute does not exists."
             return error
        }
        productAttribute.lastModifiedBy = data.lastModifiedBy
        productAttribute.active = false
        await productAttribute.save()
        return productAttribute;
        

    },

    findProductAttributesById: async (query) => {
        console.log("findProductAttributesById HelperFunction is called");
        
        const productAttribute = await ProductAttributes.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return productAttribute;
        

    },

    

};
