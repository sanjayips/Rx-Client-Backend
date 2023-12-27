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
var multer = require('multer');
const fs = require('fs');
const moment = require('moment')
const tickerHelper = require('../helpers/ticker.helper')

const Ticker = mongoose.model('tickers')
const PhoneBook = mongoose.model('businessPhoneBooks')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

/* var createTicker = async (req, res) => {
    console.log('createTicker')
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

            try {
                fs.unlinkSync('./public//uploads/logoimages/' + logoimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }
            
               responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);



        try {
            if(logoimg !== undefined){
                userData.logoFile = '/uploads/logoimages/' +logoimg;
            }
            var role = req.token_decoded.r
            userData.addedby = req.token_decoded.d
    
            if (role == '_a') {
                var result = await tickerHelper.createTicker(userData)
                var message = "Ticker created successfully"
                return responseHelper.success(res, result, message)
            } else {
                let err = "Unauthorized to create Ticker"
                return responseHelper.requestfailure(res, err)
            }
    
        } catch (err) {

            try {
                fs.unlinkSync('./public//uploads/logoimages/' + logoimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function */

/* var updateTicker = async (req, res) => {
    console.log('createTicker')
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

            let existingTicker = await Ticker.findById(userData.tickerid)

            if(logoimg !== undefined && existingTicker.logoFile !== '') {
                const imgpath = './public/' + existingTicker.logoFile;
                    try {
                    fs.unlinkSync(imgpath);
                    } catch(err) {
                        console.log('Error Deleting old, probably already removed');
                        return responseHelper.requestfailure(res, err);
                    }
                }
    
           
                var result = await tickerHelper.updateTicker(userData)
                var message = "Ticker Updated successfully"
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
    
} //end function */

var createTicker = async (req, res) => {
    console.log('createDepartment')
    try {
        var tickerData = req.body
        
        tickerData.addedby = req.token_decoded.d

        
        
            var result = await tickerHelper.createTicker(tickerData)

            let phonebook = await PhoneBook.findById(tickerData.phonebookid)

            phonebook.tickers.push(result._id)

            await phonebook.save()

            var message = "Ticker created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var getTickersWithFullDetails = async (req, res) => {
    console.log("getTickersWithFullDetails controller Function called")
    var tickerData = req.body


    try {

        

        var result = await tickerHelper.getTickersWithFullDetails(tickerData.sortproperty, tickerData.sortorder, tickerData.offset, tickerData.limit, tickerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTickersList = async (req, res) => {
    console.log("getTickersList called")
    var tickerData = req.body


    try {

        var result = await tickerHelper.getTickersList(tickerData.sortproperty, tickerData.sortorder, tickerData.offset, tickerData.limit, tickerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

 var updateTicker = async (req, res) => {
    console.log("request received for updateTicker")

    var tickerData = req.body
    
    try {
        tickerData.lastModifiedBy = req.token_decoded.d
        
            var result = await tickerHelper.updateTicker(tickerData)
            var message = 'Ticker Updated successfully'
        
        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
} 

var removeTicker = async (req, res) => {
    console.log("removeTicker called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var tickerData = req.body
            tickerData.lastModifiedBy = req.token_decoded.d
            var result = await tickerHelper.removeTicker(tickerData)

            var message = "Ticker removed successfully"

            if (result == "Ticker does not exists.") {
                message = "Ticker does not exists."
            }
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Ticker"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTickerById = async (req, res) => {
    console.log("findTickerById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var tickerData = req.body

            var result = await tickerHelper.findTickerById(tickerData)
            console.log(result)
            var message = "Ticker find successfully"
            if (result == null) {
                message = "Ticker does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a Ticker"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var getTickersWithFullDetailsPublic = async (req, res) => {
    console.log("getTickersWithFullDetailsPublic controller called")
    var tickerData = req.body


    try {

        var activeTickers = await tickerHelper.getActiveTickers(tickerData.sortproperty, tickerData.sortorder, tickerData.offset, tickerData.limit, tickerData.query)

        /* activeTickers.tickers.map(async(item) => {
            console.log(item._doc)
            if(moment(item.expiryDate).isBefore()){
              item.active = false
              await item.save()
            } else {
              
            }
          }) */

          for(var ticker of activeTickers.tickers){
            if(moment(ticker.expiryDate).isBefore()){
                ticker.active = false
                await ticker.save()
              } else {
                
              }
          }

        var result = await tickerHelper.getTickersWithFullDetails(tickerData.sortproperty, tickerData.sortorder, tickerData.offset, tickerData.limit, tickerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}





module.exports = {
    createTicker,
    getTickersWithFullDetails,
    getTickersList,
    updateTicker,
    removeTicker,
    findTickerById,
    getTickersWithFullDetailsPublic

}



