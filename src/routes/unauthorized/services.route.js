/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').services


router.post('/locateAllServices', controller.locateAllServices)
router.post('/findServiceById', controller.findServiceById)
router.post('/createService', controller.createService)

module.exports = router
