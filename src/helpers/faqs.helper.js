/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Faq = mongoose.model("faqs")

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createFaq: async (data) => {
        console.log("createFaq HelperFunction is called");
        const faqs = new Faq(data)
        await faqs.save()
        return faqs
        
    },
    getFaqsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getFaqs Model Function called")

        const faqs = await Faq.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const faqssize = faqs.length

        return {
            faqs: faqs,
            count: faqssize,
            offset: offset,
            limit: limit
        };
        
    },

    getFaqsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getFaqs Model Function called")

        const faqs = await Faq.find(query.critarion).select(query.fields/* '_id FaqName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const faqssize = faqs.length

        return {
            faqs: faqs,
            count: faqssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateFaq: async (data) => {
        console.log("updateFaq HelperFunction is called");
        const result = await promise.all([Faq.findOneAndUpdate({_id: data.faqsid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeFaq: async (data) => {
        console.log("removeFaq HelperFunction is called");

        const faqs = await Faq.findById(data.id);
        if(faqs == null){
             var error = "Faq does not exists."
             return error
        }
        faqs.lastModifiedBy = data.lastModifiedBy
        faqs.active = false
        await faqs.save()
        return faqs;
        

    },

    findFaqById: async (query) => {
        console.log("findFaqById HelperFunction is called");
        
        const faqs = await Faq.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return faqs;
        

    },

    

};
