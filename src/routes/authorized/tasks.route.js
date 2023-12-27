/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tasks

router.post('/createTask', permit(['_a']), controller.createTask)
router.post('/getTasksWithFullDetails', permit(['_a']), controller.getTasksWithFullDetails)
router.post('/updateTask', permit(['_a']), controller.updateTask)
router.post('/removeTask', permit(['_a']), controller.removeTask)
router.post('/getTasksList', permit(['_a']), controller.getTasksList)
router.post('/findTaskById', permit(['_a']), controller.findTaskById)


module.exports = router
