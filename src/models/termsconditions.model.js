var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var termsconditionSchema = new Schema({
        description: {
            type: String,
            required: true
        },
       
        termsDate: {
            type: String
        },
        addedby: {
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
        }
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        usePushEach: true
    }
);

module.exports = mongoose.model('termsconditions', termsconditionSchema);