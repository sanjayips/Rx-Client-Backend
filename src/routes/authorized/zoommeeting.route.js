/**
 * Created by Jamshaid
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').zoommeetings

router.post('/zoomuserInfo', controller.zoomuserInfo)
router.post('/createZoomMeeting', controller.createZoomMeeting)
router.post('/createZoomMeetingForDoct', controller.createZoomMeetingForDoct)
router.post('/getZoomMeetings', controller.getZoomMeetings)
router.post('/updateZoomMeeting', controller.updateZoomMeeting)
router.post('/removeZoomMeeting', controller.removeZoomMeeting)

module.exports = router;
