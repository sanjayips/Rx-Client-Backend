
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var productsOfStoreSchema = new Schema({
    nameofProduct: {
        type: String
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    section: {
        type: String
    },
    productLink: {
        type: String
    },
    titleofProduct: {
        type: String
    },
    price: {
        type: String
    },
    currency: {
        type: String
    },
    description: {
        type: String
    },
    pictureLink1: {
        type: String
    },
    pictureLink2: {
        type: String
    },
    pictureLink3: {
        type: String
    },
    pictureLink4: {
        type: String
    },
    pictureLink5: {
        type: String
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


module.exports = mongoose.model('productsOfStore', productsOfStoreSchema);