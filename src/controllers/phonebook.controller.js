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
const fs = require('fs');
const moment = require('moment')

const phonebookHelper = require('../helpers/businessphonebook.helper')

const PhoneBook = mongoose.model('businessPhoneBooks')
const Tickers = mongoose.model('tickers')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createPhoneBook = async (req, res) => {
    console.log('createPhoneBook')
    var logoimg
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "logoimg") {
                cb(null, './public/uploads/logoimages')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "logoimg") {
                logoimg = Date.now() + '-' + file.originalname
                cb(null, logoimg)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 1
        },
        fileFilter: (req, file, cb) => {
            
            let ext = path.extname(file.originalname);
            //console.log("ext " + ext)
            
            let extentions = ['.png', '.svg', '.PNG']
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, and SVG Files allowed"
               isErr = true
               
         }
         cb(null, true)
        }
    }).fields(
        [
            {
                name: 'logoimg',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "logoimg" && err.code == "LIMIT_UNEXPECTED_FILE") {

                var message = "Only 1 image can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "logoimg" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 1MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){

            try {
                fs.unlinkSync('./public/uploads/logoimages/' + logoimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }
            
               responseHelper.requestfailure(res, errorMessage)
        }else{
            
            userData = JSON.parse(req.body.request)

        try {
            if(logoimg !== undefined){
                userData.logoFile = '/uploads/logoimages/' +logoimg;
            }
            var role = req.token_decoded.r
            userData.addedby = req.token_decoded.d
    
            if (role == '_a') {
                var result = await phonebookHelper.createPhoneBook(userData)
                var message = "PhoneBook created successfully"
                return responseHelper.success(res, result, message)
            } else {
                let err = "Unauthorized to create PhoneBook"
                return responseHelper.requestfailure(res, err)
            }
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/logoimages/' + logoimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function

var updatePhoneBook = async (req, res) => {
    console.log('createPhoneBook')
    var logoimg
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "logoimg") {
                cb(null, './public/uploads/logoimages')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "logoimg") {
                logoimg = Date.now() + '-' + file.originalname
                cb(null, logoimg)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 1
        },
        fileFilter: (req, file, cb) => {
            
            let ext = path.extname(file.originalname);
            console.log("ext " + ext)
            
            let extentions = ['.png', '.svg', '.PNG']
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, and SVG Files allowed"
               isErr = true
               
         }
         cb(null, true)
        }
    }).fields(
        [
            {
                name: 'logoimg',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "logoimg" && err.code == "LIMIT_UNEXPECTED_FILE") {

                var message = "Only 1 image can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "logoimg" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 1MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            
               responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        //userData.logoFile = '/uploads/logoimages/' + logoimg

        try {
            if(logoimg !== undefined){
                userData.logoFile = '/uploads/logoimages/' +logoimg;
            }
            
            userData.lastModifiedBy = req.token_decoded.d

            let existingPhoneBook = await PhoneBook.findById(userData.phonebookid)

            if(logoimg !== undefined && existingPhoneBook.logoFile !== '') {
                const imgpath = './public/' + existingPhoneBook.logoFile;
                    try {
                    fs.unlinkSync(imgpath);
                    } catch(err) {
                        console.log('Error Deleting old file, probably already removed');
                        return responseHelper.requestfailure(res, err);
                    }
                }
    
           
                var result = await phonebookHelper.updatePhoneBook(userData)

                let existingTickers = existingPhoneBook.tickers

                for(let id of existingTickers){
                    let existingTicker = await Tickers.findById(id)
                    existingTicker.logoFile = '/uploads/logoimages/' +logoimg
                    await existingTicker.save()
                }


                var message = "PhoneBook Updated successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/logoimages/' + logoimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function


var getPhoneBooksWithFullDetails = async (req, res) => {
    console.log("getPhoneBooksWithFullDetails controller Function called")
    var phonebookData = req.body


    try {

        

        var result = await phonebookHelper.getPhoneBooksWithFullDetails(phonebookData.sortproperty, phonebookData.sortorder, phonebookData.offset, phonebookData.limit, phonebookData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getPhoneBooksList = async (req, res) => {
    console.log("getPhoneBooksList called")
    var phonebookData = req.body


    try {

        var result = await phonebookHelper.getPhoneBooksList(phonebookData.sortproperty, phonebookData.sortorder, phonebookData.offset, phonebookData.limit, phonebookData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}


var removePhoneBook = async (req, res) => {
    console.log("removePhoneBook called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var phonebookData = req.body
            phonebookData.lastModifiedBy = req.token_decoded.d
            var result = await phonebookHelper.removePhoneBook(phonebookData)

            var message = "PhoneBook removed successfully"

            if (result == "PhoneBook does not exists.") {
                message = "PhoneBook does not exists."
            }
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a PhoneBook"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findPhoneBookById = async (req, res) => {
    console.log("findPhoneBookById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var phonebookData = req.body

            var result = await phonebookHelper.findPhoneBookById(phonebookData)
            console.log(result)
            var message = "PhoneBook find successfully"
            if (result == null) {
                message = "PhoneBook does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a PhoneBook"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var getPhoneBooksWithFullDetailsPublic = async (req, res) => {
    console.log("getPhoneBooksWithFullDetailsPublic controller called")
    var phonebookData = req.body


    try {

        var result = await phonebookHelper.getPhoneBooksWithFullDetails(phonebookData.sortproperty, phonebookData.sortorder, phonebookData.offset, phonebookData.limit, phonebookData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}





module.exports = {
    createPhoneBook,
    getPhoneBooksWithFullDetails,
    getPhoneBooksList,
    updatePhoneBook,
    removePhoneBook,
    findPhoneBookById,
    getPhoneBooksWithFullDetailsPublic

}



