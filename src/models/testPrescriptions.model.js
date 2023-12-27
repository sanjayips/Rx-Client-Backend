
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var testPrescription = new Schema({
    testName: {
        type: String
    },
    reportFile: {
        type: String
    },
    description: {
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


module.exports = mongoose.model('testPrescriptions', testPrescription);