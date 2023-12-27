var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp')

var recruitementSchema = new Schema({
  recruitmentName: {
    type: String,
    required: true
  },
  startedBy: {
    type: String,
    required: true,
    ref: 'users'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  totalJobsCount: {
    type: Number,
    default: 0
  },
  filledJobsCount: {
    type: Number,
    required: true,
    default: 0
  },
  openJobs: [{
    type: String,
    ref: "jobs"
  }],
  filledJobs: [{
    type: String,
    ref: "jobs"
  }],
  status: {
    type: String,
    required: true,
    enum: ['inprogress', 'pending', 'completed', 'cancelled']
  }
});

recruitementSchema.plugin(timestamps);
const recruitmentsModel = mongoose.model("recruitments", recruitementSchema);

module.exports = recruitmentsModel;