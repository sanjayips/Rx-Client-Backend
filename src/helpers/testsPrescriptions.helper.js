/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const TestPrescription = mongoose.model('testPrescriptions')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTestPrescription: async (data) => {
        console.log("createTestPrescription HelperFunction is called");
        const testPrescription = new TestPrescription(data)
        await testPrescription.save()
        return testPrescription
        
    },
    getTestPrescriptionsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTestPrescriptions Model Function called")

        const testPrescriptions = await TestPrescription.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const testPrescriptionssize = testPrescriptions.length

        return {
            testPrescriptions: testPrescriptions,
            count: testPrescriptionssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTestPrescriptionsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTestPrescriptions Model Function called")

        const testPrescriptions = await TestPrescription.find(query.critarion).select(query.fields/* '_id testPrescriptionName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const testPrescriptionssize = testPrescriptions.length

        return {
            testPrescriptions: testPrescriptions,
            count: testPrescriptionssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTestPrescription: async (data) => {
        console.log("updateTestPrescription HelperFunction is called");
        const result = await promise.all([TestPrescription.findOneAndUpdate({_id: data.testPrescriptionid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTestPrescription: async (data) => {
        console.log("removeTestPrescription HelperFunction is called");

        const testPrescription = await TestPrescription.findById(data.id);
        if(testPrescription == null){
             var error = "testPrescription does not exists."
             return error
        }
        testPrescription.lastModifiedBy = data.lastModifiedBy
        testPrescription.active = false
        await testPrescription.save()
        return testPrescription;
        

    },

    findTestPrescriptionById: async (query) => {
        console.log("findTestPrescriptionById HelperFunction is called");
        
        const testPrescription = await TestPrescription.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return testPrescription;
        

    },

    

};
