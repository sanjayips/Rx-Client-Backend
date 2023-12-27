/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Tasker = mongoose.model('taskers')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTasker: async (data) => {
        console.log("createTasker HelperFunction is called");
        const taskers = new Tasker(data)
        await taskers.save()
        return taskers
        
    },
    getTaskersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskers Model Function called")

        const taskers = await Tasker.find(query.critarion)
       
        .populate('addedby', query.addedby)        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('user', query.userFields)
        .populate('taskerSkills', query.taskerSkillsFields)
        .populate('taskfeedbacks', )
        .populate({
            path: 'taskfeedbacks',
            select: query.taskfeedbacksFields,
            populate: [{
                path: 'task',
                model: 'tasks',
                select: query.taskfields,
                populate: {
                    path: "customer",
                    model: "users"
                }
            },
            {
                path: 'feedbackby',
                model: 'users',
                select: query.feedbackbyfields
            }]
        })

        .populate({
            path: 'taskerCompany',
            select: query.taskerCompanyFields,
            populate: [{
                path: 'industries',
                model: 'industries',
                select: query.industriesfields
            },
            {
                path: 'tasksCategory',
                model: 'taskCategories',
                select: query.taskCategoriesfields
            }]
        })
        .populate({
            path: 'individualTasker',
            select: query.individualTaskerFields,
            populate: [{
                path: 'industries',
                model: 'industries',
                select: query.industriesfields
            },{
                path: 'assessmentAttempts',
                model: 'assessmentAttempts',
                select: query.assessmentAttemptsfields
            },
            {
                path: 'tasksCategory',
                model: 'taskCategories',
                select: query.taskCategoriesfields
            }]
        })
        
        
        
        
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerssize = taskers.length

        return {
            taskers: taskers,
            count: taskerssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaskersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskers Model Function called")

        const taskers = await Tasker.find(query.critarion).select(query.fields/* '_id TaskerName' */)
        .populate('user', query.userFields)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerssize = taskers.length

        return {
            taskers: taskers,
            count: taskerssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTasker: async (data) => {
        console.log("updateTasker HelperFunction is called");
        const result = await promise.all([Tasker.findOneAndUpdate({_id: data.taskersid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTasker: async (data) => {
        console.log("removeTasker HelperFunction is called");

        const taskers = await Tasker.findById(data.id);
        if(taskers == null){
             var error = "Tasker does not exists."
             return error
        }
        taskers.lastModifiedBy = data.lastModifiedBy
        taskers.active = false
        await taskers.save()
        return taskers;
        

    },

    findTaskerById: async (query) => {
        console.log("findTaskerById HelperFunction is called");
        
        const taskers = await Tasker.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .populate('user', query.userFields)
        .populate('taskerSkills', query.taskerSkillsFields)
        .populate('taskfeedbacks', )
        .populate({
            path: 'taskfeedbacks',
            select: query.taskfeedbacksFields,
            populate: [{
                path: 'task',
                model: 'tasks',
                select: query.taskfields
            },
            {
                path: 'feedbackby',
                model: 'users',
                select: query.feedbackbyfields
            }]
        })

        .populate({
            path: 'taskerCompany',
            select: query.taskerCompanyFields,
            populate: [{
                path: 'industries',
                model: 'industries',
                select: query.industriesfields
            },
            {
                path: 'tasksCategory',
                model: 'taskCategories',
                select: query.taskCategoriesfields
            }]
        })
        .populate({
            path: 'individualTasker',
            select: query.individualTaskerFields,
            populate: [{
                path: 'assessmentAttempts',
                model: 'assessmentAttempts',
                select: query.assessmentAttemptsfields
            }]
        })
        /* .populate('individualTasker', query.individualTaskerFields) */
        
        return taskers;
        

    },

    skippedTheTest: async (query) => {
        console.log("findTaskerById HelperFunction is called");
        
        const tasker = await Tasker.findOne(query.critarion)
        tasker.skippedTest = true
        let result = await tasker.save()
        
        return result
        

    },

    addSkillToTasker: async (query) => {
        console.log("findTaskerById HelperFunction is called");
        
        const tasker = await Tasker.findOne(query.critarion)
        tasker.taskerSkills.push(query.skillId)
        let result = await tasker.save()
        
        return result
        

    },

    

};
