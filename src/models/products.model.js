
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var product = new Schema({
    productTitle: {
        type: String
    },
    variants: [
        {
            type: String,
            ref: 'variants'
        }
    ],
    productCategories: [
        {
            type: String,
            ref: 'productCategories'
        }
    ],
    
    productDescritpion: {
        type: String
    },
    showInStoreFront: {
        type: Boolean,
        default: true
    },
    
    tags: [
        {
            type: String
        }
    ],
    brand: {
        type: String
    },
    isReturnable: {
        type: Boolean,
        defulat: false
    },
    isFeatured: {
        type: Boolean,
        defulat: false
    },
    rate: {
        type: String
    },
    initialStock: {
        type: Number
    },
    sku: {
        type: String
    },
    lowStockLimit: {
        type: Number
    },
    packageDetails: {
        height: {
            type: String
        },
        weight: {
            type: String
        },
        width: {
            type: String
        },
        length: {
            type: String
        }
    },
    ean: {
        type: String
    },
    upc: {
        type: String
    },
    mpn: {
        type: String
    },
    isbn: {
        type: String
    },
    productImagesURLs: [
        {
            type: String
        }
    ],
    salePrice: {
        type: String
    },
    isOnSale: {
        type: Boolean,
        defualt: false
    },
    active: {
        type: Boolean,
        defualt: false
    },
    store: {
        type: String,
        required: true,
        ref: 'stores'
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    }
)


module.exports = mongoose.model('products', product);