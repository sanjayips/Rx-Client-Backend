/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');




const PhoneBook = mongoose.model('businessPhoneBooks')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createPhoneBook: async (data) => {
        console.log("createPhoneBook Helper Function is called");
        const phonebook = new PhoneBook(data)
        await phonebook.save()
        return phonebook
        
    },
    getPhoneBooksWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPhoneBooksWithFullDetails Helper Function called")

        const phonebooks = await PhoneBook.find(query.critarion)
        .populate('tickers', query.tickers)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const phonebookssize = phonebooks.length

        return {
            phonebooks: phonebooks,
            count: phonebookssize,
            offset: offset,
            limit: limit
        };
        
    },

    getActivePhoneBooks: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getActivePhoneBooks Helper Function called")
        let where = {active: true}
        const phonebooks = await PhoneBook.find(where)
       
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const phonebookssize = phonebooks.length

        return {
            phonebooks: phonebooks,
            count: phonebookssize,
            offset: offset,
            limit: limit
        };
        
    },

    getPhoneBooksList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPhoneBooksList Helper Function called")

        const phonebooks = await PhoneBook.find(query.critarion).select(query.fields/* '_id phonebookName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = phonebooks.length

        return {
            phonebooks: phonebooks,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updatePhoneBook: async (data) => {
        console.log("updatePhoneBook HelperFunction is called");
        
        const result = await PhoneBook.findOneAndUpdate({_id: data.phonebookid}, data, {new: true})

        return result; 
                
    },

    

    removePhoneBook: async (data) => {
        console.log("removePhoneBook HelperFunction is called");

        const phonebook = await PhoneBook.findById(data.id);
        if(phonebook == null){
             var error = "PhoneBook does not exists."
             return error
        }
        phonebook.lastModifiedBy = data.lastModifiedBy
        phonebook.active = false
        phonebook.save()
        return phonebook;
        

    },

    findPhoneBookById: async (query) => {
        console.log("findPhoneBookById HelperFunction is called");
        
        const phonebook = await PhoneBook.findOne(query.critarion)
        .populate('tickers', query.tickers)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return phonebook;
        

    },

    

};
