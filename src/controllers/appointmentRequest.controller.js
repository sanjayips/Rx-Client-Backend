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
//const googlekey = require('../config/hporx-google-cloud-key.json')

const processFile = require('../middlewares/upload')
const processMultipleFiles = require('../middlewares/uploadmultiple')
const {format} = require('util')
const  {Storage}  = require('@google-cloud/storage')
const storage = new Storage({keyFilename: 'hporx-google-cloud-key.json'})
const bucket = storage.bucket("hporxuploads")

//var multer = require('multer');
const fs = require('fs');


const appointmentRequestHelper = require('../helpers/appointmentRequests.helper')
const customerHelper = require('../helpers/customers.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createPublicAppointmentRequest = async (req, res) => {
    console.log('createAppointmentRequest called')
    var medicalfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 2
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
                name: 'medicalfile',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "medicalfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "medicalfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            
            if(errorMessage == "File Limit is 2 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


       //userData.imageUrl = '/uploads/medicalfiles/' + medicalfile

        try {
            if(medicalfile !== undefined){
                userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
            }
            var result = await appointmentRequestHelper.createAppointmentRequest(userData)

            res.mailer.send('emails/feedback.html', {
                user: userData.userName,
                feedback: userData.feedbackDescription,
                customeremail: userData.userEmail,
                title: 'Feedback',   //project.title
                to: process.env.FEEDBACK_EMAIL, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Feedback', // REQUIRED.
            }, function (err) {
                if (err) {
                    return console.error("Email could not sent: ", err)
                }
                /* var message = "Client's Feedback successfully sent to Admin";
                return responseHelper.success(res, {}, message); */
            })



                var message = "AppointmentRequest created successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
                return  responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            return responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function

var createAppointmentRequestOld = async (req, res) => {
    console.log('createAppointmentRequest called')
    var medicalfile
    var picturefiles = []
    var videofiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log("storage called")
            cb(null, './public/uploads/medicalfiles')
            /* if (file.fieldname === "medicalfile") {
                cb(null, './public/uploads/medicalfiles')
            } else if (file.fieldname === "vidoes") {
                cb(null, './public/uploads/medicalfiles')
            }else if (file.fieldname === "prescription") {
                cb(null, './public/uploads/medicalfiles')
            } */

        },
        filename: (req, file, cb) => {
           /*  if (file.fieldname === "medicalfile") {
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
            } else if(file.fieldname === "videos") {
                console.log("videos")
                console.log(file.originalname)
                let vidfile = Date.now() + '-' + file.originalname
                console.log(vidfile)
                videofiles.push(vidfile )
                cb(null, vidfile)
            }else if(file.fieldname === "pictures") {
                console.log("pictures")
                console.log(file.originalname)
                let picfile = Date.now() + '-' + file.originalname
                console.log(picfile)
                picturefiles.push(picfile )
                cb(null, picfile)
            } */
            console.log('files')
            
            let extentions = ['.png', '.jpg', '.jpeg', '.gif']
            let ext = path.extname(file.originalname)
            console.log(ext)
            if (extentions.includes(ext)){
                console.log("inside pictures")
                let picfile = Date.now() + '-' + file.originalname
                picturefiles.push(picfile )
                cb(null, picfile)
            } else if(ext == ".mp4"){
                console.log("inside vdieos")
                let vidfile = Date.now() + '-' + file.originalname
                console.log(vidfile)
                videofiles.push(vidfile )
                cb(null, vidfile)
            }
            else if(ext == ".pdf"){
                console.log("inside pdfs")
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 50
        },
        fileFilter: (req, file, cb) => {
            
            let ext = path.extname(file.originalname);
            
          let extentions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.mp4']
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, JPG, JPEC, PDF and GIF or MP4 Files allowed"
               isErr = true
               
         }
         cb(null, true);
        }
    }).fields(
        [
            {
                name: 'medicalfile',
                maxCount: 7
            }/* ,
            {
                name: 'videos',
                maxCount: 3
            },
            {
                name: 'pictures',
                maxCount: 3
            } */
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        console.log(picturefiles)
        console.log(videofiles)

        if (err instanceof multer.MulterError) {
            console.log("err")
            console.log(err)

            if (err.field == "medicalfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "medicalfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            if(errorMessage == "File Limit is 50 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        //userData.imageUrl = '/uploads/medicalfiles/' + medicalfile

        try {
            if(medicalfile !== undefined){
                userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
            }

            

            if(picturefiles.length !== 0){
                
                picturefiles.map(pic => {
                    userData. pictures.push('/uploads/medicalfiles/' +pic)
                })
            }

            if(videofiles.length !== 0){
                
                videofiles.map(vid => {
                    userData. videos.push('/uploads/medicalfiles/' +vid)
                })
            }

            
            var adminid = req.token_decoded.d
            userData.addedby = adminid

            

            let {customerfields} = userData
            customerfields.customerid = userData.customer
            

            await customerHelper.updateCustomer(customerfields)

             result = await appointmentRequestHelper.createAppointmentRequest(userData)

            
                var message = "AppointmentRequest created successfully"
                return responseHelper.success(res, {}, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function

var createAppointmentRequest = async (req, res) => {
    console.log("createAppointmentRequest called")
    try {
        
        //console.log('userdata')
        var appointmentData = req.body
        console.log(req.token_decoded.r)
        var addedby = req.token_decoded.d
        appointmentData.addedby = addedby

        let {customerfields} = appointmentData
            customerfields.customerid = appointmentData.customer
            

            await customerHelper.updateCustomer(customerfields)
        var result = await appointmentRequestHelper.createAppointmentRequest(appointmentData)

        var message = 'Appointment Request Submitted Successfully'

        responseHelper.success(res, result, message)
    }catch (err) {

        responseHelper.requestfailure(res, err)
    }
} //end function


var getAppointmentRequestsWithFullDetails = async (req, res) => {
    console.log("getAppointmentRequestsWithFullDetails called")
    var appointmentData = req.body


    try {

        var result = await appointmentRequestHelper.getAppointmentRequestsWithFullDetails(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAppointmentRequestsList = async (req, res) => {
    console.log("getAppointmentRequestsList called")
    var appointmentData = req.body


    try {

        var result = await appointmentRequestHelper.getAppointmentRequestsList(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}


var updateAppointmentRequest = async (req, res) => {
    console.log("request received for updateAppointmentRequest")

    var appointmentData = req.body
   
    try {
        

        let {customerfields} = appointmentData
            customerfields.customerid = appointmentData.customer
            customerfields.lastModifiedBy = req.token_decoded.d
            appointmentData.lastModifiedBy = req.token_decoded.d

            await customerHelper.updateCustomer(customerfields)
       
            var result = await appointmentRequestHelper.updateAppointmentRequest(appointmentData)
            var message = 'AppointmentRequest Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAppointmentRequest = async (req, res) => {
    console.log("removeAppointmentRequest called")
    try {
        var role = req.token_decoded.r

        
            var appointmentData = req.body
            appointmentData.lastModifiedBy = req.token_decoded.d
            var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)

            var message = "AppointmentRequest removed successfully"

            if (result == "AppointmentRequest does not exists.") {
                message = "AppointmentRequest does not exists."
            }
            return responseHelper.success(res, result, message)
       
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAppointmentRequestById = async (req, res) => {
    console.log("findAppointmentRequestById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var appointmentData = req.body

            var result = await appointmentRequestHelper.findAppointmentRequestById(appointmentData)
            console.log(result)
            var message = "AppointmentRequest find successfully"
            if (result == null) {
                message = "AppointmentRequest does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a AppointmentRequest"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var uploadMedicalImages = async (req, res) => {
    console.log('uploadMedicalImages called')
    var picturefiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                cb(null, './public/uploads/medicalfiles')
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

            let extentions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf']
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
                maxCount: 3
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "pictures" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 3 images can be uploaded";
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
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 3 images can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            try {
                picturefiles.map(pic => {
                    fs.unlinkSync('./public/uploads/medicalfiles/' + pic)
                })

            } catch (err) {
                return responseHelper.requestfailure(res, err)
            }
            return responseHelper.requestfailure(res, errorMessage)
        } else {

            try {
                let picurls = []
                if (picturefiles.length !== 0) {

                    picturefiles.map(pic => {
                        picurls.push('/uploads/medicalfiles/' + pic)
                    })
                }
                var message = "Pictures Uploaded Successfully"
                return responseHelper.success(res, picurls, message)


            } catch (err) {

                try {
                    //fs.unlinkSync('./public/uploads/medicalfiles/' + pictures)
                    picturefiles.map(pic => {
                        fs.unlinkSync('./public/uploads/medicalfiles/' + pic)
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

var uploadMedicalVideos = async (req, res) => {
    console.log('uploadMedicalVideos called')
    var videofiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "videos") {
                cb(null, './public/uploads/medicalvideofiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "videos") {
                
                let vidfile = Date.now() + '-' + file.originalname
                
                videofiles.push(vidfile)
                cb(null, vidfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 50
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);

            let extentions = ['.mp4']
            if (!extentions.includes(ext)) {

                errorMessage = "Only MP4 Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'videos',
                maxCount: 2
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "videos" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 2 Videos can be uploaded";
                isErr = true
                
            } else if (err.field == "videos" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 50 MB";
                isErr = true

            }

        } else if (err) {
            
            return res.status(500).json(err)
        }

        if (isErr) {

            if (errorMessage == "File Limit is 50 MB") {
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 2 Videos can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            try {
                videofiles.map(vid => {
                    fs.unlinkSync('./public/uploads/medicalvideofiles/' + vid)
                })

            } catch (err) {
                return responseHelper.requestfailure(res, err)
            }
            return responseHelper.requestfailure(res, errorMessage)
        } else {

            try {
                let vidurls = []
                if (videofiles.length !== 0) {

                    videofiles.map(vid => {
                        vidurls.push('/uploads/medicalvideofiles/' + vid)
                    })
                }
                var message = "videos Uploaded Successfully"
                return responseHelper.success(res, vidurls, message)


            } catch (err) {

                try {
                    
                    videofiles.map(vid => {
                        fs.unlinkSync('./public/uploads/medicalvideofiles/' + vid)
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

var uploadMedicinePrescription = async (req, res) => {
    console.log('uploadMedicalImages called')
    var prescfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "prescription") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "prescription") {
                
                let picfile = Date.now() + '-' + file.originalname
                
                prescfile = picfile
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

            let extentions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf']
            if (!extentions.includes(ext)) {

                errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'prescription',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "prescription" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 file can be uploaded";
                isErr = true
                
            } else if (err.field == "prescription" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5 MB";
                isErr = true

            }

        } else if (err) {
            
            return res.status(500).json(err)
        }

        if (isErr) {

            if (errorMessage == "File Limit is 5 MB") {
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 1 file can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + prescfile)

            } catch (err) {
                return responseHelper.requestfailure(res, err)
            }
            return responseHelper.requestfailure(res, errorMessage)
        } else {

            try {
                let prscurls 
                if (prescfile !== undefined) {
                    prscurls = '/uploads/medicalfiles/' + prescfile
                    var message = "Prescription Uploaded Successfully"
                return responseHelper.success(res, prscurls, message)
                    
                } else {
                    var message = "Prescription File Not Attached"
                return responseHelper.requestfailure(res, message)
                }
                


            } catch (err) {

                try {
                    fs.unlinkSync('./public/uploads/medicalfiles/' + prescfile)
                } catch (err) {
                    return responseHelper.requestfailure(res, err);

                }

                logger.error(err)
                return responseHelper.requestfailure(res, err)
            }



        }

    })

} //end function


var uploadFileToGoogleCloud = async (req, res) => {
    console.log("uploadFileToGoogleCloud called")
    try {
        var role = req.token_decoded.r

        
            var appointmentData = req.body
            appointmentData.lastModifiedBy = req.token_decoded.d
            //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)

            
    await processFile(req, res);
    console.log(req.files)

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
        console.log("blob stream err")
        console.log(err)
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        // Make the file public
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message:
            `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);

            //var message = "File uploaded to google could successfully"

        
            //return responseHelper.success(res, {}, message)
       
    } catch (err) {
        let message = ''
        if (err.code == "LIMIT_FILE_SIZE") {
            message = "File size cannot be larger than 2MB!"
          }
         message = `Could not upload the file: ${req.file.originalname}. ${err}`
        responseHelper.requestfailure(res, message, err)
    }


}

var uploadMultipleFilesToGoogleCloudOld = async (req, res) => {
    console.log("uploadFileToGoogleCloud called")
    try {
        var role = req.token_decoded.r


        var appointmentData = req.body
        appointmentData.lastModifiedBy = req.token_decoded.d
        //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


        await processMultipleFiles(req, res)


        //let {files} = req
        //console.log(files)

        if (!req.files) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        var counter = 0
        let uploadedFilesUrls = []
        req.files.forEach((file) => {
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(file.originalname)
            const blobStream = blob.createWriteStream({
                resumable: false,
            })

            blobStream.on("error", (err) => {

                res.status(500).send({ message: err.message })
            })

            blobStream.on("finish", async (data) => {
                counter += 1
                // Create URL for directly file access via HTTP.
                const publicUrl = format(
                    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                )

                try {
                    // Make the file public
                    await bucket.file(file.originalname).makePublic()
                } catch {
                    return res.status(500).send({
                        message:
                            `Uploaded the file successfully: ${file.originalname}, but public access is denied!`,
                        url: publicUrl,
                    })
                }
                uploadedFilesUrls.push(publicUrl)
                if (counter == 2) {
                    var message = "Files uploaded to google cloud successfully"
                    return responseHelper.success(res, uploadedFilesUrls, message)
                }

            })

            blobStream.end(file.buffer)



        })


    } catch (err) {
        
        let message = ''
        if (err.code == "LIMIT_FILE_SIZE") {
            message = "File size cannot be larger than 2MB!"
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            message = "Only 2 files can be uploaded"
        }

        responseHelper.requestfailure(res, message, err)
    }


}

var uploadMultipleFilesToGoogleCloud = async (req, res) => {
    console.log("uploadFileToGoogleCloud called")
    try {
        var role = req.token_decoded.r


        var appointmentData = req.body
        appointmentData.lastModifiedBy = req.token_decoded.d
        //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


        await processMultipleFiles(req, res)
        if (!req.files) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        let userData = JSON.parse(req.body.request)
        let promises = []

        req.files.forEach((file) => {
            let uploadedfile = Date.now() + '-' + file.originalname
            const blob = bucket.file(userData.folderName+'/' +uploadedfile)
            const newPromise =  new Promise((resolve, reject) => {
                blob.createWriteStream({
                    metadata: { contentType: file.mimetype }
                  }).on('finish', async response => {
                    const Url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                    await blob.makePublic()
                    //resolve(response)
                    resolve({ name: userData.folderName+'/' +uploadedfile, url: Url });
                  }).on('error', err => {
                    reject('upload error: ', err)
                  }).end(file.buffer)
                }) //end promise
               promises.push(newPromise)
            
        }) //end foreach

        Promise
        .all(promises)
        .then((response) => {
            // the response I get here is [undefined, undefined]
            res.status(200).send(response)
        })//.catch(err => console.log(err))


    } catch (err) {
        
        let message = ''
        if (err.code == "LIMIT_FILE_SIZE") {
            message = "File size cannot be larger than 2MB!"
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            message = "Only 2 files can be uploaded"
        }

        responseHelper.requestfailure(res, message, err)
    }


}

module.exports = {
    createPublicAppointmentRequest,
    createAppointmentRequest,
    getAppointmentRequestsWithFullDetails,
    getAppointmentRequestsList,
    updateAppointmentRequest,
    removeAppointmentRequest,
    findAppointmentRequestById,
    //createTestAppointmentRequest,
    uploadMedicalImages,
    uploadMedicalVideos,
    uploadMedicinePrescription,
    uploadFileToGoogleCloud,
    uploadMultipleFilesToGoogleCloud

}



