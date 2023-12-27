/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tutorials

router.post('/createTutorial', permit(['_a']), controller.createTutorial)
router.post('/getTutorialsWithFullDetails', permit(['_a']), controller.getTutorialsWithFullDetails)
router.post('/updateTutorial', permit(['_a']), controller.updateTutorial)
router.post('/removeTutorial', permit(['_a']), controller.removeTutorial)
router.post('/getTutorialsList', permit(['_a']), controller.getTutorialsList)
router.post('/findTutorialById', permit(['_a']), controller.findTutorialById)


module.exports = router
