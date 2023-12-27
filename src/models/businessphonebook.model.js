var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var businessPhoneBook = new Schema({
        businessPhoneBookText: {
            type: String,
            required: true
        },
        logoFile: {
            type: String
        },
        tickers: [{
            type: String,
            ref: 'tickers'
        }],
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

module.exports = mongoose.model('businessPhoneBooks', businessPhoneBook);