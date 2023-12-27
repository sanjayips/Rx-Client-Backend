
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var industriesSchema = new Schema({
    industryName: {
        type: String
    },
    industryType: {
        type: String
    },
    description: {
        type: String
    },
    questions: [{
        type: String,
        ref: "questions"
    }],
    attemptsLimit: {
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


module.exports = mongoose.model('industries', industriesSchema)