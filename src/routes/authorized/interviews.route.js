/**
 * Created by Jamshaid.
 */
 
const express = require('express');
const router = express.Router();

const controller = require('../../controllers').interviews;

router.post('/createInterview', controller.createInterview);
router.post('/getInterviews', controller.getInterviews);
router.post('/updateInterview', controller.updateInterview);
router.post('/removeInterview', controller.removeInterview);

module.exports = router;
