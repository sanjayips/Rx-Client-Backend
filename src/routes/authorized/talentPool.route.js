/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').talentPool

router.post('/createTalentPool', permit(['_a']), controller.createTalentPool)
router.post('/getTalentPoolsWithFullDetails', permit(['_a']), controller.getTalentPoolsWithFullDetails)
router.post('/updateTalentPool', permit(['_a']), controller.updateTalentPool)
router.post('/removeTalentPool', permit(['_a']), controller.removeTalentPool)
router.post('/getTalentPoolsList', permit(['_a']), controller.getTalentPoolsList)
router.post('/findTalentPoolById', permit(['_a']), controller.findTalentPoolById)


module.exports = router
