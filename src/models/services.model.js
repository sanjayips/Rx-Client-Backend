var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var mongoose = require('mongoose');
var servicesSchema = mongoose.Schema;
var servicesSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  serviceCountry: {
    type: String
  },
  serviceCity: {
    type: String
  },
  serviceLocation: {
    type: {
      type: String
    },
    coordinates: [{
      type: Number
    }]
  },
  serviceProviderUser: {
    type: String,
    ref: 'users'
  },
  isIndividual: {
    type: Boolean,
    required: true,
    default: false
  },
  isApproved: {
    type: Boolean,
    
    default: false
  },
  category: {
    type: String,
    required: true
  },
  individualServiceProvider: {
    type: String,
    ref: 'individualServiceProviders'
  },
  businessServiceProvider: {
    type: String,
    ref: 'businessServiceProviders'
  },
  distances: []
});

servicesSchema.index({ "serviceLocation": "2dsphere" })
servicesSchema.on('index', function (err) {
    if (err) {
        console.error('User index error: %s', err)
    } else {
        console.info('User indexing complete')
    }
})
module.exports = mongoose.model('services', servicesSchema)
