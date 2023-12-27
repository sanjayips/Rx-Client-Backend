/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').uploads

router.post('/uploadSingleFile', permit(['_a']), controller.uploadSingleFile)
router.post('/deleteSingleFile', permit(['_a']), controller.deleteSingleFile)
router.post('/uploadVideoTutorial', permit(['_a']), controller.uploadVideoTutorial)
router.post('/uploadUserDp', permit(['_a']), controller.uploadUserDp)
router.post('/uploadProductImgs', permit(['_a']), controller.uploadProductImgs)
router.post('/uploadApplicantCV', permit(['_a']), controller.uploadApplicantCV)
router.post('/uploadJobImage', permit(['_a']), controller.uploadJobImage)




module.exports = router
