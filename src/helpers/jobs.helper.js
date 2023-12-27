
//import mongoose and models
var mongoose = require('mongoose')
var Job = mongoose.model('jobs')
var User = mongoose.model('users')
//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//helper functions
logger = require("../helpers/logger")

const constants = require("../hardCodedData").constants
module.exports = {


    createJob: async (data) => {
        console.log("createJob HelperFunction is called")
        const job = new Job(data)
        await job.save()
        return job

    },

    addApplicant: async (data) => {
        console.log("addApplicant HelperFunction is called")
        var userwhere = { _id: data.userid }
        let extnguser = await User.findOne(userwhere)
       
        const index = extnguser.savedJobs.indexOf(data.jobid); // Find the index of the element to remove
        if (index !== -1) { // Make sure the element exists in the array
            extnguser.savedJobs.splice(index, 1); // Remove the element at the found index
            await extnguser.save()
        }


        var where = { _id: data.jobid }
        const job = await Job.findOne(where)

        const approvedapplicantindex = job.approvedApplicants.indexOf(data.userid); // Find the index of the element to remove
        if (approvedapplicantindex !== -1) { // Make sure the element exists in the array
            return "already applied and approved"
        }

        if (!job.applicants.includes(data.userid)) {
            job.applicants.push(data.userid)

            await job.save()
            return job
        } else {
            return "already applied"
        }



    },

    addApprovedApplicant: async (data) => {
        console.log("addApprovedApplicant HelperFunction is called")

        var where = { _id: data.jobid }
        const job = await Job.findOne(where)
       
        const index = job.applicants.indexOf(data.userid); // Find the index of the element to remove
        if (index !== -1) { // Make sure the element exists in the array
            job.applicants.splice(index, 1); // Remove the element at the found index
        }


        

        if (!job.approvedApplicants.includes(data.userid)) {
            job.approvedApplicants.push(data.userid)
            await job.save()
            return job
        } else {
            return "already added to approved applicants"
        }



    },
    addInterviews: async (data) => {
        console.log("addInterviews HelperFunction is called")
        var where = { _id: data.jobid }
        const job = await Job.findOne(where)

        job.interviews.push(data.interviewid)

        await job.save()
        return job

    },
    addSelectedApplicant: async (data) => {
        console.log("addSelectedApplicant HelperFunction is called")
        var where = { _id: data.jobid }
        const job = await Job.findOne(where)

        job.selectedApplicant = data.userid

        await job.save()
        return job

    },

    getApprovedApplicants: async (data) => {
        console.log("addApplicant HelperFunction is called")
        var where = { _id: data.jobid }
        return await Job.findOne(where)
            .populate('approvedApplicants', '_id email first_name phoneNumber')

    },

    getAllJobsWithFullDetails: async (sortProperty, sortOrder = 1, offset = 0, limit = 10, query) => {
        console.log("getAllJobsWithFullDetails HelperFunction is called")
        console.log(query)

        const jobs = await Job.find(query.critarion)
            /* .populate("applicants", query.applicantsFields)
            .populate("approvedApplicants", query.approvedApplicantsFields)
            .populate("interviews", query.interviewsFields)
            .populate("selectedApplicant", query.interviewsFields) */
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        }

    },




    getAllJobs: async (sortProperty, sortOrder = 1, offset = 0, limit = 10) => {
        console.log("getAllJobs HelperFunction is called")


        const jobs = await Job.find()
            //.populate('jobCategory')      
            .populate('applicants')
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        }

    },

    getAllJobsForPublicView: async (sortProperty, sortOrder = 1, offset = 0, limit = 10) => {
        console.log("getAllJobsForPublicView HelperFunction is called")

        var where = { jobstatus: "active" }
        const jobs = await Job.find(where)
            //.populate('jobCategory')            
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        }

    },



    changeJobStatus: async (data) => {
        console.log("changejobstatus HelperFunction is called")

        const job = await Job.findOne({ _id: data.jobid })


        job.jobstatus = data.jobstatus

        return await job.save()
        //return true

    },

    updateJob: async (data) => {
        console.log("updateJob HelperFunction is called")

        return await Job.findOneAndUpdate({ _id: data._id }, data, { new: true })

    },

    findJobById: async (jobid) => {
        console.log("findJobById HelperFunction is called")

        return await Job.findById(jobid)
            .populate('applicants')

    },

    deleteJob: async (data) => {
        console.log("deleteJob HelperFunction is called")
        console.log(data)


        const result = await Job.findByIdAndRemove(data.jobid)


        return result


    },


    getRecommendedJobs: async (sortProperty, sortOrder = 1, offset = 0, limit = 10, query) => {
        console.log("getRecommendedJobs HelperFunction is called")

        let exstUser = await User.findById(query.userid)
        var query = { "jobCategory": { $in: exstUser.jobCategories } }


        const jobs = await Job.find(query)

            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        }

    },

    getSavedJobs: async (query) => {
        console.log("getSavedJobs HelperFunction is called")

        let exstUser = await User.findById(query.userid)
            .populate("savedJobs", query.savedJobsFields)
        return exstUser.savedJobs

    },

    getFavouriteJobs: async (query) => {
        console.log("getSavedJobs HelperFunction is called")

        let exstUser = await User.findById(query.userid)
            .populate("favouriteJobs", query.favouriteJobsFields)



        return exstUser.favouriteJobs

    }








}
