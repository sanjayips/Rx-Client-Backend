/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskerSkillsList

router.post('/createTaskerSkillsListItem', permit(['_a']), controller.createTaskerSkillsList)
router.post('/getTaskerSkillsListWithFullDetails', permit(['_a']), controller.getTaskerSkillsListWithFullDetails)
router.post('/updateTaskerSkillsListItem', permit(['_a']), controller.updateTaskerSkillsList)
router.post('/removeTaskerSkillsItemList', permit(['_a']), controller.removeTaskerSkillsList)
router.post('/getTaskerSkillsList', permit(['_a']), controller.getTaskerSkillsList)
router.post('/findTaskerSkillsListItemById', permit(['_a']), controller.findTaskerSkillsListById)


module.exports = router
