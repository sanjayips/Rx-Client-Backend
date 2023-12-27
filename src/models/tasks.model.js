
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var tasksSchema = new Schema({
    task_title: {
        type: String
    },
    taskdate: {
        type: Date
    },
    details: {
        type: String
    },
    videoUrl: {
        type: String
    },
    images: [{
        type: String
    }],
    description: {
        type: String
    },
    jobtype: {
        type: String,
        enum: ["physical", "online"]
    },
    jobstatus: {
        type: String,
        enum: ["active", "scheduled", "completed"]
    },
    budgetestimate: {
        type: Number
    },
    customer: {
        type: String,
        ref: 'users'
    },
    tasker: {
        type: String,
        ref: 'taskers'
    },
    tasksCategory: {
        type: String,
        ref: 'tasksCategory'
    },
    jobsBids: [{
        type: String,
        ref: 'jobBids'
    }],
    jobLocation: {
        type: {
            type: String
        },
        coordinates: [{
            type: Number
        }]
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


module.exports = mongoose.model('tasks', tasksSchema);