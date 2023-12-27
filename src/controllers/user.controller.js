
//import mongoose and models
var mongoose = require('mongoose');
var AC = mongoose.model("AC");
var User = mongoose.model('users');

//var Subscription = mongoose.model('subscriptions');
var config = require('dotenv').config();
var multer = require('multer');
const fs = require('fs');
const moment = require('moment')

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');
const userHelper = require('../helpers/user.helper')
const taskerHelper = require('../helpers/taskers.helper')
const individualTaskerHelper = require('../helpers/individualTaskers.helper')
const taskerCompapnyHelper = require('../helpers/taskerCompanies.helper')

//helper functions
logger = require("../helpers/logger");

responseHelper = require("../helpers/response.helper");

const JobHelper = require("../helpers/jobs.helper")

const { lookup } = require('geoip-lite')
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


var AS = async (req, res) => {
    console.log("AS is called");
    AC.findOne({})
        .then(async (ac) => {
            if (ac) {
                ac.as = !ac.as;
                await ac.save()
                responseHelper.success(res, ac, "ac done!");
            } else {
                var ac = new AC()
                await ac.save()
                responseHelper.success(res, ac, "ac done!");
            }
        })
        .catch(err => responseHelper.systemfailure(res, err));
};

var getprofilefromid = (req, res) => {
    console.log("getprofilefromid is called");
    var userData = req.query;

    return userHelper.getUserFromId(userData.uid)
        .then((exist) => {
            if (exist) {
                var message = 'User fetched successfully';
                responseHelper.success(res, exist, message);
            }
            else {
                var message = 'User does not exist';
                responseHelper.requestfailure(res, message);
            }
        })
        .catch((err) => {
            logger.error(err);
            responseHelper.systemfailure(res, err);
        });
};

var signup = async (req, res) => {
    console.log("signup is called");
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    const locationData = lookup(ip)

    try {
        var userData = req.body;
        userData.ipAddress = ip
        if (locationData != null) { userData.country = locationData.country }

        //console.log(userData);
        if (userData._id) {
            // mongoose userData._id
            let exists = await userHelper.isUserIdExists(userData._id);
            if (exists) {
                new_user = false;
                userandtoken = await userHelper.updateUser(userData)
            } else {
                if (userData.calltype == "login") {
                    let err = "Please Signup first!"
                    return responseHelper.requestfailure(res, err);
                } else {
                    new_user = true;

                    if (!userData.email) {
                        userData.email = userData._id;
                    }
                    let newUser = new User(userData);
                    await newUser.save();


                    userandtoken = await userHelper.updateUser(userData)
                }
            }
        } else {
            userData.email = userData.email.toLowerCase();
            let exists = await userHelper.isUserEmailExists(userData.email);
            if (exists) {

                let err = "Email already exists";
                return responseHelper.requestfailure(res, err);

            } else {
                if(userData.role === "companytasker") {
                    let validInvalid = await checkEmailAddressString(userData)

                    if(validInvalid === "invalid"){
                        let companyEmailErr = "Comapny has to signup with its own domain based email"
                        return responseHelper.requestfailure(res, companyEmailErr)
                    }
                    
                }
                let exists = await userHelper.isUserEmailExists(userData.email);
                _.extend(userData, {
                    _id: mongoose.Types.ObjectId().toString()
                });
                let password = userData.password;
                if (!password) {
                    return responseHelper.requestfailure(res, 'Please provide password to signup');
                }
                new_user = true;
                userData = _.omit(userData, ['password']);

                let randomize = require('randomatic');
                userData.verification_code = randomize('0', 4, {});
                userData.approved = "approved"
                let newUser = new User(userData);
                await newUser.save();
                newUser.setPassword(password);
                await newUser.save();

                if (userData.role != "subscriber") {
                    res.mailer.send('emails/verification-code.html', {
                        verification_code: userData.verification_code,
                        title: project.title,
                        to: userData.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                        subject: 'Verification Code', // REQUIRED.
                    }, async (err) => {
                        if (err) {
                            return console.error("Email could not sent: ", err)
                        }
                    });

                    sendSMS(req.body)
                }
                
                userandtoken = await userHelper.updateUser(userData)

                
                if(userData.role === "individualtasker"){

                    let indTask = await individualTaskerHelper.createIndividualTasker(userData)
                    
                    userData.user = userandtoken.user._doc._id
                    userData.individualTasker = indTask._id

                    let newtsker = await taskerHelper.createTasker(userData)
                    userandtoken.taskerid = newtsker._id

                } else if(userData.role === "companytasker"){
                    let tskCompan = await taskerCompapnyHelper.createTaskerCompany(userData)
                    userData.user = userandtoken.user._doc._id
                    userData.taskerCompany = tskCompan._id

                    newtsker = await taskerHelper.createTasker(userData)
                    userandtoken.taskerid = newtsker._id
                }
            }
        }

        var message = 'Successfully Signed Up User';
        var responseData = userandtoken.user._doc;
        responseData.new_user = new_user;

        if(userData.role === "individualtasker" || userData.role === "companytasker"){
            responseData.taskerid = userandtoken.taskerid 
        }

        responseHelper.success(res, responseData, message, userandtoken.token);
    }
    catch (err) {
        console.log(err);
        responseHelper.requestfailure(res, err);
    }

}

var checkEmailAddressString = async (userData) => {
    console.log("checkEmailAddressString called")
    try {
        
        if (userData.email) {
            let matched = userData.email.match(/[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/)
            //console.log(matched)
            if(matched === null) {
                return "valid"
            } else if(matched['index'] === 0){
                return "invalid"
            } 

            
        } else {
            return "invalid"
        }
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
} //

function sendSMS(userData) {
    console.log('sendSMS Called')
    //var userData = req.body
    if (userData.phoneNumber) {
        client
            .verify
            .services(process.env.SERVICE_ID)
            .verifications
            .create({
                to: `+${userData.phoneNumber}`,
                channel: userData.channel === 'call' ? 'call' : 'sms'
            })
            .then(data => {
                //console.log('sms sent')
                //console.log(data)
                /* res.status(200).send({
                    message: "Verification is sent!!",
                    phonenumber: userData.phonenumber,
                    data
                }) */
                //console.log("succuess")
                //console.log(data)

                return {
                    message: "Verification is sent!!",
                    phoneNumber: userData.phoneNumber,
                    data
                }
            })
            .catch(error => {
                console.log('failure')
                console.log(error)
            })
    } else {
        /* res.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: userData.phonenumber,
            data
        }) */
        console.log("error")
        return {
            message: "Wrong phone number :(",
            phoneNumber: userData.phoneNumber,
            data
        }
    }
} //end sendSMS

var verifyPhoneNumber = async (req, res) => {
    try {
        let userData = req.body
        if (userData.phoneNumber && (userData.code).length === 6) {
            client
                .verify
                .services(process.env.SERVICE_ID)
                .verificationChecks
                .create({
                    to: `+${userData.phoneNumber}`,
                    code: userData.code
                })
                .then(data => {
                    if (data.status === "approved") {

                        var message = "User is Verified!!";
                        responseHelper.success(res, data, message)
                    }
                })
        } else {
            /* res.status(400).send({
                message: "Wrong phone number or code :(",
                phonenumber: userData.phonenumber,
                data
            }) */

            var err = {
                message: "Wrong phone number or code :(",
                phoneNumber: userData.phoneNumber,
                data
            }

            responseHelper.requestfailure(res, err)
        }
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
} //end function

var signin = async (req, res) => {
    console.log("signin is called");
    try {
        var userData = req.body;

        if (userData._id) {
            let exists = await userHelper.isUserIdExists(userData._id);
            if (exists) {
                userandtoken = await userHelper.updateUser(userData)
            } else {
                let err = "User doesn't exists";
                responseHelper.requestfailure(res, err)
            }
        } else {
            userData.email = userData.email.toLowerCase();
            let exists = await userHelper.isUserEmailExists(userData.email);

            if (exists) {

                if (exists.role == "subscriber") {
                    let err = "User not allowed to signin";
                    return responseHelper.requestfailure(res, err);
                }
               /*  if (!exists.is_verified) {
                    return responseHelper.requestfailure(res, 'Please verify your email address')
                }

                if (exists.approved !== "approved") {
                    return responseHelper.requestfailure(res, 'Your account is not approved')
                }

                if (!exists.active) {
                    return responseHelper.requestfailure(res, 'Your account is not approved/active')
                }

                if (!userData.password) {
                    return responseHelper.requestfailure(res, 'Please provide password to signin');
                } */
                new_user = false;
                if (exists.validPassword(userData.password)) {
                    _.extend(userData, {
                        _id: exists._id
                    });
                    userandtoken = await userHelper.updateUser(userData)
                } else {
                    let err = "Invalid Password";
                    return responseHelper.requestfailure(res, err);
                }
            } else {
                let err = "Email doesn't exists";
                return responseHelper.requestfailure(res, err);
            }
        }
        var message = 'Successfully Singed In';
        var responseData = _.omit(userandtoken.user._doc, ['password']) //userandtoken.user._doc;
        responseData.new_user = new_user;
        return responseHelper.success(res, responseData, message, userandtoken.token);
    }
    catch (err) {
        console.log(err);
        responseHelper.requestfailure(res, err);
    }

};

var jobapplicantsignup = async (req, res) => {
    console.log('jobapplicantsignup called')

    var cvfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "cvfile") {
                cb(null, './public/uploads/applicantcvs')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "cvfile") {
                cvfile = Date.now() + '-' + file.originalname;
                cb(null, cvfile)
            }
        }
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 35
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);
            console.log("ext " + ext)
            if (ext !== '.pdf') {

                errorMessage = "Only PDF Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'cvfile',
                maxCount: 1
            }
        ]
    );

    function checkFileType(file, cb) {
        console.log('checkFileType called')
        console.log(file.fieldname)
        console.log(file.mimetype)
        if (file.fieldname === "cvfile") {
            if (
                file.mimetype === 'application/pdf'
            ) { // check file type to be pdf
                console.log('true')
                cb(null, true);
            } else {
                console.log('false')
                cb(null, false); // else fails
            }
        }
    } //end check file function

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "cvfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                var message = "Only 1 cv can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "cvfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 35MB";

                isErr = true

            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }

        if (isErr) {

            responseHelper.requestfailure(res, errorMessage)
        } else {
            userData = JSON.parse(req.body.request);


            userData.cvFile = '/uploads/applicantcvs/' + cvfile;

            try {
                //save user data in db
                console.log('try block in  multer')
                console.log(userData)

                userData.email = userData.email.toLowerCase();
                let exists = await userHelper.isUserEmailExists(userData.email);
                if (exists) {
                    try {
                        fs.unlinkSync('./public/uploads/applicantcvs/' + cvfile);
                    } catch (err) {
                        responseHelper.requestfailure(res, err);

                    }
                    let err = "Email already exists";
                    return responseHelper.requestfailure(res, err);

                } else {

                    _.extend(userData, {
                        _id: mongoose.Types.ObjectId().toString()
                    });
                    let password = userData.password;
                    if (!password) {
                        return responseHelper.requestfailure(res, 'Please provide password to signup');
                    }
                    new_user = true;
                    userData = _.omit(userData, ['password']);

                    let randomize = require('randomatic');
                    userData.verification_code = randomize('0', 4, {});

                    userData.approved = "approved"
                    userData.active = false
                    let newUser = new User(userData);
                    await newUser.save();
                    newUser.setPassword(password);
                    await newUser.save();

                    /* if (userData.role == "jobapplicant") {
                        let applyjobdata = {
                            jobid: userData.jobid,
                            userid: newUser._id
                        }


                        await JobHelper.addApplicant(applyjobdata)
                    }
 */
                    res.mailer.send('emails/verification-code.html', {
                        verification_code: userData.verification_code,
                        title: project.title,
                        to: userData.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                        subject: 'Verification Code', // REQUIRED.
                    }, async (err) => {
                        if (err) {
                            return console.error("Email could not sent: ", err)
                        }
                    });

                    sendSMS(userData)



                    userandtoken = await userHelper.updateUser(userData)
                }
                var message = 'Successfully Signed Up User';
                var responseData = userandtoken.user._doc;
                responseData.new_user = new_user;
                responseHelper.success(res, responseData, message, userandtoken.token)
            } catch (err) {

                try {
                    fs.unlinkSync('./public/uploads/applicantcvs/' + cvfile);
                } catch (err) {
                    responseHelper.requestfailure(res, err);

                }

                logger.error(err);
                if (err.code == 11000) {
                    responseHelper.requestfailure(res, "Duplicate User not allowed");
                } else {
                    responseHelper.requestfailure(res, err);
                }
            }
        }



    })
} //end function

var updateuser = async (req, res) => {
    console.log("request received for update User");

    try {
        var userData = req.body;

        var result = await userHelper.updateuser(userData)

        var message = "User Updated successfully";
        return responseHelper.success(res, result, message);
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }



}; //end 

var approveDisapproveUser = async (req, res) => {
    console.log("request received for approveDisapproveUser User");

    try {
        var userData = req.body;

        var result = await userHelper.approveDisapproveUser(userData)

        var message = "User Updated successfully";
        return responseHelper.success(res, result, message);
    } catch (err) {

        responseHelper.requestfailure(res, err);
    }

}; //end 

var activeUser = async (req, res) => {
    console.log("request received for activeUser ");

    try {
        var userData = req.body;
        var result = await userHelper.activeUser(userData)
        var message = "User Updated successfully";
        return responseHelper.success(res, result, message);
    } catch (err) {
        responseHelper.requestfailure(res, err);
    }



}; //end 

var updateprofile = async (req, res) => {
    console.log("updateprofile is called");
    try {
        var userData = req.body;
        updatedUser = await userHelper.updateprofile(userData, req.token_decoded)
        var message = 'Successfully Updated Profile';
        var responseData = updatedUser.user._doc;
        responseHelper.success(res, responseData, message);
    }
    catch (err) {
        console.log(err);
        responseHelper.requestfailure(res, err);
    }

};

var updatefeetocharge = async (req, res) => {
    console.log("updatefeetocharge is called");

    try {
        var body = req.body;

        role = req.token_decoded.r;
        if (role == "_a") {
            updatedUser = await User.update({}, { '$set': { 'feeToCharge': body.feetocharge } }, { multi: true })
            var message = 'Successfully Updated fee';
            var responseData = updatedUser;
            responseHelper.success(res, responseData, message);
        } else {
            var error = "Only admin can unblock a user";
            responseHelper.requestfailure(res, error);
        }

    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }

};

var paymentnotification = async (req, res) => {
    console.log("paymentnotification called");
    //this function is not used as paypall itself is sending renewal notification.

    console.log(req.token_decoded.a)
    responseHelper.success(res, req.token_decoded.a, "message");
    /* try {
         
         let adminid = req.token_decoded.d
         
         
         const subs = await Subscription.find();

         subs.map(async (sub) => {

             try {
                 var currentTime = moment();
                 var renewaltime = moment(sub.nextRenewal);
                 var durationleft = renewaltime.diff(currentTime, 'h');
                 
                 if(durationleft >= 1 && durationleft < 25){
                     
                     let user = await User.findById(sub.user);   
                     let fullname = user.full_name;
                     let feetocharge = user.feeToCharge;
                     
                     var notemsg = fullname+" , your subscription is pending @"+feetocharge+"$.";
             
                     const notf = await notificationCtrl.sendNotification("Subscription fee notice", notemsg, adminid, sub.user, "Subscription fee notice", {})
                 }
             }catch (err) {
         
                 responseHelper.requestfailure(res, err);
             }

             

         })


     message = "All subscriptions"
 
     
         
         responseHelper.success(res, subs, message);
     } catch (err) {
         
         responseHelper.requestfailure(res, err);
     }*/
};

var updateprofilepic = async (req, res) => {
    console.log("updateprofilepic is called");

    //const picname = req.token_decoded.p;

    let userdata = await userHelper.findauser(req.token_decoded.d);


    const picname = userdata.profile_picture_url;

    //if old pic exists delete it firstly
    if (picname !== undefined && picname !== '' && picname !== '/uploads/dp/default.png') {
        const imgpath = './public/' + picname;
        try {
            fs.unlinkSync(imgpath);
        } catch (err) {
            console.log('Error Deleting old, probably already removed');
            // return responseHelper.requestfailure(res, err);
        }
    }
    var imgnamenew;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/dp')
        },
        filename: function (req, file, cb) {
            imgnamenew = Date.now() + '-' + file.originalname;
            //cb(null, Date.now() + '-' +file.originalname )
            cb(null, imgnamenew)
        }
    });

    var upload = multer({ storage: storage }).single('file');

    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {

            return res.status(500).json(err)
        } else if (err) {

            return res.status(500).json(err)
        }

        var user = { profile_picture_url: '/uploads/dp/' + imgnamenew };

        try {

            updatedUser = await userHelper.updateprofile(user, req.token_decoded);
            var message = 'Successfully Changed Profile Pic';
            var responseData = updatedUser.user._doc;
            responseHelper.success(res, responseData, message);
        }
        catch (err) {

            responseHelper.requestfailure(res, err);
        }

    }) //end upload function

};


var reportUser = async (req, res) => {
    console.log("reportUser is called");
    try {
        var body = req.body;
        usertoken = req.token_decoded;
        await userHelper.reportUser(usertoken.d, body.user_id, body.reason)
        await userHelper.blockOrUnlblockUser(usertoken.d, body.user_id, "me", "block")
        await userHelper.blockOrUnlblockUser(body.user_id, usertoken.d, "other", "block")
        var message = "Successfully reported";
        return responseHelper.success(res, {}, message);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var blockUser = async (req, res) => {
    console.log("blockUser is called");
    try {
        var body = req.body;
        usertoken = req.token_decoded;
        await userHelper.blockOrUnlblockUser(usertoken.d, body.user_id, "me", "block")
        await userHelper.blockOrUnlblockUser(body.user_id, usertoken.d, "other", "block")
        var message = "Successfully blocked";
        return responseHelper.success(res, {}, message);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var unblockUser = async (req, res) => {
    console.log("unblockUser is called");
    try {
        var body = req.body;
        usertoken = req.token_decoded;
        await userHelper.blockOrUnlblockUser(usertoken.d, body.user_id, "me", "unblock")
        await userHelper.blockOrUnlblockUser(body.user_id, usertoken.d, "other", "unblock")
        var message = "Successfully unblocked";
        responseHelper.success(res, {}, message);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var listBlockedUsers = async (req, res) => {
    console.log("listBlockedUsers is called");
    try {
        usertoken = req.token_decoded;
        let blockedusers = await userHelper.listBlockedUsers(usertoken.d)
        var message = "Successfully unblocked";
        responseHelper.success(res, blockedusers, message);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var forgotPassword = async (req, res) => {
    console.log("forgotPassword is called");
    var userData = req.body;
    userData.email = userData.email.toLowerCase();
    try {
        //let devicetype = req.device.type.toUpperCase()

        let exists = await userHelper.isUserEmailExists(userData.email);

        if (!exists) {
            let err = "Email doesn't exists";
            return responseHelper.requestfailure(res, err);
        }

        /* if(exists && exists.role != "admin" && devicetype == "DESKTOP"){
            let err = "Only Admin can change password";
            return responseHelper.requestfailure(res, err);
        } */
        let randomize = require('randomatic');
        exists.verification_code = randomize('0', 4, {});
        await exists.save();
        res.mailer.send('emails/verification-code.html', {
            verification_code: exists.verification_code,
            title: project.title,
            to: exists.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Verification Code', // REQUIRED.
        }, function (err) {
            if (err) {
                return console.error("Email could not sent: ", err)
            }
            var message = "Verification code sent to your email successfully";
            return responseHelper.success(res, {}, message);
        });
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var verifyCode = async (req, res) => {
    console.log("verifyCode is called");
    var userData = req.body;
    userData.verification_code = typeof userData.verification_code === 'string' ? userData.verification_code : userData.verification_code.toString();
    try {
        let exists = await userHelper.verifyCode(userData.email, userData.verification_code);
        if (!exists) {
            let err = "Invalid Code";
            return responseHelper.requestfailure(res, err);
        }
        userandtoken = await userHelper.updateUser({ _id: exists._id, is_verified: true });
        var message = "Code verified successfully";
        var responseData = _.omit(userandtoken.user._doc, ['password']);
        responseData.new_user = false;
        return responseHelper.success(res, responseData, message, userandtoken.token);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var changePasswordAfterVerifyingCode = async (req, res) => {
    console.log("changePasswordAfterVerifyingCode is called");
    var userData = req.body;
    try {

        if (!userData.password) {
            let err = "Please provide password";
            return responseHelper.requestfailure(res, err);
        }

        let user = await User.findById(req.token_decoded.d);
        if (!user) {
            let err = "Something wrong or User deleted";
            return responseHelper.requestfailure(res, err);
        }

        user.setPassword(userData.password);

        await user.save();

        var message = "Password updated successfully";
        return responseHelper.success(res, {}, message);
    }
    catch (err) {
        logger.error(err);
        responseHelper.requestfailure(res, err);
    }
};

var logout = async (req, res) => {
    console.log("logout is called");
    try {
        var myId = req.token_decoded.d;
        await User.findByIdAndUpdate(myId, { $set: { fcm_tokens: {} } });
        return responseHelper.success(res, {}, `Logout successfully`);
    } catch (error) {
        responseHelper.systemfailure(res, error);
    }
};

var connected_users_preferences = [];

var testSocket = async (req, res) => {
    var Conversation = mongoose.model('conversations');
    var Message = mongoose.model('messages');
    var ReportMessage = mongoose.model('reportmessages');
    console.log("testSocket is called");
    try {
        console.log(req.token_decoded);
        var data = req.body;
        for (let u in connected_users_preferences) {
            console.log(u);
            if (connected_users_preferences[u].indexOf(req.token_decoded.d) > -1) {
                console.log("found");
            }
        }
        switch (data.event) {
            //Send Message Event
            case 'SendMessage': {
                console.log('Socket chat event SendMessage called...');
                var chatId = data.chatId;
                var content = data.content;
                var type = data.type;
                var userId = req.token_decoded.d;
                let conversation = await Conversation.findById(chatId)
                if (conversation.chat_ended === true) {
                    console.log("Can't send message to the chat_ended chat: " + conversation._id)
                    break;
                }
                let messageData = {
                    sender: userId,
                    receiver: conversation.user === userId ? conversation.target : conversation.user,
                    conversation: conversation._id,
                    content: content,
                    type: type ? type : "text",
                    date: new Date()
                }
                let message = await new Message(messageData);
                await message.save()

                conversation.lastmessage = message._id;
                await conversation.save()

                console.log(message);
                console.log(conversation);
                // let receiver_socket = await redisClient.hgetAsync('customers', message.receiver)
                // var toSend = {
                //     type: "NewMessageReceived",
                //     data: { message }
                // }
                // io.sockets.in(receiver_socket).emit('Chat', JSON.stringify(toSend));
            }
                break;

            //Delete Message Event
            case 'DeleteMessage': {
                console.log('Socket chat event DeleteMessage called...');
                var messageId = data.messageId;
                var deleteForEveryone = data.deleteForEveryone;
                var userId = req.token_decoded.d;
                if (deleteForEveryone) {
                    let message = await Message.findById(messageId)
                    message = await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedBy: { $each: [message.sender, message.receiver] } }, deletedForEveryone: true }, { new: true })
                    console.log(message);
                    // let receiver_socket = await redisClient.hgetAsync('customers', message.receiver)
                    // var toSend = {
                    //     type: "MessageDeleted",
                    //     data: { message }
                    // }
                    // io.sockets.in(receiver_socket).emit('Chat', JSON.stringify(toSend));
                } else {
                    let message = await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedBy: userId } }, { new: true })
                    console.log(message);
                }
            }
                break;

            //Report Message Event
            case 'ReportMessage': {
                console.log('Socket chat event ReportMessage called...');
                var messageId = data.messageId;
                var reason = data.reason;
                var userId = req.token_decoded.d;

                let reportData = {
                    reportedBy: userId,
                    message: messageId,
                    reason: reason
                }

                let report = new ReportMessage(reportData);
                await report.save()

                let message = await Message.findByIdAndUpdate(messageId, { $addToSet: { reportedBy: userId } }, { new: true })
                // let receiver_socket = await redisClient.hgetAsync('customers', message.receiver)
                // var toSend = {
                //     type: "MessageReported",
                //     data: { message }
                // }
                // io.sockets.in(receiver_socket).emit('Chat', JSON.stringify(toSend));
            }
                break;


            //Location Update Event
            case 'LocationUpdate': {
                console.log('Socket event LocationUpdate called...');
                let location = {
                    location: {
                        type: 'Point',
                        coordinates: [data.location.longitude, data.location.latitude]
                    },
                    altitude: data.altitude
                }
                let user = await User.findOneAndUpdate({ _id: data._id }, location, { new: true });
            }
                break;

            //Get Homepage Event
            case 'GetHomePage': {
                console.log('Socket event GetHomePage called...');
                let user = await User.findById(req.token_decoded.d);
                // let nearbyusers = await User.find({
                // gender: { $in : user.userPreference.interestedIn },
                // dob: { $gt : new Date(user.dob).setFullYear(new Date(user.dob).getFullYear() + user.userPreference.minAge), $lt : new Date(user.dob).setFullYear(new Date(user.dob).getFullYear() + user.userPreference.maxAge) },
                // location: {
                //     $near: [74.2790679541177, 31.4772452786859],
                //     $maxDistance: 1000
                // }
                // })
                // console.log(user);
                let blocked = user.blocked ? user.blocked : [];
                blocked = blocked.map(b => b.user)
                blocked.push(user._id);
                console.log(blocked);
                // let blocked = [user._id];
                let matchedUsers = await User.aggregate([
                    {
                        $project: {
                            document: '$$ROOT',
                            'age': {
                                $divide: [
                                    {
                                        $subtract: [
                                            new Date(),
                                            { $ifNull: ['$dob', new Date()] }
                                        ]
                                    },
                                    1000 * 86400 * 365
                                ]
                            }
                        }
                    },
                    {
                        $match: {
                            '_id': {
                                $nin: blocked
                            },
                            'document.gender': {
                                $in: user.userPreference.interestedIn
                            },
                            'age': {
                                $gt: user.userPreference.minAge,
                                $lt: user.userPreference.maxAge
                            }
                        }
                    },
                    { $project: { _id: 1 } },
                    {
                        $group: {
                            _id: null,
                            matched_users_ids: {
                                $push: "$_id"
                            }
                        }
                    },
                    {
                        $project: {
                            matched_users_ids: true,
                            _id: false
                        }
                    }
                ])
                connected_users_preferences[user._id] = matchedUsers[0].matched_users_ids;
                // console.log(connected_users_preferences);
                // let nearbyusers = await User.aggregate([{
                //     $geoNear: {
                //         spherical: true,
                //             near: { type: 'Point', coordinates: [ user.location.coordinates[0], user.location.coordinates[1] ] },
                //             maxDistance: constants.normal_distance_range_in_meters,
                //             distanceField: 'dist.calculated'
                //         }
                //     },
                //     { 
                //     $project: {
                //         document: '$$ROOT',
                //         'age': {
                //           $divide: [ 
                //             { 
                //               $subtract: [ 
                //                 new Date(), 
                //                 { $ifNull: ['$dob', new Date() ]}
                //               ]
                //             },
                //             1000 * 86400 * 365 
                //           ]
                //         }
                //     }
                // },
                // { 
                //     $match: { 
                //         '_id': { 
                //             $nin : blocked
                //         },
                //         'document.gender': { 
                //             $in : user.userPreference.interestedIn 
                //         }, 
                //         'age':  { 
                //             $gt : user.userPreference.minAge, 
                //             $lt : user.userPreference.maxAge 
                //         }
                //     }
                // }
                // ])
                // console.log(nearbyusers);
            }
                break;
            default:
                console.log("No Event Provided...");
        }
    } catch (error) {
        responseHelper.systemfailure(res, error);
    }
};

var listAllUsers = async (req, res) => {
    console.log("listAllUsers called");

    var userData = req.body;
    var token = req.token_decoded;
    //console.log(token.r)
    try {

        var users = await userHelper.listAllUsers(userData.sortproperty, userData.sortorder, userData.offset, userData.limit, userData.query);

        var message = 'Successfully got all users';

        responseHelper.success(res, users, message);

    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
}

var activeUser = async (req, res) => {
    console.log("request received for activeUser");

    try {
        var userData = req.body;
        var result = await userHelper.activeUser(userData)
        var message = "User Updated successfully";
        return responseHelper.success(res, result, message);
    } catch (err) {
        responseHelper.requestfailure(res, err);
    }



}; //end 

var passwordLessLogin = async (req, res) => {
    console.log("request received for activeUser");

    try {
        let userData = req.body

        userData.email = userData.email.toLowerCase();
        let exists = await userHelper.isUserEmailExists(userData.email);
        let token
        let user
        if (exists) {

            if (exists.role == "subscriber") {
                let err = "User not allowed to signin";
                return responseHelper.requestfailure(res, err);
            }
            if (!exists.is_verified) {
                return responseHelper.requestfailure(res, 'Please verify your email address')
            }
            if (exists.approved !== "approved") {
                return responseHelper.requestfailure(res, 'Your account is not approved')
            }

            if (!exists.active) {
                return responseHelper.requestfailure(res, 'Your account is not approved/active')
            }

            const makeToken = (email) => {
                /* const expirationDate = new Date()
                
                expirationDate.setMinutes(new Date().getMinutes() + parseInt(userData.expiryTime))
*/
                let userrole = '_a'
                switch (exists.role) {
                    case 'subscriber':
                        userrole = '_ss'
                        break
                    case 'jobapplicant':
                        userrole = '_ja'
                        break
                    case 'hr':
                        userrole = '_hr'
                        break
                    case 'interviewer':
                        userrole = '_intrvr'
                        break
                    case 'itsales':
                        userrole = 'itsl'
                        break
                    case 'botonist':
                        userrole = '_btnst'
                        break
                    case 'marketing':
                        userrole = '_mrkt'
                        break
                    case 'businessdevelopment':
                        userrole = '_bsndev'
                        break
                    case 'businessdevelopment':
                        userrole = '_bsndev'
                        break
                    case 'doctor':
                        userrole = '_doc'
                        break
                    case 'lawyer':
                        userrole = '_lwr'
                        break
                    case 'chemist':
                        userrole = '_chmst'
                        break
                    case 'chemist':
                        userrole = '_chmst'
                        break
                    case 'pharmacist':
                        userrole = '_phrmst'
                        break
                    case 'vendor':
                        userrole = '_vndr'
                        break
                    case 'agriculturescientist':
                        userrole = '_agr'
                        break
                    case 'customersupport':
                        userrole = '_cstsprt'
                        break
                    case 'customer':
                        userrole = '_cst'
                        break
                    case 'individualtasker':
                        userrole = '_indvtskr'
                        break
                    case 'companytasker':
                        userrole = '_cmpntskr'
                        break
                    default:
                        userrole = '_a'
                }
                let jwt = require('jsonwebtoken')
                let token = jwt.sign({
                    a: exists.active,
                    n: exists.first_name,
                    e: exists.email,
                    d: exists._id,
                    p: exists.profile_picture_url,
                    r: userrole,

                }, process.env.JWT_SECRETE, { expiresIn: userData.expiryTime });
                return token
            }

            token = makeToken(userData.email)



            let link = `https://recruit-page-five.vercel.app/passwordLessLogin/?token=${token}&expiryTime=${userData.expiryTime}`

            res.mailer.send('emails/passwordLessLogin.html', {
                username: exists.first_name,
                link: link,
                expires: userData.expiryTime,
                to: userData.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Temporary Login', // REQUIRED.
            }, async (err) => {
                if (err) {
                    return console.error("Email could not sent: ", err)
                }
            })


        } else {
            let err = "Email doesn't exists";
            return responseHelper.requestfailure(res, err);
        }
        let message = "Login Link sent successfully";
        return responseHelper.success(res, user, message);
    } catch (err) {
        responseHelper.requestfailure(res, err);
    }



}; //end 

var verifyToken = async (req, res) => {
    console.log("verifyToken called")

    try {
        var token = req.token_decoded

        let user = await User.findById(token.d)
            .populate({
                path: 'rolePrivileges',
                model: 'roles',
                populate: {
                    path: 'permissions',
                    model: 'permissions'
                }
            })
        var responseData = _.omit(user._doc, ['password'])

        let message = "Login successfull"

        return responseHelper.success(res, responseData, message, req.originalToken)



    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var sendVerificationEmail = async (req, res) => {
    console.log("request received for verification email");

    try {
        let userData = req.body

        userData.email = userData.email.toLowerCase();
        let exists = await userHelper.isUserEmailExists(userData.email);
        let token
        let user
        if (exists) {
            if (exists.role == "subscriber") {
                let err = "User not allowed to signin";
                return responseHelper.requestfailure(res, err);
            }
            if (!exists.is_verified) {
                return responseHelper.requestfailure(res, 'Please verify your email address')
            }
            if (exists.approved !== "approved") {
                return responseHelper.requestfailure(res, 'Your account is not approved')
            }

            if (!exists.active) {
                return responseHelper.requestfailure(res, 'Your account is not approved/active')
            }

            const makeToken = (email) => {
                /* const expirationDate = new Date()
                
                expirationDate.setMinutes(new Date().getMinutes() + parseInt(userData.expiryTime))
*/
                let userrole = '_a'
                switch (exists.role) {
                    case 'subscriber':
                        userrole = '_ss'
                        break
                    case 'jobapplicant':
                        userrole = '_ja'
                        break
                    case 'customer':
                        userrole = '_cst'
                        break
                    case 'doctor':
                        userrole = '_doc'
                        break
                    default:
                        userrole = '_a'
                }
                let jwt = require('jsonwebtoken')
                let token = jwt.sign({
                    a: exists.active,
                    n: exists.first_name,
                    e: exists.email,
                    d: exists._id,
                    p: exists.profile_picture_url,
                    r: userrole,


                }, process.env.JWT_SECRETE, { expiresIn: userData.expiryTime });
                return token
            }

            token = makeToken(userData.email)



            let link = `https://recruit-page-five.vercel.app/passwordLessLogin/?token=${token}&expiryTime=${userData.expiryTime}`

            res.mailer.send('emails/passwordLessLogin.html', {
                username: exists.first_name,
                link: link,
                expires: userData.expiryTime,
                to: userData.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Temporary Login', // REQUIRED.
            }, async (err) => {
                if (err) {
                    return console.error("Email could not sent: ", err)
                }
            })


        } else {
            let err = "Email doesn't exists";
            return responseHelper.requestfailure(res, err);
        }
        let message = "Login Link sent successfully";
        return responseHelper.success(res, user, message);
    } catch (err) {
        responseHelper.requestfailure(res, err);
    }



}; //end

var ageVerificationEmail = async (req, res) => {
    console.log("request received for ageVerificationEmail");

    try {
        let userData = req.body
        var userId = req.token_decoded.d


        var birthday = userData.dateOfBirth//'1994-01-01';
        var dateObj = new Date(birthday);
        var diffTime = Date.now() - dateObj.getTime();
        var diffAge = new Date(diffTime);
        var age = diffAge.getFullYear() - 1970;
        if (age < 21) {
            
            responseHelper.requestfailure(res, "Age is below 21 years!")
        } else {

            
        let user = await User.findById(userId)
        user.ageGateVerified = true
        await user.save()



            let randomize = require('randomatic');
            let verification_code = randomize('0', 4, {});


            res.mailer.send('emails/verification-code.html', {
                verification_code: verification_code,
                title: userData.name,
                to: userData.email,
                subject: 'Verification Code',
            }, async (err) => {
                if (err) {
                    return console.error("Email could not sent: ", err)
                    }
            });

            let message = "Verification OTP is sent to your email address";
            return responseHelper.success(res, { verification_code }, message);
        }

    } catch (err) {
        responseHelper.requestfailure(res, err);
    }



}; //end







module.exports = {
    AS,
    logout,
    signup,
    jobapplicantsignup,
    signin,
    verifyPhoneNumber,
    updateprofile,
    getprofilefromid,
    reportUser,
    blockUser,
    unblockUser,
    listBlockedUsers,
    testSocket,
    forgotPassword,
    verifyCode,
    changePasswordAfterVerifyingCode,
    updateprofilepic,
    updatefeetocharge,
    paymentnotification,
    listAllUsers,
    updateuser,
    approveDisapproveUser,
    activeUser,
    passwordLessLogin,
    verifyToken,
    sendVerificationEmail,
    ageVerificationEmail
        

};



