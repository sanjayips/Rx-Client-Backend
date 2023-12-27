/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').talentPool

router.post('/createTalentPoolPublic', controller.createTalentPool)


module.exports = router
