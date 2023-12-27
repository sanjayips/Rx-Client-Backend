/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').phonebooks

router.post('/createPhoneBook', controller.createPhoneBook)
router.post('/getPhoneBooksWithFullDetails', controller.getPhoneBooksWithFullDetails)
router.post('/updatePhoneBook', controller.updatePhoneBook)
router.post('/removePhoneBook', controller.removePhoneBook)
router.post('/getPhoneBooksList', controller.getPhoneBooksList)
router.post('/findPhoneBookById', controller.findPhoneBookById)


module.exports = router
