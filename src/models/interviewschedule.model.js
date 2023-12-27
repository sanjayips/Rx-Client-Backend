/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 2);
var timestamps = require('mongoose-timestamp');

const interviewScheduleSchema = new Schema({
  interviewTitle: {
    type:String,
  },
  interviewForJob: {
    type:String,
    ref: "jobs"
  },
  jobApplicant: {
    type:String,
    ref: "users"
  },
  interviewers: [{
    type:String,
    ref: "users"
  }],
  interviewType: {
    type:String,
    enum: ["remote", "onsite"]
  },
  interviewStatus: {
    type:String,
    enum: ["scheduled", "pending", "incomplete", "completed"]
  },
  zoomMeeting: {
    type:String,
    ref: 'zoommeetings'
  },
  interviewPhysicalAddress: {
    type:String,
  },
  interviewMarks: {
    type:String,
  },
  interviewDateTime: {
    type:Date,
  },
  description: {
    type:String,
  },
  applicantSelected: {
    type: Boolean,
    default: false
  },

  
});




interviewScheduleSchema.plugin(timestamps);
const categoriesModel = mongoose.model("interviews", interviewScheduleSchema);

module.exports = categoriesModel;
