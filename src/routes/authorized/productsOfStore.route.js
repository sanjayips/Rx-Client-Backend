/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').productsOfStore

router.post('/createProductsOfStore', controller.createProductsOfStore)
router.post('/getProductsOfStoresWithFullDetails', controller.getProductsOfStoresWithFullDetails)
router.post('/updateProductsOfStore', controller.updateProductsOfStore)
router.post('/removeProductsOfStore', controller.removeProductsOfStore)
router.post('/getProductsOfStoresList', controller.getProductsOfStoresList)
router.post('/findProductsOfStoreById', controller.findProductsOfStoreById)


module.exports = router
