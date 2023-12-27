/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const Product = mongoose.model('products')
//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createProduct: async (data) => {
        console.log("createProduct HelperFunction is called");
        const product = new Product(data)
        await product.save()
        return product
        
    },
    getProductsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getProducts Model Function called")

        const products = await Product.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('productCategories', query.productCategories)
        .populate('store', query.store)
        .populate({
            path: 'variants',
            select: query.productVariants,
            populate: {
                path: 'attributes',
                model: 'productAttributes',
                select: query.variantAttributes
            }
        })
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const productssize = products.length

        return {
            products: products,
            count: productssize,
            offset: offset,
            limit: limit
        };
        
    },

    getProductsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getProducts Model Function called")

        const products = await Product.find(query.critarion).select(query.fields/* '_id ProductName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = products.length

        return {
            products: products,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateProduct: async (data) => {
        console.log("updateProduct HelperFunction is called");
        
        const result = await Product.findOneAndUpdate({_id: data.productid}, data, {new: true})

        return result; 
                
    },

    

    removeProduct: async (data) => {
        console.log("removeProduct HelperFunction is called");

        const product = await Product.findById(data.id);
        if(product == null){
             var error = "Product does not exists."
             return error
        }
        product.lastModifiedBy = data.lastModifiedBy
        product.active = false
       await product.save()
        return product;
        

    },

    findProductById: async (query) => {
        console.log("findProductById HelperFunction is called");
        
        const product = await Product.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('productCategories', query.productCategories)
        .populate('store', query.store)
        .populate({
            path: 'variants',
            select: query.productVariants,
            populate: {
                path: 'attributes',
                model: 'productAttributes',
                select: query.variantAttributes
            }
        })
        return product;
        

    },

    

};
