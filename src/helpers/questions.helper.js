/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Question = mongoose.model('questions')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createQuestion: async (data) => {
        console.log("createQuestion HelperFunction is called");
        const question = new Question(data)
        await question.save()
        return question
        
    },
    getQuestionsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getQuestions Model Function called")

        const questions = await Question.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const questionssize = questions.length
console.log(questions)
        return {
            questions: questions,
            count: questionssize,
            offset: offset,
            limit: limit
        };
        
    },

    getQuestionsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getQuestions Model Function called")

        const questions = await Question.find(query.critarion).select(query.fields/* '_id questionName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const questionssize = questions.length

        return {
            questions: questions,
            count: questionssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateQuestion: async (data) => {
        console.log("updateQuestion HelperFunction is called");
        const result = await promise.all([Question.findOneAndUpdate({_id: data.questionid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeQuestion: async (data) => {
        console.log("removeQuestion HelperFunction is called");

        const questions = await Question.findById(data.id);
        if(questions == null){
             var error = "Question does not exists."
             return error
        }
        questions.lastModifiedBy = data.lastModifiedBy
        questions.active = false
        await questions.save()
        return questions;
        

    },

    findQuestionById: async (query) => {
        console.log("findQuestionById HelperFunction is called");
        
        const questions = await Question.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return questions;
        

    },

    

};
