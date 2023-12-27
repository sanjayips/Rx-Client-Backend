
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var jobBidsSchema = new Schema({
    bider: {
        type: String,
        ref: 'users'
      },
      details: {
        type: String
      },
      bidAmount: {
        type: Number
      },
      bidDate: {
        type: Date
      },
      completionTImeBid: {
        type: String
      },
      hourlyRateBid: {
        type: String
      },
    active: {
        type: Boolean
    },
    jobawarded: {
        type: Boolean
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


module.exports = mongoose.model('jobBids', jobBidsSchema)