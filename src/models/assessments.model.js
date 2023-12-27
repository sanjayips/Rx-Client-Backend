
var mongoose = require('mongoose')
var Schema = mongoose.Schema

questionAttemptSchema = new Schema({
  
    questionText: {
        type: String
    },
    answers: [{
        answerText: {
            type: String
        },
        correctness: {
            type: Boolean
        },
        
    }],
    correctlyAttempted: {
        type: Boolean,
    },
    attempted: {
        type: Boolean,
        default: false
    },
    marks: {
        questionMarks: {
            type: Number,
            default: 0
        },
        marksObtained: {
            type: Number,
            default: 0
        }
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  })


var assessmentsSchema = new Schema({
    industry: {
        type: String,
        ref: 'industries'
    },
    questions:[questionAttemptSchema],
    assessmentResult: {
        type: String
    },
    percentageObtained: {
        type: Number
    },
    passed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    },
    lastModifiedBy: {
        type: String,
        ref: 'users'
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    }
)


module.exports = mongoose.model('assessments', assessmentsSchema)