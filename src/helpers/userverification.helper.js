/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const UserVerification = mongoose.model('userverifications')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createUserVerification: async (data) => {
        console.log("createUserVerification HelperFunction is called");
        const userverification = new UserVerification(data)
        await userverification.save()
        return userverification
        
    },
    

    updateUserVerification: async (data) => {
        console.log("updateUserVerification HelperFunction is called");
        
        const result = await UserVerification.findOneAndUpdate({email: data.email}, data, {new: true})

        return result; 
                
    },

    

    removeUserVerification: async (data) => {
        console.log("removeUserVerification HelperFunction is called");

        const userverification = await UserVerification.findById(data.id);
        if(userverification == null){
             var error = "UserVerification does not exists."
             return error
        }
        userverification.lastModifiedBy = data.lastModifiedBy
        userverification.active = false
        userverification.save()
        return userverification;
        

    },

    findUserVerificationByEmail: async (email) => {
        console.log("findUserVerificationById HelperFunction is called");
        let where = {email: email}
        const userverification = await UserVerification.findOne(where)
                
        return userverification;
        

    },

    

};
