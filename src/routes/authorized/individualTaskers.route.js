/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').individualTaskers

router.post('/createIndividualTasker', permit(['_a']), controller.createIndividualTasker)
router.post('/getIndividualTaskersWithFullDetails', permit(['_a']), controller.getIndividualTaskersWithFullDetails)
router.post('/updateIndividualTasker', permit(['_a']), controller.updateIndividualTasker)
router.post('/removeIndividualTasker', permit(['_a']), controller.removeIndividualTasker)
router.post('/getIndividualTaskersList', permit(['_a']), controller.getIndividualTaskersList)
router.post('/findIndividualTaskerById', permit(['_a']), controller.findIndividualTaskerById)


module.exports = router
