
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var variant = new Schema({
    variantTitle: {
        type: String
      },
    attributes: [{
        type: String,
        ref: "productAttributes"
      }],
      status: {
        type: String,
        enum: ["available", "notavailable", "intransit"]
      },
      quantity: {
        type: Number
      },
      sellingPrice: {
        type: Number
      },
      active: {
        type: Boolean,
        default: false
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


module.exports = mongoose.model('variants', variant);