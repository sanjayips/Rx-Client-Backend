
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var appointmentRequest = new Schema({
    customer: {
        type: String,
        required: true,
        ref: 'customers'
    },
    requestCategory: {
        type: String
    },
    reasonOfCurrentVisit: {
        type: String
    },
    status: {
        type: String,
        enum: ["cancelled", "completed", "pending", "rejected"]
    },
    medicalHistory: [{
        medicalFiles: [{
            type: String
        }],
        disease: {
            type: String,
            ref: "diseases"
        },
        positive: {
            type: Boolean,
            defualt: false
        },
        description: {
            type: String
        }
    }],
    pastConsultants: [{
        doctorName: {
            type: String
        },
        specialization: {
            type: String
        },
        lastCheckupDate: {
            type: Date
        },
        profileLink: {
            type: String
        },
        drPrescription: {
            type: String
        },
        medicalReports: [{
            type: String
        }]
    }],
    familyDiseases: [{
        disease: {
            type: String,
            ref: "diseases"
        },
        positive: {
            type: Boolean,
            defualt: false
        },
        description: {
            type: String
        }
    }],
    surgicalHistory: {
        isSurgeyDone: {
            type: Boolean,
            default: false
        },
        operationType: [{
            operationName: {
                type: String
            },
            operationDate: {
                type: Date
            },
            operationResult: {
                type: String
            }
        }]
    },
    requestDate: {
        type: Date
    },
    socialHistory: {
        addictions: [{
            addictionName: {
                type: String
            },
            everUsed: {
                type: Boolean,
                defualt: false
            },
            howLongUsed: {
                type: String
            },
            whenStarted: {
                type: Date
            },
            whenQuited: {
                type: Date
            },
            description: {
                type: String
            },
            lastTimeUsed: {
                type: String
            }
        }],
        maritalStatus: {
            type: String,
            enum: ["single", "married", "partner", "widowed", "divorced"]
        },
        sexualOrientation: {
            type: String,
            enum: ["hetrosexual", "homosexual", "bisexual", "transsexual"]
        },
        everHurt: {
            type: Boolean,
            defualt: false
        },
        needCarrier: {
            type: Boolean,
            defualt: false
        },
        exercise: {
            type: Boolean,
            defualt: false
        },
        pregnant: {
            type: Boolean,
            defualt: false
        },
        breastFeeding: {
            type: Boolean,
            defualt: false
        },
        lastMenstrualDate: {
            type: Date
        },
        noOfChildrens: {
            type: String
        },
        deliveryMethod: {
            type: String
        },
        deliveryInjury: {
            type: Boolean,
            default: false
        }
    },
    allergies: [{
        type: String
    }],
    medicationsSuppliments: [{
        medicine: {
            type: String
        },
        dosage: {
            type: String
        },
        takingNow: {
            type: Boolean,
            defualt: false
        },
        timesOfMedicine: {
            type: String
        },
        prescriptionFile: {
            type: String
        }
    }],
    symptoms: [{
        type: String
    }],
    consultationType: [{
        consultationFee: {
            type: String
        },
        communication: {
            type: String,
            enum: ["audio", "video", "chat"]
        }
    }],
    zoomMeeting: {
        type:String,
        ref: 'zoommeetings'
      },
    pictures: [{
        type: String
    }],
    videos: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    }
    ,
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


module.exports = mongoose.model('appointmentRequests', appointmentRequest);