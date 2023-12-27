
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var medicinePrescription = new Schema({
    medicine: {
        type: String
    },
    noOfDaysUsage: {
        type: String
    },
    dialyDosage: {
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


module.exports = mongoose.model('medicinePrescriptions', medicinePrescription);