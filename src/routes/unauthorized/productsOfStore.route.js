/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()


const controller = require('../../controllers').productsOfStore


router.post('/getProductsWithFullDetailsPublic', controller.getProductsOfStoresWithFullDetails)

router.post('/getProductsListPublic', controller.getProductsOfStoresList)
router.post('/findProductsOfStoreById', controller.findProductsOfStoreById)



module.exports = router
