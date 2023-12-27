var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var ticker = new Schema({
        tickerText: {
            type: String,
            required: true
        },
        logoFile: {
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
        startDate: {
            type: Date
        },
        expiryDate: {
            type: Date
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        usePushEach: true
    }
);

module.exports = mongoose.model('tickers', ticker);