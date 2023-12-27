var mongoose = require('mongoose')
const {employees} = require("./index")
var timestamps = require('mongoose-timestamp')

var Schema = mongoose.Schema;
var userVerificationSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        emailverificationcode: {
            type: String
        },
        phonenumber: {
            type: String
        },
        phoneverificationcode: {
            type: String
        },
        emailverified: {
            type: Boolean,
            default: false
        },
        
        phoneverified: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        }
    }
);

userVerificationSchema.plugin(timestamps)
module.exports = mongoose.model('userverifications', userVerificationSchema);