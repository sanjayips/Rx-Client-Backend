/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')
var multer = require('multer')
const productHelper = require('../helpers/products.helper')
const Store = mongoose.model('stores')
const Product = mongoose.model('products')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants
var sizeOf = require('image-size')
var pageSize = parseInt(config.PAGE_SIZE)
//this function has to be changed
var createProductOld = async (req, res) => {
    console.log('createProduct')
    try {
        let productData = req.body
        productData.addedby = req.token_decoded.d

        
            let result = await productHelper.createProduct(productData)

            let store = await Store.findById(productData.store)

            store.products.push(result._id)

            await store.save()

            let message = "Product created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var createProduct = async (req, res) => {
    console.log('createProduct called')
    var picturefiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                cb(null, './public/uploads/products')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                
                let picfile = Date.now() + '-' + file.originalname
                
                picturefiles.push(picfile)
                cb(null, picfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);

            let extentions = ['.png', '.jpg', '.jpeg', '.gif']
            if (!extentions.includes(ext)) {

                errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'pictures',
                maxCount: 5
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "pictures" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 5 images can be uploaded";
                isErr = true
                
            } else if (err.field == "pictures" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5 MB";
                isErr = true

            }

        } else if (err) {
            
            return res.status(500).json(err)
        }

        if (isErr) {

            if (errorMessage == "File Limit is 5 MB") {
                console.log(picturefiles)
                
                try {
                    /* console.log('try called')
                    console.log(pic) */
                    let i = 1
                    for(pic of picturefiles){
                        console.log('iterations '+i)
                        i++
                    if (fs.existsSync('./public/uploads/products/' + pic)){
                        console.log('file exists')
                        console.log(pic)
                       await fs.unlinkSync('./public/uploads/products/' + pic)
                    } }
    
                } catch (err) {
                    console.log(err)
                    //return responseHelper.requestfailure(res, err)
                }
           console.log('first failure response')
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 5 images can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            console.log('2nd failure response')
            return responseHelper.requestfailure(res, errorMessage)
        } else {

           let productData = JSON.parse(req.body.request)
            try {
                let picurls = []
                if (picturefiles.length !== 0) {

                    picturefiles.map(pic => {
                        picurls.push('/uploads/products/' + pic)
                    })
                } else {
                    let message = "Product Images not found"
                    return responseHelper.requestfailure(res, message, err)
                }

                productData.addedby = req.token_decoded.d

                productData.productImagesURLs = picurls
            let result = await productHelper.createProduct(productData)

            let store = await Store.findById(productData.store)

            store.products.push(result._id)

            await store.save()

            let message = "Product created successfully"
                return responseHelper.success(res, result, message)


            } catch (err) {

                try {
                    //fs.unlinkSync('./public/uploads/products/' + pictures)
                    picturefiles.map(pic => {
                        fs.unlinkSync('./public/uploads/products/' + pic)
                    })
                } catch (err) {
                    return responseHelper.requestfailure(res, err);

                }

                logger.error(err)
                return responseHelper.requestfailure(res, err)
            }



        }

    })

} //end function


var getProductsWithFullDetails = async (req, res) => {
    console.log("getProductsWithFullDetails called")
    var productData = req.body


    try {

        var result = await productHelper.getProductsWithFullDetails(productData.sortproperty, productData.sortorder, productData.offset, productData.limit, productData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getProductsList = async (req, res) => {
    console.log("getProductsList called")
    var productData = req.body


    try {

        var result = await productHelper.getProductsList(productData.sortproperty, productData.sortorder, productData.offset, productData.limit, productData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateProduct = async (req, res) => {
    console.log("request received for updateProduct")

    var productData = req.body
    var role = req.token_decoded.r
    try {
        productData.lastModifiedBy = req.token_decoded.d
        
            var result = await productHelper.updateProduct(productData)
            var message = 'Product Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeProduct = async (req, res) => {
    console.log("removeProduct called")
    try {
        var role = req.token_decoded.r

       
            var productData = req.body
            productData.lastModifiedBy = req.token_decoded.d
            var result = await productHelper.removeProduct(productData)

            var message = "Product removed successfully"

            if (result == "Product does not exists.") {
                message = "Product does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findProductById = async (req, res) => {
    console.log("findProductById called")
    try {
               
            var productData = req.body

            var result = await productHelper.findProductById(productData)
            console.log(result)
            var message = "Product find successfully"
            if (result == null) {
                message = "Product does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var deleteProductImages = async (req, res) => {
    console.log("getProductsList called")
    var productData = req.body



    try {
        let { images } = productData

        console.log(images)

        for (img of images) {
            fs.unlinkSync('./public' + img)
        }

        let product = await Product.findById(productData.productid)

        for (img of images) {
            product.productImagesURLs.splice(product.productImagesURLs.indexOf(img), 1)
        }

        await product.save()
        var message = 'Successfully loaded'

        responseHelper.success(res, product, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}


var addImagesToProducts = async (req, res) => {
    console.log('addImagesToProducts called')
    var picturefiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                cb(null, './public/uploads/products')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                
                let picfile = Date.now() + '-' + file.originalname
                
                picturefiles.push(picfile)
                cb(null, picfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);

            let extentions = ['.png', '.jpg', '.jpeg', '.gif']
            if (!extentions.includes(ext)) {

                errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'pictures',
                maxCount: 5
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "pictures" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 5 images can be uploaded";
                isErr = true
                
            } else if (err.field == "pictures" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5 MB";
                isErr = true

            }

        } else if (err) {
            
            return res.status(500).json(err)
        }

        if (isErr) {

            if (errorMessage == "File Limit is 5 MB") {
                console.log(picturefiles)
                
                try {
                    /* console.log('try called')
                    console.log(pic) */
                    let i = 1
                    for(pic of picturefiles){
                        console.log('iterations '+i)
                        i++
                    if (fs.existsSync('./public/uploads/products/' + pic)){
                        console.log('file exists')
                        console.log(pic)
                        fs.unlinkSync('./public/uploads/products/' + pic)
                    } }
    
                } catch (err) {
                    console.log(err)
                    //return responseHelper.requestfailure(res, err)
                }
           console.log('first failure response')
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 5 images can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            console.log('2nd failure response')
            return responseHelper.requestfailure(res, errorMessage)
        } else {

           let productData = JSON.parse(req.body.request)
            try {
                let picurls = []
                if (picturefiles.length !== 0) {

                    picturefiles.map(pic => {
                        picurls.push('/uploads/products/' + pic)
                    })
                } else {
                    let message = "Product Images not found"
                    return responseHelper.requestfailure(res, message, err)
                }

               
            

            let product = await Product.findById(productData.productid)

            let existingNumberOfImages = product.productImagesURLs.length
            let vacantImageSlots = 0

            if(existingNumberOfImages === 5){
                //if there are 5 images uploaded already, delete uploaded images
                for(pic of picturefiles){
                    
                if (fs.existsSync('./public/uploads/products/' + pic)){
                    
                   fs.unlinkSync('./public/uploads/products/' + pic)
                } }

                let message = "Product Images limit already reached"
                return responseHelper.requestfailure(res, message, err)
            } else {
                //uploaded images according to vacant slots out of 5
                console.log(picurls)
                    vacantImageSlots = 5 - existingNumberOfImages
                   for(let i = 0; i < vacantImageSlots; i++){
                    console.log("first foor loop")
                    product.productImagesURLs.push(picurls[i])
                   }

                   //Delete those uploaded images which are not assigned to product
                   //due to image upload limit of 5
                   for(let j = vacantImageSlots; j < picurls.length; j++ ){
                    console.log("2nd foor loop")

                    console.log(j)
                    console.log(picurls[j])
                    if (fs.existsSync('./public' + picurls[j])){
                    
                        fs.unlinkSync('./public' + picurls[j])
                     }
                   }
            }
            product.lastModifiedBy = req.token_decoded.d

            await product.save()

            let message 

            let imagesDeleted = picurls.length - vacantImageSlots

            if(imagesDeleted > 0){
                message = `${vacantImageSlots} Images uploaded and ${imagesDeleted} were discarded`
            } else {
                message = `${vacantImageSlots} Images uploaded and and no images is descarded`
            }

            
                return responseHelper.success(res, product, message)


            } catch (err) {
console.log('last catch called')
                try {
                    //fs.unlinkSync('./public/uploads/products/' + pictures)
                    console.log('last try called')
                    picturefiles.map(pic => {
                        fs.unlinkSync('./public/uploads/products/' + pic)
                    })
                } catch (err) {
                    return responseHelper.requestfailure(res, err);

                }

                logger.error(err)
                return responseHelper.requestfailure(res, err)
            }



        }

    })

} //end function










module.exports = {
    createProduct,
    getProductsWithFullDetails,
    getProductsList,
    updateProduct,
    removeProduct,
    findProductById,
    deleteProductImages,
    addImagesToProducts

}



