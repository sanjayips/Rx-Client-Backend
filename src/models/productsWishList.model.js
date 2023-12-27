
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var productsWishListSchema = new Schema({
    wishListName: {
        type: String
    },
    wishListItems: [{
        type: String,
        ref: "productsOfStore"
    }],
    user: {
        type: String,
        ref: 'users'
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


module.exports = mongoose.model('productsWishLists', productsWishListSchema);