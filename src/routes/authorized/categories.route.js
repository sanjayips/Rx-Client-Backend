/**
 * Created by Jamshaid.
 */
 
const express = require('express');
const router = express.Router();

const controller = require('../../controllers').jobCategories;

router.post('/createcategory', controller.createCategory);
router.post('/getcategories', controller.getCategories);
router.post('/updatecategory', controller.updateCategory);
router.post('/removecategory', controller.removeCategory);

module.exports = router;
