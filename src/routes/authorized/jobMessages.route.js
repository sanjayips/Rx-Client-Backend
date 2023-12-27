/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').jobMessages

router.post('/createJobMessage', permit(['_a', '_ja']), controller.createJobMessage)
router.post('/getJobMessagesWithFullDetails', permit(['_a', '_ja']), controller.getJobMessagesWithFullDetails)
router.post('/updateJobMessage', permit(['_a', '_ja']), controller.updateJobMessage)
router.post('/removeJobMessage', permit(['_a', '_ja']), controller.removeJobMessage)
router.post('/getJobMessagesList', permit(['_a', '_ja']), controller.getJobMessagesList)
router.post('/findJobMessageById', permit(['_a', '_ja']), controller.findJobMessageById)


module.exports = router
