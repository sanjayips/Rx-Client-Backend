
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var talentPoolSchema = new Schema({
    sirName: {
        type: String
    },
    first_name: {
        type: String,
        required: true
    },
    first_family_name: {
        type: String
    },
    second_family_name: {
        type: String
    },
    third_family_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String
    },
   
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    currentIndustry: {
        type: String
    },
    positionOfInterest: [{
        type: String
    }],
    dob: {
        type: Date
    },
    cvFile: {
        type: String
    },
    profile_picture_url: {
        type: String
    },
    jobsCategories: [{
        type: String
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


module.exports = mongoose.model('talentPool', talentPoolSchema);