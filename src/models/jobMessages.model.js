
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var jobMessagesSchema = new Schema({
    applicant: {
        type: String,
        ref: 'users'
    },
    job: {
        type: String,
        ref: 'jobs'
    },
    jobMessageBody: {
        type: String
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


module.exports = mongoose.model('jobMessages', jobMessagesSchema);