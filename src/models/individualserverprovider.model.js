
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

var individualServiceProviderSchema = new Schema({
  user: {
    type: String,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  content: [contentSchema],
  email: {
    type: String
  },
  availableForJob: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String
  },
  category: {
    type: String
  },
  contactNo: {
    type: String
  },
  address: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  website: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  linkedin: {
    type: String
  },
  dpImageUrl: {
    type: String,
   
    default: '/uploads/dp/default.png'
  },
  appointments: [{
    type: String,
    required: true
  }],
  qualifications: [{
    qualificationName: {
      type: String,
      required: true
    },
    institute: {
      type: String
    },
    year: {
      type: String
    },
    grade: {
      type: String
    },
    gradeType: {
      type: String
    }
  }],
  
})

module.exports = mongoose.model('individualServiceProviders', individualServiceProviderSchema)