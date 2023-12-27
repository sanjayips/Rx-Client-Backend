/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskers

router.post('/createTasker', permit(['_a', '_indvtskr', '_cmpntskr']), controller.createTasker)
router.post('/getTaskersWithFullDetails', permit(['_a', '_indvtskr', '_cmpntskr']), controller.getTaskersWithFullDetails)
router.post('/updateTasker', permit(['_a', '_indvtskr', '_cmpntskr']), controller.updateTasker)
router.post('/removeTasker', permit(['_a', '_indvtskr', '_cmpntskr']), controller.removeTasker)
router.post('/getTaskersList', permit(['_a', '_indvtskr', '_cmpntskr']), controller.getTaskersList)
router.post('/findTaskerById', permit(['_a', '_indvtskr', '_cmpntskr']), controller.findTaskerById)
router.post('/skippedTest', permit(['_a', '_indvtskr', '_cmpntskr']), controller.skippedTheTest)
router.post('/addSkillToTasker', permit(['_a', '_indvtskr', '_cmpntskr']), controller.addSkillToTasker)


module.exports = router
