/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').diseases

router.post('/createDisease', permit(['_a']), controller.createDisease)
router.post('/getDiseasesWithFullDetails', permit(['_a']), controller.getDiseasesWithFullDetails)
router.post('/updateDisease', permit(['_a']), controller.updateDisease)
router.post('/removeDisease', permit(['_a']), controller.removeDisease)
router.post('/getDiseasesList', permit(['_a']), controller.getDiseasesList)
router.post('/findDiseaseById', permit(['_a']), controller.findDiseaseById)


module.exports = router
