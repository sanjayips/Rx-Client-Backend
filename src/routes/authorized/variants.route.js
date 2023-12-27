/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').variants

router.post('/createVariant', permit(['_a']), controller.createVariant)
router.post('/getVariantsWithFullDetails', permit(['_a']), controller.getVariantsWithFullDetails)
router.post('/updateVariant', permit(['_a']), controller.updateVariant)
router.post('/removeVariant', permit(['_a']), controller.removeVariant)
router.post('/getVariantsList', permit(['_a']), controller.getVariantsList)
router.post('/findVariantById', permit(['_a']), controller.findVariantById)


module.exports = router
