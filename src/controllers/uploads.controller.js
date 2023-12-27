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


const User = mongoose.model('users')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

const processFile = require('../middlewares/upload')
const processMultipleFiles = require('../middlewares/uploadmultiple')
const processVideoTutorialFiles = require('../middlewares/uploadmultiplevideos')
const processCvFile = require('../middlewares/uploadApplicantCv')
const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: 'hporx-google-cloud-key.json' })
const bucket = storage.bucket("hporxuploads")
const dpbucket = storage.bucket("medicalvideofiles")
const cvbucket = storage.bucket("applicantcvs")
const jobimagebucket = storage.bucket("hporxjobimages")
const vidtutbucket = storage.bucket("hporxvideotutorials")

var uploadVideoTutorial = async (req, res) => {
  console.log("uploadVideoTutorial called")
  try {
      var role = req.token_decoded.r


      var appointmentData = req.body
      appointmentData.lastModifiedBy = req.token_decoded.d
      
      await processVideoTutorialFiles(req, res)
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        //let userData = JSON.parse(req.body.request)
        let promises = []

        
            let uploadedfile = Date.now() + '-' + req.file.originalname
            const blob = vidtutbucket.file(uploadedfile)
            const newPromise =  new Promise((resolve, reject) => {
                blob.createWriteStream({
                    metadata: { contentType: req.file.mimetype }
                  }).on('finish', async response => {
                    const Url = `https://storage.googleapis.com/${vidtutbucket.name}/${blob.name}`
                    await blob.makePublic()
                    //resolve(response)
                    resolve({ name: uploadedfile, url: Url });
                  }).on('error', err => {
                    console.log('upload reject')
                    console.log(err)
                    reject('upload error: ', err)
                  }).end(req.file.buffer)
                }) //end promise
               promises.push(newPromise)
            
        

        Promise
        .all(promises)
        .then((response) => {
            
            res.status(200).send(response)
        }).catch(err => console.log(err))


  } catch (err) {
      
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 35 MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}

var uploadSingleFileOld = async (req, res) => {
    console.log('uploadSingleFile called')
    try {
        var DepartmentData = req.body
        var role = req.token_decoded.r

        await processFile(req, res);
    //console.log(req.files)

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let userData = JSON.parse(req.body.request)
    let uploadedfile = Date.now() + '-' + req.file.originalname

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(userData.folderName+'/' +uploadedfile)
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
        await bucket.file(uploadedfile).makePublic();
      } catch {
        /* return res.status(500).send({
          message:
            `Uploaded the file successfully: ${uploadedfile}, but public access is denied!`,
          url: publicUrl,
        }); */
        err => {
            console.log(err)

            return res.status(500).send(err)
        }
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + uploadedfile,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);

        /* var message = "Job Department created successfully"
        return responseHelper.success(res, result, message) */

    } catch (err) {
        let message = ''
        if (err.code == "LIMIT_FILE_SIZE") {
            message = "File size cannot be larger than 2MB!"
          }
         message = `Could not upload the file: ${req.file.originalname}. ${err}`
        responseHelper.requestfailure(res, message, err)
    }
} //end function

var uploadSingleFile = async (req, res) => {
    console.log("uploadFileToGoogleCloud called")
    try {
        var role = req.token_decoded.r


        var appointmentData = req.body
        appointmentData.lastModifiedBy = req.token_decoded.d
        //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


        await processFile(req, res)
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        let userData = JSON.parse(req.body.request)
        let promises = []

        
            let uploadedfile = Date.now() + '-' + req.file.originalname
            const blob = bucket.file(userData.folderName+'/' +uploadedfile)
            const newPromise =  new Promise((resolve, reject) => {
                blob.createWriteStream({
                    metadata: { contentType: req.file.mimetype }
                  }).on('finish', async response => {
                    const Url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                    await blob.makePublic()
                    //resolve(response)
                    resolve({ name: userData.folderName+'/' +uploadedfile, url: Url });
                  }).on('error', err => {
                    reject('upload error: ', err)
                  }).end(req.file.buffer)
                }) //end promise
               promises.push(newPromise)
            
        

        Promise
        .all(promises)
        .then((response) => {
            
            res.status(200).send(response)
        })


    } catch (err) {
        
        let message = ''
        if (err.code == "LIMIT_FILE_SIZE") {
            message = "File size cannot be larger than 2MB!"
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            message = "Only 1 file can be uploaded"
        }

        responseHelper.requestfailure(res, message, err)
    }


}

var deleteSingleFile = async (req, res) => {
    console.log("deleteSingleFile called")
    try {
        //var role = req.token_decoded.r

        //let deletefile = "https://storage.googleapis.com/applicantcvs/1669717536385-3.jpg"

        let folderName = "applicantcvs"
        let filename = "1669717536385-3.jpg"
        var deleteFilData = req.body
        deletionResult = await cvbucket.file(filename).delete()
        var message = deleteFilData.filename+" File deleted successfully"


        return responseHelper.success(res, deletionResult, message)


    } catch (err) {

      console.log(err)

        let message = ''
        if(err.errors[0].reason === "notFound"){
            message = "File does not exists on server"
        }

        responseHelper.requestfailure(res, message, {})
    }


}

var uploadVideoMultipleTutorials = async (req, res) => {
  console.log("uploadVideoTutorials called")
  try {
      var role = req.token_decoded.r


      var appointmentData = req.body
      appointmentData.lastModifiedBy = req.token_decoded.d
      
      await processVideoTutorialFiles(req, res)
      console.log(req.files)
      if (!req.files || req.files.length === 0) {
        console.log("err")
          return res.status(400).send({ message: "Please attach atleast 1 file!" });
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
          message = "File size cannot be larger than 35 MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 5 files can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}



var uploadUserDp = async (req, res) => {
  console.log("uploadUserDp called")
  try {
      var role = req.token_decoded.r
      

      var appointmentData = req.body
      appointmentData.lastModifiedBy = req.token_decoded.d
      //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


      await processFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      let userData = JSON.parse(req.body.request)
      let promises = []

      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = dpbucket.file(uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  const Url = `https://storage.googleapis.com/${dpbucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: uploadedfile, url: Url });
                }).on('error', err => {
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      }).catch(err => {

        console.log('reject')
        console.log(err)

      })


  } catch (err) {
      console.log(err)
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}

var uploadApplicantCV = async (req, res) => {
  console.log("uploadUserDp called")
  try {
    /* var role = req.token_decoded.r
    

    var appointmentData = req.body
    appointmentData.lastModifiedBy = req.token_decoded.d */
    //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


    await processCvFile(req, res)
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    let userData = JSON.parse(req.body.request)
    let currentUser = await User.findById(userData.userid)

    let deltionresult = await deleteBucketFile("applicantcvs", currentUser.cvFile)
    console.log(deltionresult)
    let promises = []


    let uploadedfile = Date.now() + '-' + req.file.originalname
    const blob = cvbucket.file(uploadedfile)
    const newPromise = new Promise((resolve, reject) => {
      console.log("upload promise called")
      blob.createWriteStream({
        metadata: { contentType: req.file.mimetype }
      }).on('finish', async response => {
        const Url = `https://storage.googleapis.com/${cvbucket.name}/${blob.name}`
        await blob.makePublic()

        //resolve(response)
        resolve(
          {
            name: uploadedfile,
            url: Url,
            message: deltionresult ? "File Replaced" : "No old cv found. New Uploadd!"
          });
      }).on('error', err => {
        reject('upload error: ', err)
      }).end(req.file.buffer)
    }) //end promise
    promises.push(newPromise)



    Promise
      .all(promises)
      .then(async (response) => {
        console.log("then")
        console.log(response)
        let data = {
          cvFilePath: response[0].url,
          cvFile: response[0].name
        }

        const result = await User.findOneAndUpdate({ _id: userData.userid }, data, { new: true })

        res.status(200).send(response[0])
      }).catch(err => {

        console.log('reject')
        console.log(err)
        return res.status(400).send(err)

      })


  } catch (err) {
    console.log(err)
    let message = ''
    if (err.code == "LIMIT_FILE_SIZE") {
      message = "File size cannot be larger than 2MB!"
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Only 1 file can be uploaded"
    }

    responseHelper.requestfailure(res, message, err)
  }


}

var deleteBucketFile = async (bucketname, filename) => {
  console.log("deleteBucketFile called")
  console.log(bucketname)
  console.log(filename)
  //return true
  try {
    const currntBucket = storage.bucket(bucketname)
    deletionResult = await currntBucket.file(filename).delete()
    

    if (deletionResult[0].headers["content - length"] === "0") {
      return true
    } else {
      console.log("false in try of delete file even then return true file is deleted ")
      return true
    }

  } catch (err) {

    //console.log(err)

    
   let message = ''
    if (err.errors[0].reason === "notFound") {
      message = "File does not exists on server"
      return false
    }
    //responseHelper.requestfailure(res, message, {})
  } 

}

var uploadProductImgs = async (req, res) => {
  console.log("uploadUserDp called")
  try {
      var role = req.token_decoded.r
      const prodbucket = storage.bucket("hporxproducts")

      var appointmentData = req.body
      appointmentData.lastModifiedBy = req.token_decoded.d
      //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


      await processFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      //let userData = JSON.parse(req.body.request)
      let promises = []

      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = prodbucket.file(uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  const Url = `https://storage.googleapis.com/${prodbucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: uploadedfile, url: Url });
                }).on('error', err => {
                  console.log('error in promise')
                  console.log(err)
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      }).catch(err => {

        console.log('reject')
        console.log(err)

      })


  } catch (err) {
      console.log(err)
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}

var uploadCompanyLogoFile = async (req, res) => {
  console.log("uploadCompanyLogoFile called")
  try {
      
      const compLogoBucket = storage.bucket("dascompanylogos")

      
      await processFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      
      let promises = []
      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = compLogoBucket.file(uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  const Url = `https://storage.googleapis.com/${compLogoBucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: uploadedfile, url: Url });
                }).on('error', err => {
                  console.log('error in promise')
                  console.log(err)
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      }).catch(err => {

        console.log('reject')
        console.log(err)

      })


  } catch (err) {
      console.log(err)
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}

var uploadSingleFilePublic = async (req, res) => {
  console.log("uploadFileToGoogleCloud called")
  try {
      var role = req.token_decoded.r


      var appointmentData = req.body
      //appointmentData.lastModifiedBy = req.token_decoded.d
      //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


      await processFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      let userData = JSON.parse(req.body.request)
      let promises = []

      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = bucket.file(userData.folderName+'/' +uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  const Url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: userData.folderName+'/' +uploadedfile, url: Url });
                }).on('error', err => {
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      })


  } catch (err) {
      
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}


var uploadPublicCvFile = async (req, res) => {
  console.log("uploadPublicCvFile called")
  try {
      
      
      await processCvFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      
      let promises = []
      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = cvbucket.file(uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  const Url = `https://storage.googleapis.com/${cvbucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: uploadedfile, url: Url });
                }).on('error', err => {
                  console.log('error in promise')
                  console.log(err)
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      }).catch(err => {

        console.log('reject')
        console.log(err)

      })


  } catch (err) {
      console.log(err)
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}

var uploadJobImage = async (req, res) => {
  console.log("uploadJobImage called")
  try {
      
    

      var appointmentData = req.body
      appointmentData.lastModifiedBy = req.token_decoded.d
      //-var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)


      await processFile(req, res)
      if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      
      let promises = []

      
          let uploadedfile = Date.now() + '-' + req.file.originalname
          const blob = jobimagebucket.file(uploadedfile)
          const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                  metadata: { contentType: req.file.mimetype }
                }).on('finish', async response => {
                  console.log('finished called')
                  console.log(response)
                  const Url = `https://storage.googleapis.com/${jobimagebucket.name}/${blob.name}`
                  await blob.makePublic()
                  //resolve(response)
                  resolve({ name: uploadedfile, url: Url });
                }).on('error', err => {
                  console.log('on err called')
                  console.log(err)
                  reject('upload error: ', err)
                }).end(req.file.buffer)
              }) //end promise
             promises.push(newPromise)
          
      

      Promise
      .all(promises)
      .then((response) => {
          
          res.status(200).send(response)
      }).catch(err => {

        console.log('reject')
        console.log(err)

      })


  } catch (err) {
      console.log(err)
      let message = ''
      if (err.code == "LIMIT_FILE_SIZE") {
          message = "File size cannot be larger than 2MB!"
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          message = "Only 1 file can be uploaded"
      }

      responseHelper.requestfailure(res, message, err)
  }


}





module.exports = {
    uploadSingleFile,
    deleteSingleFile,
    uploadVideoTutorial,
    uploadUserDp,
    uploadProductImgs,
    uploadSingleFilePublic,
    uploadCompanyLogoFile,
    uploadApplicantCV,
    uploadPublicCvFile,
    uploadJobImage
}



