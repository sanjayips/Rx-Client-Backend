
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')
const jobCategoriesRoutes = require('./categories.route')
const jobsRoutes = require('./jobs.route')
const jobMessageRoutes = require('./jobMessages.route')
const interviewRoutes = require('./interviews.route')
const zoomMeetingRoutes = require('./zoommeeting.route')
const recruitmentRoutes = require('./recruitments.route')
const employeeRoutes = require('./employees.route')
const departmentRoutes = require('./departments.route')
const quotesRoutes = require('./quotes.route')
const tickerRoutes = require('./tickers.route')
const feedbackRoutes = require('./feedbacks.route')
const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')
const locateServicesRoutes = require('./services.route')
const phoneBookRoutes = require('./phonebook.route')
const termsRoutes = require('./termsconditions.route')
const serviceCategoryRoutes = require('./servicecategories.route')
const zohoRoutes = require('./zoho.route')
const storeRoutes = require('./stores.route')
const productCategoriesRoutes = require('./productCategories.route')
const productsRoutes = require('./products.route')
const variantsRoutes = require('./variants.route')
const productAttributesRoutes = require('./productAttributes.route')
const cutomerRoutes = require('./customers.route')
const ordersRoutes = require('./orders.route')
const diseasesRoutes = require('./diseases.route')

const lexiconRoutes = require('./lexicon.route')
const developmentNoteRoutes = require('./developmentNotes.route')
const appointmentRequestRoutes = require('./appointmentrequests.route')
const appointmentsRoutes = require('./appointments.route')
const doctorReservationRoutes = require('./doctorReservation.route')
const doctorNotesRoutes = require('./doctorNote.route')
const medicinePrescriptionsRoutes = require('./medicinePrescription.route')
const testPrescriptionsRoutes = require('./testPrescription.route')

const tasksRoutes = require('./tasks.route')
const taskCategoriesRoutes = require('./taskCategories.route')
const jobBidRoutes = require('./jobBids.route')
const taskerRoutes = require('./taskers.route')
const taskerSkillRoutes = require('./taskerSkills.route')
const taskerCompaniesRoutes = require('./taskerCompanies.route')
const taskerFeedbackRoutes = require('./taskerFeedbacks.route')
const industriesRoutes = require('./industries.route')
const assessmentAttemptRoutes = require('./assessmentAttempts.route')
const questionRoutes = require('./questions.route')
const assessmentRoutes = require('./assessments.route')
const taskerSkillsList = require('./taskerSkillsList.route')
const faqsRoutes = require('./faqs.route')
const tutorialRoutes = require('./tutorials.route')
const productsOfStoreRoutes = require('./productsOfStore.route')
const productsWishListRoutes = require('./productsWishList.route')


const uploadRoutes = require('./uploads.route')

const talentPoolRoutes = require('./talentPool.route')


//call appropriate routes
router.use ('/users', usersRoutes)
router.use('/jobcategories', jobCategoriesRoutes)
router.use ('/jobs', jobsRoutes)
router.use ('/jobMessages', jobMessageRoutes)
router.use ('/interviews', interviewRoutes)
router.use ('/zoommeetings', zoomMeetingRoutes)
router.use ('/recruitments', recruitmentRoutes)
router.use ('/employees', employeeRoutes)
router.use ('/departments', departmentRoutes)
router.use ('/quotes', quotesRoutes)
router.use ('/tickers', tickerRoutes)
router.use ('/feedbacks', feedbackRoutes)
router.use ('/lexicons', lexiconRoutes)
router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)
router.use ('/locateservices', locateServicesRoutes)
router.use ('/phonebooks', phoneBookRoutes)
router.use ('/terms', termsRoutes)
router.use ('/servicecategories', serviceCategoryRoutes)
router.use ('/zoho', zohoRoutes)
//Ecommerce
router.use('/stores', storeRoutes)
router.use('/productcategories', productCategoriesRoutes)
router.use('/products', productsRoutes)
router.use('/variants', variantsRoutes)
router.use('/productattributes', productAttributesRoutes)
router.use('/customers', cutomerRoutes)
router.use('/orders', ordersRoutes)
router.use('/developmentnotes', developmentNoteRoutes)

//Medical Consultation
router.use('/diseases', diseasesRoutes)

router.use('/appointmentrequests', appointmentRequestRoutes)
router.use('/appointments', appointmentsRoutes)
router.use('/doctorsreservations', doctorReservationRoutes)
router.use('/doctornotes', doctorNotesRoutes)
router.use('/medicineprescriptions', medicinePrescriptionsRoutes)
router.use('/testprescriptions', testPrescriptionsRoutes)

//DAS
router.use('/tasks', tasksRoutes)
router.use('/taskCategories', taskCategoriesRoutes)
router.use('/jobBids', jobBidRoutes)
router.use('/taskers', taskerRoutes)
router.use('/taskerSkills', taskerSkillRoutes)
router.use('/taskerCompanies', taskerCompaniesRoutes)
router.use('/taskerFeedbacks', taskerFeedbackRoutes)
router.use('/industries', industriesRoutes)
router.use('/assessmentAttempts', assessmentAttemptRoutes)
router.use('/questions', questionRoutes)
router.use('/assessments', assessmentRoutes)
router.use('/taskerSkillsList', taskerSkillsList)
router.use('/faqs', faqsRoutes)
router.use('/tutorials', tutorialRoutes)
router.use('/productsOfStore', productsOfStoreRoutes)
router.use('/productsWishList', productsWishListRoutes)
router.use('/uploads', uploadRoutes)
router.use('/talentPool', talentPoolRoutes)



module.exports = router