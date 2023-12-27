/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskerSkills

router.post('/createTaskerSkill', permit(['_a']), controller.createTaskerSkill)
router.post('/getTaskerSkillsWithFullDetails', permit(['_a']), controller.getTaskerSkillsWithFullDetails)
router.post('/updateTaskerSkill', permit(['_a']), controller.updateTaskerSkill)
router.post('/removeTaskerSkill', permit(['_a']), controller.removeTaskerSkill)
router.post('/getTaskerSkillsList', permit(['_a']), controller.getTaskerSkillsList)
router.post('/findTaskerSkillById', permit(['_a']), controller.findTaskerSkillById)


module.exports = router
