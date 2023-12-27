/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').stores

router.post('/createStore', permit(['_a']), controller.createStore)
router.post('/getStoresWithFullDetails', permit(['_a']), controller.getStoresWithFullDetails)
router.post('/updateStore', permit(['_a']), controller.updateStore)
router.post('/removeStore', permit(['_a']), controller.removeStore)
router.post('/getStoresList', permit(['_a']), controller.getStoresList)
router.post('/findStoreById', permit(['_a']), controller.findStoreById)


module.exports = router
