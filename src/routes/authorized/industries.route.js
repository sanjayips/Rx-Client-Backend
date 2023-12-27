/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').industries

router.post('/createIndustry', permit(['_a']), controller.createIndustry)
router.post('/getIndustriesWithFullDetails', permit(['_a']), controller.getIndustriesWithFullDetails)
router.post('/updateIndustry', permit(['_a']), controller.updateIndustry)
router.post('/removeIndustry', permit(['_a']), controller.removeIndustry)
router.post('/getIndustriesList', permit(['_a']), controller.getIndustriesList)
router.post('/findIndustryById', permit(['_a']), controller.findIndustryById)


module.exports = router
