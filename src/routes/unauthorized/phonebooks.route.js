/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').phonebooks

router.post('/getPhoneBooksWithFullDetailsPublic', controller.getPhoneBooksWithFullDetailsPublic)



module.exports = router
