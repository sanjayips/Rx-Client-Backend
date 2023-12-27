/**
 * Controllers are exported for connecting them with routes
 */
 
module.exports = {
  user: require("./user.controller"),  
  jobCategories: require('./categories.controller'),
  jobs: require("./jobs.controller"),
  interviews: require('./interviews.controller'),
  zoommeetings: require('./zoommeeting.controller'),
  recruitments: require('./recruitments.controller'),
  employees: require('./employees.controller'),
  departments: require('./department.controller'),
  quotes: require('./quote.controller'),
  tickers: require('./ticker.controller'),
  feedbacks: require('./feedback.controller'),
  lexicons: require('./lexicon.controller'),
  permissions: require('./permission.controller'),
  roles: require('./roles.controller'),
  verifications: require('./verification.controller'),
  services: require('./services.controller'),
  phonebooks: require('./phonebook.controller'),
  termsconditions: require('./termsconditions.controller'),
  servicecategories: require('./servicecategory.controller'),
  zoho: require('./zoho.controller'),
  stores: require('./store.controller'),
  productCategories: require('./productCategories.controller'),
  products: require('./products.controller'),
  productsOfStore: require('./productsOfStore.controller'),
  productsWishLists: require('./productsWishList.controller'),
  variants: require('./variants.controller'),
  productAttributes: require('./productAttributes.controller'),
  customers: require('./customers.controller'),
  orders: require('./orders.controller'),
  diseases: require('./diseases.controller'),
  jobMessages: require('./jobMessages.controller'),
  talentPool: require('./talentPool.controller'),
  
  appointmentRequests: require('./appointmentRequest.controller'),
  developmentNotes: require('./developmentNotes.controller'),
  appointments: require('./appointments.controller'),
  doctorsReservations: require('./doctorReservations.controller'),
  doctorNotes: require('./doctorNote.controller'),
  medicinePrescriptions: require('./medicinePrescriptions.controller'),
  testPrescriptions: require('./testPrescriptions.controller'),

  //MIsc
  uploads: require('./uploads.controller'),
  //DAS
  tasks: require('./tasks.controller'),
  taskCategories: require('./taskCategories.controller'),
  jobBids: require('./jobBids.controller'),
  taskers: require('./taskers.controller'),
  taskerSkills: require('./taskerSkills.controller'),
  taskerSkillsList: require('./taskerSkillsList.controller'),
  taskerFeedbacks: require('./taskerfeedbacks.controller'),
  taskerCompanies: require('./taskerCompanies.controller'),
  individualTaskers: require('./individualTasker.controller'),
  industries: require('./industries.controller'),
  assessmentAttempts: require('./assessmentAttempts.controller'),
  questions: require('./questions.controller'),
  assessments: require('./assessments.controller'),
  faqs: require('./faqs.controller'),
  tutorials: require('./tutorials.controller'),



}
