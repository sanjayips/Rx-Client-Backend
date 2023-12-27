/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').productCategories

router.post('/createcategory', controller.createCategory)
router.post('/getcategories', controller.getCategories)
router.post('/updatecategory', controller.updateCategory)
router.post('/findCategoryById', controller.findCategoryById)
router.post('/removecategory', controller.removeCategory)

module.exports = router
