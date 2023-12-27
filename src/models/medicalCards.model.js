
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var medicalCard = new Schema({
    dateOfIssuance: {
        type: Date
    },
    validTillDate: {
        type: Date
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


module.exports = mongoose.model('medicalCards', medicalCard);