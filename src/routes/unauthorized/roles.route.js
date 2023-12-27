/**
 * Created by Jamshaid.
 */
 
 const express = require('express')
 const router = express.Router()
 const permit = require('../../middlewares').permit
 
 const controller = require('../../controllers').roles
 
 router.post('/getRolesList', controller.getRolesList)
 
 
 module.exports = router
 