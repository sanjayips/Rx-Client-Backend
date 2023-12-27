/**
 * Created by Jamshaid
 */


var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const verificationHelper = require('../helpers/userverification.helper')
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var sendCodeOnEmail = async (req, res) => {
    console.log('sendCodeOnEmail')
    try {
        var userData = req.body
        
        let randomize = require('randomatic');
        let verification_code = randomize('0', 4, {})

        userData.emailverificationcode = verification_code
        
        res.mailer.send('emails/verification-code.html', {
            verification_code: verification_code,
            title: "Email Verification",
            to: userData.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Email Verification Code', // REQUIRED.
        }, async (err) => {
            if (err) {
                return console.error("Email could not sent: ", err)
            }
        })

        let exists = await verificationHelper.findUserVerificationByEmail(userData.email)

        if(exists){
console.log("Updated Called")
            //userData.emailverified = true
            let result = await verificationHelper.updateUserVerification(userData)

            var message = "Verified updated successfully"
            return responseHelper.success(res, {}, message)

        } else {
console.log("Created Called")
            let result = await verificationHelper.createUserVerification(userData)
            var message = "Verification created successfully"
            return responseHelper.success(res, {}, message)

        }

        
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var verifyemailCode = async (req, res) => {
    console.log("verifyCode is called");
    var userData = req.body;
    
    try {
        //let emailverified = false
        let exists = await verificationHelper.findUserVerificationByEmail(userData.email)
        
        if(exists.emailverificationcode == userData.emailverificationcode ){
            //emailverified = true

            userData.emailverified = true
            let result = await verificationHelper.updateUserVerification(userData)

            var message = "Code verified successfully"
       
        return responseHelper.success(res, result, message)
        } else {
            var message = "Code verification failed";
            return responseHelper.requestfailure(res, message)
        }

        
    }
    catch(err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
}

var sendCodeOnMobile = async (req, res) => {
    console.log('sendCodeOnEmail')
    try {
        var userData = req.body
        
let responsedata = null
        if (userData.phonenumber) {
            client
            .verify
            .services(process.env.SERVICE_ID)
            .verifications
            .create({
                to: `+${userData.phonenumber}`,
                channel: userData.channel==='call' ? 'call' : 'sms' 
            })
            .then(data => {
                //console.log('sms sent')
                //console.log(data)
                var message = "Code sent on phone successfully"
            return responseHelper.success(res, data, message)
    
                /* return {
                    message: "Verification is sent!!",
                    phonenumber: userData.phonenumber,
                    data
                } */
            })
            .catch(error => {
                /* console.log('failure')
                console.log(error) */
            })
         } else {
            
            //console.log("error")
            /* return {
                message: "Wrong phone number :(",
                phonenumber: userData.phonenumber,
                data
            } */
         }
        
        

        //let result = await verificationHelper.updateUserVerification(userData)
            
        

    } catch (err) {
        logger.error(err)
       return responseHelper.requestfailure(res, err)
    }
} //end function

var verifyPhoneNumber = async (req, res) => {
    console.log('verifyPhoneNumber called')
    try {
        let userData = req.body
        if (userData.phoneNumber && (userData.phoneverificationcode).length === 6) {
            client
                .verify
                .services(process.env.SERVICE_ID)
                .verificationChecks
                .create({
                    to: `+${userData.phoneNumber}`,
                    code: userData.phoneverificationcode
                })
                .then(async (data) => {
                    if (data.status === "approved") {

                        let userverification = {}
                        userverification.email = userData.email
                        userverification.phoneverificationcode = userData.phoneverificationcode
                        userverification.phoneverified = true
            let result = await verificationHelper.updateUserVerification(userverification)

                        var message = "Phone is Verified!";
                  return  responseHelper.success(res, result, message)
                    }
                })
                .catch(err => {
                    let error = "Phone Number or Verification Code is wrong or expired"
                    return  responseHelper.requestfailure(res, error)
                })
        } else {
            

            var err = {
                message: "Wrong phone number or code :(",
                phoneNumber: userData.phoneNumber,
                data
            }

          return  responseHelper.requestfailure(res, err)
        }
    } catch(err) {
        
       return responseHelper.requestfailure(res, err);
  }
} //end function






module.exports = {
    sendCodeOnEmail,
    verifyemailCode,
    sendCodeOnMobile,
    verifyPhoneNumber

}



