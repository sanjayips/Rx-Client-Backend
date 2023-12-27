
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')
const jobsRoutes = require("./jobspublic.route")
const quotesRoutes = require('./quotes.route')
const feedbackRoutes = require('./feedbacks.route')
const verificationRoutes = require('./verifications.route')
const locateServicesRoutes = require('./services.route')
const tickerRoutes = require('./tickers.route')
const phonebookRoutes = require('./phonebooks.route')
const termsRoutes = require('./termsconditions.route')
const rolesRoutes = require('./roles.route')
const productsRoutes = require('./products.route')
const lexiconRoutes = require('./lexicon.route')
const productsOfStoreRoutes = require('./productsOfStore.route')
const taskerCompanyRoutes = require('./taskerCompanies.route')
const taskerCategoryRoutes = require('./taskCategories.route')
const uploadRoutes = require('./uploads.route')
const talentPoolPublicRoutes = require('./talentPoolPublic.route')
const jobCategoriesPublicRoutes = require('./categoriesPublic.route')


//call appropriate routes

//Un-restricted routes
router.use ('/users', userRoutes)
router.use ('/jobspublic', jobsRoutes)
router.use ('/quotes', quotesRoutes)
router.use ('/feedbacks', feedbackRoutes)
router.use ('/verifications', verificationRoutes)
router.use ('/locateservices', locateServicesRoutes)
router.use ('/tickers', tickerRoutes)
router.use ('/phonebooks', phonebookRoutes)
router.use ('/terms', termsRoutes)
router.use ('/roles', rolesRoutes)
router.use('/productspublic', productsRoutes)
router.use('/lexiconpublic', lexiconRoutes)
router.use('/productsOfStore', productsOfStoreRoutes)
router.use('/taskerCompanies', taskerCompanyRoutes)
router.use('/taskCategories', taskerCategoryRoutes)
router.use('/uploads', uploadRoutes)
router.use('/talentPoolPublic', talentPoolPublicRoutes)
router.use('/jobCategoriesPublic', jobCategoriesPublicRoutes)


module.exports = router;
