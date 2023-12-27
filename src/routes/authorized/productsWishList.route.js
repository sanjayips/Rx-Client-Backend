/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').productsWishLists

router.post('/createProductsWishList', permit(['_a', '_cst']), controller.createProductsWishList)
router.post('/getProductsWishListsWithFullDetails', permit(['_a', '_cst']), controller.getProductsWishListsWithFullDetails)
router.post('/updateProductsWishList', permit(['_a', '_cst']), controller.updateProductsWishList)
router.post('/removeProductsWishList', permit(['_a', '_cst']), controller.removeProductsWishList)
router.post('/getProductsWishListsList', permit(['_a', '_cst']), controller.getProductsWishListsList)
router.post('/findProductsWishListById', permit(['_a', '_cst']), controller.findProductsWishListById)


module.exports = router
