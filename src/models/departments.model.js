var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var departments = new Schema({
        departmentName: {
            type: String,
            required: true
        },
        departmentCode: {
            type: String
        },
        employees: [{
            type: String,
            ref: "users"
        }],
        description: {
            type: String
        },
        addedby: {
            type: String,
            ref: 'users'
        },
        departmentHead: {
            type: String,
            ref: 'users'
        },
        lastModifiedBy: {
            type: String,
            ref: 'users'
        },
        active: {
            type: Boolean,
            default: true
        },
        assets: []
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        usePushEach: true
    }
);

module.exports = mongoose.model('departments', departments);