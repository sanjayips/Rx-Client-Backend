/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TaskerSkill = mongoose.model('taskerSkills')

//bluebird for promises
const promise = require('bluebird')

//helper functions
logger = require("./logger")

module.exports = {

    createTaskerSkill: async (data) => {
        console.log("createTaskerSkill HelperFunction is called")
        const taskerSkill = new TaskerSkill(data)
        await taskerSkill.save()
        return taskerSkill

    },
    getTaskerSkillsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerSkills Model Function called")

        const taskerSkills = await TaskerSkill.find(query.critarion)

            .populate('addedby', query.addedby)

            .populate('lastModifiedBy', query.lastModifiedBy)
            
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const taskerSkillssize = taskerSkills.length

        return {
            taskerSkills: taskerSkills,
            count: taskerSkillssize,
            offset: offset,
            limit: limit
        }

    },

    getTaskerSkillsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskerSkills Model Function called")

        const taskerSkills = await TaskerSkill.find(query.critarion).select(query.fields/* '_id TaskerSkillName' */)

            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const taskerSkillssize = taskerSkills.length

        return {
            taskerSkills: taskerSkills,
            count: taskerSkillssize,
            offset: offset,
            limit: limit
        }

    },

    updateTaskerSkill: async (data) => {
        console.log("updateTaskerSkill HelperFunction is called")
        const result = await promise.all([TaskerSkill.findOneAndUpdate({ _id: data.taskerSkillid }, data, { new: true })])
        //const result = await taskerSkill.findOneAndUpdate({_id: data.taskerSkillid}, data, {new: true})

        return result

    },



    removeTaskerSkill: async (data) => {
        console.log("removeTaskerSkill HelperFunction is called")

        const taskerSkill = await TaskerSkill.findById(data.id)
        if (taskerSkill == null) {
            var error = "TaskerSkill does not exists."
            return error
        }
        taskerSkill.lastModifiedBy = data.lastModifiedBy
        taskerSkill.active = false
        await taskerSkill.save()
        return taskerSkill


    },

    findTaskerSkillById: async (query) => {
        console.log("findTaskerSkillById HelperFunction is called")

        const taskerSkill = await TaskerSkill.findOne(query.critarion)
            .populate('addedby', query.addedby)
            .populate('lastModifiedBy', query.lastModifiedBy)
            

        return taskerSkill


    },



}
