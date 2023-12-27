/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')



const Order = mongoose.model('orders')

//bluebird for promises
const promise = require('bluebird')

//helper functions
logger = require("./logger")

module.exports = {

    createOrder: async (data) => {
        console.log("createOrder HelperFunction is called")
        const order = new Order(data)
        await order.save()
        return order

    },
    getOrdersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getOrders Model Function called")

        const orders = await Order.find(query.critarion)

            .populate('addedby', query.addedby)

            .populate('lastModifiedBy', query.lastModifiedBy)
            .populate('products', query.products)
            //.populate('shippingZone', query.shippingZone)
            .populate({
                path: 'customer',
                select: query.customer,
                populate: {
                    path: 'user',
                    model: 'users',
                    select: query.userfields
                }
            })
            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const orderssize = orders.length

        return {
            orders: orders,
            count: orderssize,
            offset: offset,
            limit: limit
        }

    },

    getOrdersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getOrders Model Function called")

        const orders = await Order.find(query.critarion).select(query.fields/* '_id OrderName' */)

            .sort({ [sortProperty]: sortOrder })
            .skip(offset)
            .limit(limit)

        const orderssize = orders.length

        return {
            orders: orders,
            count: orderssize,
            offset: offset,
            limit: limit
        }

    },

    updateOrder: async (data) => {
        console.log("updateOrder HelperFunction is called")
        const result = await promise.all([Order.findOneAndUpdate({ _id: data.orderid }, data, { new: true })])
        //const result = await order.findOneAndUpdate({_id: data.orderid}, data, {new: true})

        return result

    },



    removeOrder: async (data) => {
        console.log("removeOrder HelperFunction is called")

        const order = await Order.findById(data.id)
        if (order == null) {
            var error = "Order does not exists."
            return error
        }
        order.lastModifiedBy = data.lastModifiedBy
        order.active = false
        await order.save()
        return order


    },

    findOrderById: async (query) => {
        console.log("findOrderById HelperFunction is called")

        const order = await Order.findOne(query.critarion)
            .populate('addedby', query.addedby)
            .populate('lastModifiedBy', query.lastModifiedBy)
            .populate('products', query.products)
            //.populate('shippingZone', query.shippingZone)
            .populate({
                path: 'customer',
                select: query.customer,
                populate: {
                    path: 'user',
                    model: 'users',
                    select: query.userfields
                }
            })

        return order


    },



}
