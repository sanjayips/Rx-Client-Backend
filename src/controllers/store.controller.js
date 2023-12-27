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
const storeHelper = require('../helpers/store.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

const Store = mongoose.model('stores')

var pageSize = parseInt(config.PAGE_SIZE)

var createStoreOld = async (req, res) => {
    console.log('createStore')
    try {
        var storeData = req.body
        var role = req.token_decoded.r
        storeData.addedby = req.token_decoded.d

        
            var result = await storeHelper.createStore(storeData)
            var message = "Store created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var createStore = async (req, res) => {
    console.log('createPhoneBook')
    var storeimg
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "storeimg") {
                cb(null, './public/uploads/storeimages')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "storeimg") {
                storeimg = Date.now() + '-' + file.originalname
                cb(null, storeimg)
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
            //console.log("ext " + ext)
            
            let extentions = ['.png', '.jpg', '.gif']
          if (!extentions.includes(ext)){
               console.log("extension not supported")
               errorMessage = "Only PNG, JPG and GIF Files allowed"
               
               return res.status(500).json(errorMessage)
               
         }
         cb(null, true)
        }
    }).fields(
        [
            {
                name: 'storeimg',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "storeimg" && err.code == "LIMIT_UNEXPECTED_FILE") {
                console.log("only 1 file err")
                var message = "Only 1 image can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "storeimg" && err.code == "LIMIT_FILE_SIZE") {
                console.log("file size err")
                errorMessage = "File Limit is 5 MB";
                
                return res.status(500).json(errorMessage)
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            
            return res.status(500).json(err)
        }
        
        if(isErr){
            console.log("is err tru")
            try {
                fs.unlinkSync('./public/uploads/storeimages/' + storeimg);
            } catch (err) {
                console.log("this is the point")
               return responseHelper.requestfailure(res, err);

            }
            
               responseHelper.requestfailure(res, errorMessage)
        }else{
            
           let userData = JSON.parse(req.body.request)

        try {
            if(storeimg !== undefined){
                userData.businessImage = '/uploads/storeimages/' +storeimg;
            } else {
                let message = "Store Image not found"
                return responseHelper.requestfailure(res, message, err)
            }
            
            userData.addedby = req.token_decoded.d
    
            
            var result = await storeHelper.createStore(userData)
            var message = "Store created successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/storeimages/' + storeimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function


var getStoresWithFullDetails = async (req, res) => {
    console.log("getStoresWithFullDetails called")
    var storeData = req.body


    try {

        var result = await storeHelper.getStoresWithFullDetails(storeData.sortproperty, storeData.sortorder, storeData.offset, storeData.limit, storeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getStoresList = async (req, res) => {
    console.log("getStoresList called")
    var storeData = req.body


    try {

        var result = await storeHelper.getStoresList(storeData.sortproperty, storeData.sortorder, storeData.offset, storeData.limit, storeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateStoreOld = async (req, res) => {
    console.log("request received for updateStore")

    var storeData = req.body
    var role = req.token_decoded.r
    try {
        storeData.lastModifiedBy = req.token_decoded.d
        
            var result = await storeHelper.updateStore(storeData)
            var message = 'Store Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeStore = async (req, res) => {
    console.log("removeStore called")
    try {
        var role = req.token_decoded.r

       
            var storeData = req.body
            storeData.lastModifiedBy = req.token_decoded.d
            var result = await storeHelper.removeStore(storeData)

            var message = "Store removed successfully"

            if (result == "Store does not exists.") {
                message = "Store does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findStoreById = async (req, res) => {
    console.log("findStoreById called")
    try {
        var role = req.token_decoded.r

        
            var storeData = req.body

            var result = await storeHelper.findStoreById(storeData)
            console.log(result)
            var message = "Store find successfully"
            if (result == null) {
                message = "Store does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var updateStore = async (req, res) => {
    console.log("updateStore called")
    var storeimg
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "storeimg") {
                cb(null, './public/uploads/storeimages')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "storeimg") {
                storeimg = Date.now() + '-' + file.originalname
                cb(null, storeimg)
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
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
               isErr = true
               
         }
         cb(null, true);
        }
    }).fields(
        [
            {
                name: 'storeimg',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "storeimg" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "storeimg" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            if(errorMessage == "File Limit is 5 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/storeimages/' + storeimg);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        //userData.businessImage = '/uploads/storeimages/' + storeimg

        try {

            if(storeimg !== undefined){
                userData.businessImage = '/uploads/storeimages/' +storeimg;
            }

            var adminid = req.token_decoded.d
            userData.lastModifiedBy = adminid

            let existingStore = await Store.findById(userData.storeid)

            if(storeimg !== undefined && existingStore.businessImage !== '') {
                const imgpath = './public/' + existingStore.businessImage;
                    try {
                    fs.unlinkSync(imgpath);
                    } catch(err) {
                        console.log('Error Deleting old, probably already removed');
                        return responseHelper.requestfailure(res, err);
                    }
                }

            var result = await storeHelper.updateStore(userData)

            
                var message = "Feedback updated successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/storeimages/' + storeimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
  }


module.exports = {
    createStore,
    getStoresWithFullDetails,
    getStoresList,
    updateStore,
    removeStore,
    findStoreById

}



