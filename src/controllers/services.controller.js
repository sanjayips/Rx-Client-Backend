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


const serviceHelper = require('../helpers/service.helper')
const businessServiceProviderHelper = require('../helpers/businessserviceprovider.helper')
const individualserverproviderHelper = require('../helpers/individualserviceprovider.helper')
const IndvidualServiceProvider = mongoose.model('individualServiceProviders')
const userHelper = require('../helpers/user.helper')
const User = mongoose.model('users')
/* const DistanceMatrix = require('node-distance-matrix') */
var distance = require('google-distance-matrix')
var axios = require('axios')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)
let wwbusinesses = require('../hardCodedData/worldwidebusiness')
var populateDBWithSrvsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
        let allcatg = [];
        //let serviceproviders = []
        let offset = 0
        let limit = 1
        for(var i= 0; i <3453; i++){
            console.log('Iteration at start: ' + i)
            
            //if(i == 4){limit = 2}
            

            let serviceproviders = wwbusinesses.getHunderd(offset, limit)

            /* console.log('service name: ' + serviceproviders.Business)
            console.log('Latitude: ' + serviceproviders.Latitude)
            console.log('Longitude: ' + serviceproviders.Longitude)
 */
            for (var j = 0; j < serviceproviders.length; j++) {

                let spcord = []
                if (serviceproviders[j].Longitude == "") {
                    spcord.push(0)
                } else {
                    spcord.push(parseFloat(serviceproviders[j].Longitude))
                }
    
                if (serviceproviders[j].Latitude == "") {
                    spcord.push(0)
                } else {
                    spcord.push(parseFloat(serviceproviders[j].Latitude))
                }
    
    
                let bsnsSP = {
                    businessName: serviceproviders[j].Business,
                    category: serviceproviders[j].Category,
                    //content: sp.Content,
                    address: serviceproviders[j].Address,
                    contactNumber: serviceproviders[j].ContactNo,
                    website: serviceproviders[j].Website,
                    email: serviceproviders[j].Email,
                    linkAddress: serviceproviders[j].LinkAddress,
                    socialLink: serviceproviders[j].SocialLink
                }
                
                let bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(bsnsSP)
    
                let newSP = {
                    serviceName: serviceproviders[j].Business,
                    serviceCountry: serviceproviders[j].Country,
                    serviceCity: serviceproviders[j].City,
                    serviceLocation: {
                        type: "Point",
                        coordinates: spcord
                    },
                    category: serviceproviders[j].Category,
                    businessServiceProvider: bspobj._id
                }
    
                await serviceHelper.createService(newSP)
    
    
            } //end for of 

            offset = limit
            limit += 1
            console.log('Iteration at end: ' + i)
            console.log(serviceproviders)
            console.log('offset in main' + offset)
        }

        //console.log(fh.length)
        /* for(sp of serviceproviders){
          if(!allcatg.includes(sp.City)){
          allcatg.push(sp.City)}
        } */

        /* for (sp of serviceproviders) {

            let spcord = []
            if (sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if (sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }


            let bsnsSP = {
                businessName: sp.Business,
                category: sp.Category,
                //content: sp.Content,
                address: sp.Address,
                contactNumber: sp.ContactNo,
                website: sp.Website,
                email: sp.Email,
                linkAddress: sp.LinkAddress,
                socialLink: sp.SocialLink
            }
            
            let bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Business,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord
                },
                category: sp.Category,
                businessServiceProvider: bspobj._id
            }

            var result = await serviceHelper.createService(newSP)


        } //end for of  */

        //console.log(spcord)
        var message = "Service created successfully"
        return responseHelper.success(res, allcatg, message)

    }
    catch { }
} //end function

var populateDBWithDoctorsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
         let serviceproviders = []
          
          
          for(sp of serviceproviders){

            let spcord = []
            if(sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            
//i have to create business service provider object and save and get id and provide it sp

                let bsnsSP = {
                    title: sp.Title,
                    content: sp.Content,
                    gender: sp.Gender,
                    category: sp.Category,
                    contactNo: sp.Contact,
                    address: sp.Address,
                    state: sp.State,
                    zip: sp.ZIP,
                    email: sp.Email,
                    website: sp.Website,
                    facebook: sp.Facebook,
                    twitter: sp.Twitter,
                    instagram: sp.Instagram,
                    linkedin: sp.LinkedIn,
                    qualifications: []
                    
                }
            


            let docbj = await individualserverproviderHelper.createIndvidualServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Title,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord                    
                },
                category: sp.Category,
                isIndividual: true,
                individualServiceProvider: docbj._id
            }

            var result = await serviceHelper.createService(newSP)
            

          } //end for of

          //console.log(spcord)
          var message = "Service created successfully"
          return responseHelper.success(res, {}, message)
    
    }
    catch{}
} //end function

var populateDBWithLawyersPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
         let serviceproviders = []
          for(sp of serviceproviders){
console.log(sp)
            let spcord = []
            if(sp.Longitude == 0) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == 0) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            
//i have to create business service provider object and save and get id and provide it sp

                let bsnsSP = {
                    title: sp.Title,
                    //content: sp.Content,
                    gender: sp.Gender,
                    category: sp.Category,
                    contactNo: sp.Contact,
                    address: sp.Address,
                    state: sp.State,
                    zip: sp.ZIP,
                    email: sp.Email,
                    website: sp.Website,
                    facebook: sp.Facebook,
                    twitter: sp.Twitter,
                    instagram: sp.Instagram,
                    linkedin: sp.LinkedIn,
                    qualifications: []
                    
                }
            


            let docbj = await individualserverproviderHelper.createIndvidualServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Title,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord                    
                },
                category: sp.Category,
                isIndividual: true,
                individualServiceProvider: docbj._id
            }

            var result = await serviceHelper.createService(newSP)
            

          } //end for of

          //console.log(spcord)
          var message = "Service created successfully"
          return responseHelper.success(res, {}, message)
    
    }
    catch{}
} //end function

var createService = async (req, res) => {
    console.log('createService called')

    
    try {
        var serviceData = req.body
        //var role = req.token_decoded.r
        ///serviceData.addedby = req.token_decoded.d
        let serviceProvider
        let bspobj
        if(serviceData.isIndividual){
            console.log('Individual entry')
            //first of all create user for doctor or lawyer
            let userandtoken
            serviceData.email = serviceData.email.toLowerCase();
            let exists = await userHelper.isUserEmailExists(serviceData.email);
            if (exists) {
                
                let err = "Email already exists";
                return responseHelper.requestfailure(res, err);
                
            } else {
                let exists = await userHelper.isUserEmailExists(serviceData.email);
                _.extend(serviceData, {
                    _id: mongoose.Types.ObjectId().toString()
                });
                let password = serviceData.password;
                if (!password) {
                    return responseHelper.requestfailure(res, 'Please provide password to signup');
                }
                new_user = true;
                serviceData = _.omit(serviceData, ['password']);

                let randomize = require('randomatic');
                serviceData.verification_code = randomize('0', 4, {});
                let newUser = new User(serviceData);
                await newUser.save();
                newUser.setPassword(password);
                await newUser.save();
                userandtoken = await userHelper.updateUser(serviceData)
            }
 //create doctors lawyers
            serviceProvider = {
                user: userandtoken.user._doc._id,
                title: serviceData.title,
                content: serviceData.content,
                gender: serviceData.gender,
                category: serviceData.category,
                contactNo: serviceData.contactNo,
                address: serviceData.address,
                state: serviceData.state,
                zip: serviceData.zip,
                email: serviceData.email,
                website: serviceData.website,
                facebook: serviceData.facebook,
                twitter: serviceData.twitter,
                instagram: serviceData.instagram,
                linkedin: serviceData.linkedin,
                isIndividual: true,
                qualifications: []
                
            }

            bspobj = await individualserverproviderHelper.createIndvidualServiceProvider(serviceProvider)

        } else {
            //create businesses
            console.log('Business entry')
            serviceProvider = {
            businessName: serviceData.businessName,
            category: serviceData.category,
            content: serviceData.content,
            address: serviceData.address,
            contactNumber: serviceData.contactNumber,
            website: serviceData.website,
            email: serviceData.email,
            linkAddress: serviceData.linkAddress,
            isIndividual: false,
            socialLink: serviceData.socialLink
        }

        bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(serviceProvider)
    }


    

    let newSP 
    if(serviceData.isIndividual){
        console.log('Individual Service')
        newSP = {
            serviceName: serviceData.title,
            serviceCountry: serviceData.serviceCountry,
            serviceCity: serviceData.serviceCity,
            serviceLocation: serviceData.serviceLocation,
            category: serviceData.category,
            individualServiceProvider: bspobj._id,
            isIndividual: true
        }
    }else{
        console.log('Business Service')
        newSP = {
            serviceName: serviceData.businessName,
            serviceCountry: serviceData.serviceCountry,
            serviceCity: serviceData.serviceCity,
            serviceLocation: serviceData.serviceLocation,
            category: serviceData.category,
            businessServiceProvider: bspobj._id,
            isIndividual: false
        }
    }
    
    
    

    var result = await serviceHelper.createService(newSP)

        
            var message = "Service created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getServicesWithFullDetails = async (req, res) => {
    console.log("getServicesWithFullDetails called")
    var serviceData = req.body


    try {

        var result = await serviceHelper.getServicesWithFullDetails(serviceData.sortproperty, serviceData.sortorder, serviceData.offset, serviceData.limit, serviceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getServicesList = async (req, res) => {
    console.log("getServicesList called")
    var serviceData = req.body


    try {

        var result = await serviceHelper.getServicesList(serviceData.sortproperty, serviceData.sortorder, serviceData.offset, serviceData.limit, serviceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateService = async (req, res) => {
    console.log("request received for updateService")

    var serviceData = req.body
    
    try {
        serviceData.lastModifiedBy = req.token_decoded.d

        let serviceQuery = {
          critarion: {_id : serviceData.serviceid},          
          addedby: "_id email first_name",          
          lastModifiedBy: "_id email first_name",
          individualServiceProvider: "_id",          
          businessServiceProvider: "_id"
        }

        let fetchedService = await serviceHelper.findServiceById(serviceQuery)

        let fetchedObject
        if(fetchedService.isIndividual){
          //let query = {individualserviceproviderid: fetchedService.individualServiceProvider._id}
          serviceData.individualserviceproviderid = fetchedService.individualServiceProvider._id
          serviceData.serviceName = serviceData.title
          fetchedObject = await individualserverproviderHelper.updateIndvidualServiceProvider(serviceData)
        } else {
          serviceData.businessserviceproviderid = fetchedService.businessServiceProvider._id
          serviceData.serviceName = serviceData.businessName
          fetchedObject = await businessServiceProviderHelper.updateBusinessServiceProvider(serviceData)
        }
        
            var result = await serviceHelper.updateService(serviceData)
            var message = 'Service Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var approveDisapproveService = async (req, res) => {
    console.log("request received for approveDisapproveService")

    var serviceData = req.body
    
    try {
        serviceData.lastModifiedBy = req.token_decoded.d

        let serviceQuery = {
            critarion: {_id : serviceData.serviceid},          
            addedby: "_id email first_name",          
            lastModifiedBy: "_id email first_name",
            individualServiceProvider: "_id",          
            businessServiceProvider: "_id"
          }

        let fetchedService = await serviceHelper.findServiceById(serviceQuery)

        let result
        let message
        if(fetchedService.isIndividual && !serviceData.isApproved){
            console.log("delete individual server")
          let indquery = {id: fetchedService.individualServiceProvider._id}
          let srvcquery = {id: serviceData.serviceid}
          
          result = await individualserverproviderHelper.removeIndvidualServiceProvider(indquery)
          result = await serviceHelper.removeService(srvcquery)

          message = "Service and Invididual Service Provider data deleted"
        } else if(fetchedService.isIndividual && serviceData.isApproved){
            console.log('approve ind srv')
            result = await serviceHelper.updateService(serviceData)
            message = "Service is approved successfully"
        }

        if(!fetchedService.isIndividual && !serviceData.isApproved){
            console.log("delete business server")

            let busnsquery = {id: fetchedService.businessServiceProvider._id}
          let srvcquery = {id: serviceData.serviceid}
          
          result = await businessServiceProviderHelper.removeBusinessServiceProvider(busnsquery)
          result = await serviceHelper.removeService(srvcquery)
          message = "Service and Business Service Provider data deleted"
          
        } else if(!fetchedService.isIndividual && serviceData.isApproved){
            console.log('approve bus srv')
            result = await serviceHelper.updateService(serviceData)
            message = "Service is approved successfully"
        }
        
            //var result = await serviceHelper.updateService(serviceData)
            
            //message = "Service is fetch successfully"

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}



var removeService = async (req, res) => {
    console.log("removeService called")
    try {
        var role = req.token_decoded.r

       
            var serviceData = req.body
            serviceData.lastModifiedBy = req.token_decoded.d
            var result = await serviceHelper.removeService(serviceData)

            var message = "Service removed successfully"

            if (result == "Service does not exists.") {
                message = "Service does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findServiceById = async (req, res) => {
    console.log("findServiceById called")
    try {
        //var role = req.token_decoded.r

        
            var serviceData = req.body

            var result = await serviceHelper.findServiceById(serviceData)
            console.log(result)
            var message = "Service find successfully"
            if (result == null) {
                message = "Service does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var locateAllServices = async (req, res) => {
    console.log("locateActiveCalls Calls called");
    try {

        var userData = req.body;


        userData.minDistance = userData.minDistance * 1000; //converting km to meters
        userData.maxDistance = userData.maxDistance * 1000; //converting km to meters

        var result = await serviceHelper.locateAllServices(userData.sortproperty, userData.sortorder, userData.offset, userData.limit, userData.minDistance, userData.maxDistance, userData.location, userData.query);

        if (result === null) {
            var message = 'No Services';
            responseHelper.success(res, result, message);
        } else if (result.count == 0) {
            var message = 'No Services';
            responseHelper.success(res, result, message);

        } else {

            let modes = ['driving', 'walking', 'bicycling', 'transit']
            let transits = ['bus', 'subway', 'train', 'tram', 'rail']


            let origins = '' + userData.location.lat + '%2C' + userData.location.lng + ''

            //extractung subsets of services. each of lenght 25 or lesser
            let size = 25
  
            let motherArrayOfServices = []
            do {
                //console.log('existing length ' +result.services.length +' array'+result.services)
                if (result.services.length >= size) 
                {
                    let newarray = result.services.splice(0, size)
                    motherArrayOfServices.push(newarray)
                } else if(result.services.length <= size){
                    let newarray = result.services.splice(0, size)
                    motherArrayOfServices.push(newarray)
                }
            } while (result.services.length != 0)

            //console.log(motherArrayOfServices)



            //make all destinations array 
            let allDestinations = []
            
            for (setOfServices of motherArrayOfServices) {
                let destination = ''
                for (service of setOfServices) {
                    let serv = service.toObject()
                    destination += '' + serv.serviceLocation.coordinates[1] + '%2C' + serv.serviceLocation.coordinates[0] + '%7C'
                }

                let destinations = []
                destinations.push (destination.slice(0, -3))
                allDestinations.push(destinations)
            }
            //get distances of each mode of each destination

            let distances = []

            //getting all distances

            console.log(allDestinations)


            


            
        for (var x = 0; x < allDestinations.length; x++) {
            for (var k = 0; k < modes.length; k++) {

                if (modes[k] != "transit") {
                    let response = await getDistance(origins, allDestinations[x], modes[k])

                    for (var p = 0; p < response.data.rows[0].elements.length; p++) {

                        let serv = motherArrayOfServices[x][p].toObject()
                        if (response.data.rows[0].elements[p].status == "OK") {

                            let distancerslt = {
                                serviceName: serv.serviceName,
                                distanceMode: modes[k],

                                distance: response.data.rows[0].elements[p].distance.text,
                                duration: response.data.rows[0].elements[p].duration.text
                            }

                            motherArrayOfServices[x][p]._doc.distances.push(distancerslt)

                        } else {
                            let distancerslt = {
                                serviceName: serv.serviceName,
                                distanceMode: modes[k],

                                distance: "No Route Could be Found",
                                duration: "No Route Could be Found"
                            }

                            motherArrayOfServices[x][p]._doc.distances.push(distancerslt)
                        }

                    }

                } else {

                    for (var m = 0; m < transits.length; m++) {
                        let response = await getDistance(origins, allDestinations[x], modes[k], transits[m])

                        for (var p = 0; p < response.data.rows[0].elements.length; p++) {
                            let serv = motherArrayOfServices[x][p].toObject()
                            if (response.data.rows[0].elements[p].status == "OK") {

                                let distancerslt = {
                                    serviceName: serv.serviceName,
                                    distanceMode: modes[k],
                                    transitMode: transits[m],
                                    distance: response.data.rows[0].elements[p].distance.text,
                                    duration: response.data.rows[0].elements[p].duration.text
                                }

                                motherArrayOfServices[x][p]._doc.distances.push(distancerslt)

                            } else {
                                let distancerslt = {
                                    serviceName: serv.serviceName,
                                    distanceMode: modes[k],
                                    transitMode: transits[m],
                                    distance: "No Route Could be Found",
                                    duration: "No Route Could be Found"
                                }

                                motherArrayOfServices[x][p]._doc.distances.push(distancerslt)
                            }

                        }
                    } //end distances response for
                }
            } //end for loop of modes
        }//end alldestinations

result.services = motherArrayOfServices.flat()



            responseHelper.success(res, result, message)


        } //end else

    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
}
let count = 1
var getDistance = async (origin, destination, mode, submode) => {
    console.log('getDistance called')
    console.log('count '+count)
    count++
    //console.log(service)
    /*console.log(origin)
    console.log(destination)
    console.log(mode) &transit_mode=${submode}
    console.log(submode) */

/* let newurl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&mode=transit&transit_mode=bus&key=${process.env.G_API}` */

let currentUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${process.env.G_API}`

if(mode == "transit"){
    //config.url = config.url+`&transit_mode=${submode}` 

    currentUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&transit_mode=${submode}&key=${process.env.G_API}`
}
    var config = {
        method: 'get',
       /*  url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${process.env.G_API}`, */
       url: currentUrl,
        headers: {}
    };

    

    //console.log(config.url)

    let result = axios(config)
        .then(function (response) {
            //console.log('mode')
            //console.log(mode)
            //console.log(response) 
            //let resultset = []
            return response//.data.rows[0].elements
            /* if (response.data.rows[0].elements[0].status == "OK") {
                if(mode == "transit"){
                    distancerslt  = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        transitMode: submode,
                        distance: response.data.rows[0].elements[0].distance.text,
                        duration: response.data.rows[0].elements[0].duration.text
                    }
                    return distancerslt
                }else{
                    distancerslt  = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        distance: response.data.rows[0].elements[0].distance.text,
                        duration: response.data.rows[0].elements[0].duration.text
                    }
                    return distancerslt
                }
                
            } else {

                

                if (mode == "transit") {
                    distancerslt = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        transitMode: submode,
                        distance: "No Route Could be Found",
                        duration: "No Route Could be Found"
                    }
                    return distancerslt
                } else {
                    distancerslt = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        distance: "No Route Could be Found",
                        duration: "No Route Could be Found"
                    }
                    return distancerslt
                }

            } */
            

            //return resultset
        })
        .catch(function (error) {
            console.log(error);
            return error
        })
    return result



} //end function

var getDoctorsList = async (req, res) => {
    console.log("getServicesList called")
    var serviceData = req.body


    try {

        var result = await serviceHelper.getServicesList(serviceData.sortproperty, serviceData.sortorder, serviceData.offset, serviceData.limit, serviceData.query)

         
         let alldoctors = result.services.map(service => {
            let srv = service.toObject()
            
            let {individualServiceProvider} = srv
            return individualServiceProvider
           
        })

        result.services = alldoctors

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    populateDBWithSrvsPrvs,
    populateDBWithDoctorsPrvs,
    populateDBWithLawyersPrvs,
    createService,
    getServicesWithFullDetails,
    locateAllServices,
    getServicesList,
    updateService,
    removeService,
    findServiceById,
    approveDisapproveService,
    getDoctorsList

}



