var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var serviceCategoriesSchema = new Schema({
        value: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
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

module.exports = mongoose.model('serviceCategories', serviceCategoriesSchema);