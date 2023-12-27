/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()


const controller = require('../../controllers').products


router.post('/getProductsWithFullDetailsPublic', controller.getProductsWithFullDetails)

router.post('/getProductsListPublic', controller.getProductsList)
router.post('/findProductByIdPublic', controller.findProductById)


module.exports = router
