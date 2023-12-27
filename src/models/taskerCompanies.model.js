
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var taskerCompaniesSchema = new Schema({
  businessName: {
    type: String
  },
  industries: [{
    type: String,
    ref: "industries"
  }],
  tasksCategory: [{
    type: String,
    ref: "taskCategories"
  }],
  assessmentAttempts: {
    type: String,
    ref: "assessmentAttempts"
  },
  businessProtfolioUrl: {
    type: String
  },
  businessLogoUrl: {
    type: String
  },
  aboutMe: {
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


module.exports = mongoose.model('taskerCompanies', taskerCompaniesSchema)