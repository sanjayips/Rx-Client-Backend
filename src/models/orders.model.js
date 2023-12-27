
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var order = new Schema({
    products: {
        type: String,
        ref: 'products'
    },
    customer: {
        type: String,
        ref: 'customers'
    },
    saleDate: {
        type: Date
    },
    orderStatus: {
        type: String,
        enum: ["draft" , "pending" , "confirmed" , "closed" , "void" , "onhold" , "cancelled"]
},
    invoicedStatus: {
    type: String,
    enum: [null , "partially_invoiced" , "invoiced" , "paid"]
},
    paidStatus: {
    type: String,
    enum: [null , "unpaid" , "partially_paid" , "paid"]
},
    shippedStatus: {
    type: String,
    enum: [null , "pending" , "partially_shipped" , "shipped" , "fulfilled"]
},
    refundStatus: {
    type: String,
    enum: [null , "refund_pending" , "partially_refunded" , "refunded"]
},
    returnStatus: {
    type: String,
    enum: [null , "initiated" , "partially_returned" , "returned"]
},
    returnShipmentStatus: {
    type: String,
    enum: [null , "receive_pending" , "partially_received" , "received"]
},
    referenceNumber: {
    type: String
},
    shipmentDate: {
    type: Date
},
    shipmentDays: {
    type: String
},
    currency: {
    type: String
},
    totalBill: {
    type: String
},
    shipmentCharges: {
    type: String
},
    taxCharges: {
    type: String
},
    shippingZone: {
    type: String,
    ref: 'shippingZone'
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


module.exports = mongoose.model('orders', order);