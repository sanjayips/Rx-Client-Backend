/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskCategories

router.post('/createTaskCategory', permit(['_a']), controller.createTaskCategory)
router.post('/getTaskCategoriesWithFullDetails', permit(['_a']), controller.getTaskCategoriesWithFullDetails)
router.post('/updateTaskCategory', permit(['_a']), controller.updateTaskCategory)
router.post('/removeTaskCategory', permit(['_a']), controller.removeTaskCategory)
router.post('/getTaskCategoriesList', permit(['_a']), controller.getTaskCategoriesList)
router.post('/findTaskCategoryById', permit(['_a']), controller.findTaskCategoryById)


module.exports = router
