
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var customer = new Schema({
    dob: {
        type: Date
    },
    user: {
        type: String,
        ref: 'users'
    },
    ssn: {
        type: String
    },
    homeAddress: {
        type: String
    },
    homePhone: {
        type: String
    },
    workPhone: {
        type: String
    },
    occupation: {
        type: String
    },
    emergencyContantName: {
        type: String
    },
    emergencyContactRelation: {
        type: String
    },
    emergencyContactPhone: {
        type: String
    },
    familyDoctorName: {
        type: String
    },
    referringDoctorName: {
        type: String
    },
    doctorAddress: {
        type: String
    },
    doctorPhone: {
        type: String
    },
    doctorFax: {
        type: String
    },
    otherReferralSource: {
        type: String
    },
    medicalCards: [{
        type: String,
        ref: 'medicalCards'
    }],
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


module.exports = mongoose.model('customers', customer);