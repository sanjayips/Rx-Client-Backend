/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const TaskCategory = mongoose.model('taskCategories')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTaskCategory: async (data) => {
        console.log("createTaskCategory HelperFunction is called");
        const taskCategory = new TaskCategory(data)
        await taskCategory.save()
        return taskCategory
        
    },
    getTaskCategoriesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskCategory Model Function called")

        const taskCategories = await TaskCategory.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskCategoriessize = taskCategories.length

        return {
            taskCategories: taskCategories,
            count: taskCategoriessize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaskCategoriesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTasks Model Function called")

        const taskCategories = await TaskCategory.find(query.critarion).select(query.fields/* '_id TaskName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskCategoriessize = taskCategories.length

        return {
            taskCategories: taskCategories,
            count: taskCategoriessize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTaskCategory: async (data) => {
        console.log("updateTask HelperFunction is called");
        const result = await promise.all([TaskCategory.findOneAndUpdate({_id: data.taskCategoryid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTaskCategory: async (data) => {
        console.log("removeTaskCategory HelperFunction is called");

        const taskCategory = await TaskCategory.findById(data.id);
        if(taskCategory == null){
             var error = "TaskCategory does not exists."
             return error
        }
        taskCategory.lastModifiedBy = data.lastModifiedBy
        taskCategory.active = false
        await taskCategory.save()
        return taskCategory;
        

    },

    findTaskCategoryById: async (query) => {
        console.log("findTaskCategoryById HelperFunction is called");
        
        const taskCategory = await TaskCategory.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return taskCategory;
        

    },

    

};
