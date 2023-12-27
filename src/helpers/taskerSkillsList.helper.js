/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')


const TaskerSkillsList = mongoose.model('taskerSkillsList')

//bluebird for promises
const promise = require('bluebird')

//helper functions
logger = require("./logger")

module.exports = {

    createTaskerSkillsList: async (data) => {
        console.log("createTaskerSkillsList HelperFunction is called")
        const taskerSkillsList = new TaskerSkillsList(data)
        await taskerSkillsList.save()
        return taskerSkillsList

    },
    getTaskerSkillsListWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerSkillsList Model Function called")

        const taskerSkillsList = await TaskerSkillsList.find(query.critarion)

            .populate('addedby', query.addedby)

            .populate('lastModifiedBy', query.lastModifiedBy)
            
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const taskerSkillsListsize = taskerSkillsList.length

        return {
            taskerSkillsList: taskerSkillsList,
            count: taskerSkillsListsize,
            offset: offset,
            limit: limit
        }

    },

    getTaskerSkillsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerSkillsList Model Function called")

        const taskerSkillsList = await TaskerSkillsList.find(query.critarion).select(query.fields/* '_id TaskerSkillName' */)

            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const taskerSkillsListsize = taskerSkillsList.length

        return {
            taskerSkillsList: taskerSkillsList,
            count: taskerSkillsListsize,
            offset: offset,
            limit: limit
        }

    },

    updateTaskerSkillsList: async (data) => {
        console.log("updateTaskerSkillList HelperFunction is called")
        const result = await promise.all([TaskerSkillsList.findOneAndUpdate({ _id: data.taskerSkillid }, data, { new: true })])
        //const result = await taskerSkill.findOneAndUpdate({_id: data.taskerSkillid}, data, {new: true})

        return result

    },



    removeTaskerSkillsList: async (data) => {
        console.log("removeTaskerSkillsList HelperFunction is called")

        const taskerSkillsList = await TaskerSkillsList.findById(data.id)
        if (taskerSkillsList == null) {
            var error = "TaskerSkillsList does not exists."
            return error
        }
        taskerSkillsList.lastModifiedBy = data.lastModifiedBy
        taskerSkillsList.active = false
        await taskerSkillsList.save()
        return taskerSkillsList


    },

    findTaskerSkillsListById: async (query) => {
        console.log("findTaskerSkillsListById HelperFunction is called")

        const taskerSkillsList = await TaskerSkillsList.findOne(query.critarion)
            .populate('addedby', query.addedby)
            .populate('lastModifiedBy', query.lastModifiedBy)
            

        return taskerSkillsList


    },



}
