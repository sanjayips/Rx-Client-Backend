
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

physicalLocationSchema = new Schema({

    country: {
        type: String
    },
    state: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

jobsSchema = new Schema({

    job_title: {
        type: String
    },
    jobCompany: {
        type: String
    },
    salary: {
        type: String
    },
    description: {
        type: String
    },
    job_image_url: {
        type: String,
        default: '/uploads/dp/default.png'
    },
    jobCategory: [{
        type: String
    }],
    jobtype: {
        type: String,
        enum: ["full time", "part time", "internship"]
    },
    jobclass: {
        type: String,
        enum: ["onsite", "remote", "hybrid"]
    },

    jobstatus: {
        type: String,
        enum: ["active", "pending", "completed"]
    },
    expiryDate: {
        type: Date
    },
    employer: {
        type: String
    },
    applicants: [{
        type: String,
        ref: "users"
    }],
    approvedApplicants: [{
        type: String,
        ref: "users"
    }],
    interviews: [{
        type: String,
        ref: "interviews"
    }],
    selectedApplicant: {
        type: String,
        ref: "users"
    },

    jobawarded: {
        type: Boolean,
        default: false
    },
    jobQualications: [{
        type: String
    }],
    responsibilities: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    },
    physicalLocation: physicalLocationSchema,
    //GeoJSON: coordinates data must be in longitude then latitude order as supported by GeoJSON
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        usePushEach: true
    });

//2d Sphere index is maintained to run Geo JSON Based Queries
jobsSchema.index({ "location": "2dsphere" });
jobsSchema.on('index', function (err) {
    if (err) {
        console.error('Job index error: %s', err);
    } else {
        console.info('Job indexing complete');
    }
});
module.exports = mongoose.model('jobs', jobsSchema);
