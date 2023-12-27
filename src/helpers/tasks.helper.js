/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Task = mongoose.model('tasks')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTask: async (data) => {
        console.log("createTask HelperFunction is called");
        const tasks = new Task(data)
        await tasks.save()
        return tasks
        
    },
    getTasksWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTasks Model Function called")

        const taskss = await Task.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tasksssize = taskss.length

        return {
            taskss: taskss,
            count: tasksssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTasksList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTasks Model Function called")

        const taskss = await Task.find(query.critarion).select(query.fields/* '_id TaskName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tasksssize = taskss.length

        return {
            taskss: taskss,
            count: tasksssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTask: async (data) => {
        console.log("updateTask HelperFunction is called");
        const result = await promise.all([Task.findOneAndUpdate({_id: data.tasksid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTask: async (data) => {
        console.log("removeTask HelperFunction is called");

        const tasks = await Task.findById(data.id);
        if(tasks == null){
             var error = "Task does not exists."
             return error
        }
        tasks.lastModifiedBy = data.lastModifiedBy
        tasks.active = false
        await tasks.save()
        return tasks;
        

    },

    findTaskById: async (query) => {
        console.log("findTaskById HelperFunction is called");
        
        const tasks = await Task.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tasks;
        

    },

    

};
