
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var taskerfeedbacksSchema = new Schema({
    tasker: {
        type: String,
        ref: 'taskers'
    },
    feedbackby: {
        type: String,
        ref: 'users'
    },
    task: {
        type: String,
        ref: 'tasks'
    },
    feeback: {
        type: String
    },
    stars: {
        type: Number
    },
    
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    },
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


module.exports = mongoose.model('taskerfeedbacks', taskerfeedbacksSchema)