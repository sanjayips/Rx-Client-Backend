/**
 * Created by Jamshaid.
 */
 
const express = require('express');
const router = express.Router();

const controller = require('../../controllers').jobCategories;


router.post('/getcategoriesPublic', controller.getCategories)


module.exports = router;
