
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

contentSchema = new Schema({
  heading: {
    type: String
  },
  points: [{
    pointType: {
      type: String,
      enum: ['bullet', 'paragraph', 'link']
    },
    pointText: {
      type: String
    },
    linkUrl: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    }
  }],
  
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})


var businessServiceProviderSchema = new Schema({
  email: {
    type: String
  },
  businessName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: [contentSchema],
  address: {
    type: String
  },
  contactNumber: {
    type: String
  },
  website: {
    type: String
  },
  linkAddress: {
    type: String
  },
  socialLink: {
    type: String
  }
});

module.exports = mongoose.model('businessServiceProviders', businessServiceProviderSchema)