
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var taskersSchema = new Schema({
    user: {
        type: String,
        ref: 'users'
    },
    skippedTest: {
        type: Boolean,
        default: true
    },
    hourlyrate: {
        type: Number
    },
    hourlyRateCurrency: {
        type: String
    },
    experience: {
        type: String
    },
    taskfeedbacks: [{
        type: String,
        ref: "taskerfeedbacks"
    }],
    taskerSkills: [{
        type: String,
        ref: "taskerSkills"
    }],
    tasksassigned: {
        type: Number
    },
    taskscompleted: {
        type: Number
    },
    completionrate: {
        type: Number
    },
    taskerCompany: {
        type: String,
        ref: 'taskerCompanies'
    },
    individualTasker: {
        type: String,
        ref: 'individualTaskers'
    },
    isIndividual: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    jobawarded: {
        type: Boolean
    },
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    }
    ,
    lastModifiedBy: {
        type: String,
        ref: 'users'
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    }
)


module.exports = mongoose.model('taskers', taskersSchema)