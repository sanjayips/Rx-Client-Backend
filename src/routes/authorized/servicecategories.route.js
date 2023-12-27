/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').servicecategories

router.post('/createServiceCategory', controller.createServiceCategory)

router.post('/updateServiceCategory', controller.updateServiceCategory)
router.post('/removeServiceCategory', controller.removeServiceCategory)
router.post('/getServiceCategorysList', controller.getServiceCategorysList)
router.post('/findServiceCategoryById', controller.findServiceCategoryById)


module.exports = router
