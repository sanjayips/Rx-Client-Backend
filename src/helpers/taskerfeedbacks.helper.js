/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');


const TaskerFeedback = mongoose.model('taskerfeedbacks')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTaskerFeedback: async (data) => {
        console.log("createTaskerFeedback HelperFunction is called");
        const taskerfeedbacks = new TaskerFeedback(data)
        await taskerfeedbacks.save()
        return taskerfeedbacks
        
    },
    getTaskerFeedbacksWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerFeedbacks Model Function called")

        const taskerfeedbackss = await TaskerFeedback.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerfeedbacksssize = taskerfeedbackss.length

        return {
            taskerfeedbackss: taskerfeedbackss,
            count: taskerfeedbacksssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaskerFeedbacksList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerFeedbacks Model Function called")

        const taskerfeedbackss = await TaskerFeedback.find(query.critarion).select(query.fields/* '_id TaskerFeedbackName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskerfeedbacksssize = taskerfeedbackss.length

        return {
            taskerfeedbackss: taskerfeedbackss,
            count: taskerfeedbacksssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTaskerFeedback: async (data) => {
        console.log("updateTaskerFeedback HelperFunction is called");
        const result = await promise.all([TaskerFeedback.findOneAndUpdate({_id: data.taskerfeedbackid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTaskerFeedback: async (data) => {
        console.log("removeTaskerFeedback HelperFunction is called");

        const taskerfeedbacks = await TaskerFeedback.findById(data.id);
        if(taskerfeedbacks == null){
             var error = "TaskerFeedback does not exists."
             return error
        }
        taskerfeedbacks.lastModifiedBy = data.lastModifiedBy
        taskerfeedbacks.active = false
        await taskerfeedbacks.save()
        return taskerfeedbacks;
        

    },

    findTaskerFeedbackById: async (query) => {
        console.log("findTaskerFeedbackById HelperFunction is called");
        
        const taskerfeedbacks = await TaskerFeedback.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return taskerfeedbacks;
        

    },

    

};
