
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var taskerSkillsListSchema = new Schema({
    skillname: {
        type: String
    },
    industry: {
        type: String,
        ref: 'industries'
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


module.exports = mongoose.model('taskerSkillsList', taskerSkillsListSchema);