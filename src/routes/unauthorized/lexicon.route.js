/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').lexicons

router.post('/getLexiconsWithFullDetailsPublic', controller.getLexiconsWithFullDetailsPublic)



module.exports = router
