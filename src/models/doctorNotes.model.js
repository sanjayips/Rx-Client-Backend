
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var doctorNote = new Schema({
    note:{
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
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    usePushEach: true
}
)


module.exports = mongoose.model('doctorNotes', doctorNote);