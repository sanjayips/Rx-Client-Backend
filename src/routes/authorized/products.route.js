/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').products

router.post('/createProduct', permit(['_a']), controller.createProduct)
router.post('/getProductsWithFullDetails', permit(['_a']), controller.getProductsWithFullDetails)
router.post('/updateProduct', permit(['_a']), controller.updateProduct)
router.post('/removeProduct', permit(['_a']), controller.removeProduct)
router.post('/getProductsList', permit(['_a']), controller.getProductsList)
router.post('/findProductById', permit(['_a']), controller.findProductById)
router.post('/deleteProductImages', permit(['_a']), controller.deleteProductImages)
router.post('/addImagesToProducts', permit(['_a']), controller.addImagesToProducts)


module.exports = router
