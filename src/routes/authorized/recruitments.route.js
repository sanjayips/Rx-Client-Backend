/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').recruitments

router.post('/createRecruitment', controller.createRecruitment)
router.post('/getRecruitements', controller.getRecruitments)
router.post('/updateRecruitment', controller.updateRecruitment)
router.post('/removeRecruitment', controller.removeRecruitment)
router.post('/findRecruitmentById', controller.findRecruitmentById)
router.post('/addJobsToRecruitment', controller.addJobsToRecruitment)
router.post('/fillJob', controller.fillJob)

module.exports = router;
