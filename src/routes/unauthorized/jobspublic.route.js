
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').jobs


router.post('/listjobsforpublic', controller.listjobsforpublicview)
router.post('/findJobByIdPublic', controller.findJobById)

module.exports = router;
