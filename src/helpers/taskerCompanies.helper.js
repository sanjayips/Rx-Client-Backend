/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const TaskerCompany = mongoose.model('taskerCompanies')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTaskerCompany: async (data) => {
        console.log("createTaskerCompany HelperFunction is called");
        const taskerCompany = new TaskerCompany(data)
        await taskerCompany.save()
        return taskerCompany
        
    },
    getTaskerCompaniesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerCompany Model Function called")

        const taskerCompanies = await TaskerCompany.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerCompaniessize = taskerCompanies.length

        return {
            taskerCompanies: taskerCompanies,
            count: taskerCompaniessize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaskerCompaniesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTasks Model Function called")

        const taskerCompanies = await TaskerCompany.find(query.critarion).select(query.fields/* '_id TaskName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerCompaniessize = taskerCompanies.length

        return {
            taskerCompanies: taskerCompanies,
            count: taskerCompaniessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTaskerCompany: async (data) => {
        console.log("updateTask HelperFunction is called");
        const result = await promise.all([TaskerCompany.findOneAndUpdate({_id: data.taskerCompanyid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTaskerCompany: async (data) => {
        console.log("removeTaskerCompany HelperFunction is called");

        const taskerCompany = await TaskerCompany.findById(data.id);
        if(taskerCompany == null){
             var error = "TaskerCompany does not exists."
             return error
        }
        taskerCompany.lastModifiedBy = data.lastModifiedBy
        taskerCompany.active = false
        await taskerCompany.save()
        return taskerCompany;
        

    },

    findTaskerCompanyById: async (query) => {
        console.log("findTaskerCompanyById HelperFunction is called");
        
        const taskerCompany = await TaskerCompany.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return taskerCompany;
        

    },

    

};
