/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');




const Feedback = mongoose.model('feedbacks')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createFeedback: async (data) => {
        console.log("createFeedback HelperFunction is called");
        const feedback = new Feedback(data)
        await feedback.save()
        return feedback
        
    },
    getFeedbacksWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getFeedbacks Model Function called")

        const feedbacks = await Feedback.find(query.critarion)
       
        /* .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy) */
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const feedbackssize = feedbacks.length

        return {
            feedbacks: feedbacks,
            count: feedbackssize,
            offset: offset,
            limit: limit
        };
        
    },

    getFeedbacksList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getFeedbacks Model Function called")

        const feedbacks = await Feedback.find(query.critarion).select(query.fields/* '_id FeedbackName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const feebacksize = feedbacks.length

        return {
            feedbacks: feedbacks,
            count: feebacksize,
            offset: offset,
            limit: limit
        };
        
    },

    updateFeedback: async (data) => {
        console.log("updateFeedback HelperFunction is called");
        
        const result = await Feedback.findOneAndUpdate({_id: data.feedbackid}, data, {new: true})

        return result; 
                
    },

    

    removeFeedback: async (data) => {
        console.log("removeFeedback HelperFunction is called");

        const feedback = await Feedback.findById(data.id);
        if(feedback == null){
             var error = "Feedback does not exists."
             return error
        }
        //feedback.lastModifiedBy = data.lastModifiedBy
        feedback.active = false
        feedback.save()
        return feedback;
        

    },

    findFeedbackById: async (query) => {
        console.log("findFeedbackById HelperFunction is called");
        
        const feedback = await Feedback.findOne(query.critarion)
        
        /* .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy) */
        
        return feedback;
        

    },

    

};
