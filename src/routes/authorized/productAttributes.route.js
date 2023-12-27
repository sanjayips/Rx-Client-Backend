/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').productAttributes

router.post('/createProductAttributes', permit(['_a']), controller.createProductAttributes)
router.post('/getProductAttributessWithFullDetails', permit(['_a']), controller.getProductAttributessWithFullDetails)
router.post('/updateProductAttributes', permit(['_a']), controller.updateProductAttributes)
router.post('/removeProductAttributes', permit(['_a']), controller.removeProductAttributes)
router.post('/getProductAttributessList', permit(['_a']), controller.getProductAttributessList)
router.post('/findProductAttributesById', permit(['_a']), controller.findProductAttributesById)


module.exports = router
