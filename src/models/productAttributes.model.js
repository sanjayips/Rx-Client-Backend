
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var productAttribute = new Schema({
    attributeTitle: {
        type: String,
        required: true
    },
    options: [{
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


module.exports = mongoose.model('productAttributes', productAttribute);