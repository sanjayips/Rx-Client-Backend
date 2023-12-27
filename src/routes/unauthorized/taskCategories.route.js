/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()


const controller = require('../../controllers').taskCategories

router.post('/getTaskCategoriesList', controller.getTaskCategoriesList)

module.exports = router
