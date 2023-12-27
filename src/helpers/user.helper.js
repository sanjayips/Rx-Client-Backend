/**
 * Created by Mb
 */

//import mongoose and models
var mongoose = require('mongoose');
var User = mongoose.model('users');

var mongoDotNotation = require('mongo-dot-notation');

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');
const {result} = require('lodash');
const { permissions } = require('../controllers');

//helper functions
logger = require("../helpers/logger");
const constants = require("../hardCodedData").constants;
module.exports = {

    reportUser: (reportedBy, reportedUser, reason) => {
        return new Promise((resolve, reject) => {
            console.log("reportUser HelperFunction is called");
            var data = {
                reportedBy,
                reportedUser,
                reason
            }
            var report = new Reports(data);
            report.save()
                .then(result => {
                    resolve();
                })
                .catch(error => {
                    reject();
                });
        });
    },

    blockOrUnlblockUser: (blockedby, blockeduser, blockedbywhom, operation = "block") => {
        return new Promise((resolve, reject) => {
            console.log("blockOrUnlblockUser HelperFunction is called");
            var query = {};

            if (operation === 'block') {
                query = {
                    $addToSet: {blocked: {blockedby: blockedbywhom, user: blockeduser}}
                };
            } else {
                query = {
                    $pull: {blocked: {blockedby: blockedbywhom, user: blockeduser}}
                }
            }

            User.findByIdAndUpdate(blockedby, query)
                .then(result => {
                    resolve();
                })
                .catch(error => {
                    reject();
                });
        });
    },

    listBlockedUsers: (user_id) => {
        return new Promise((resolve, reject) => {
            console.log("listBlockedUsers HelperFunction is called");
            User.findById(user_id, {blocked: 1, _id: 0})
                .populate({path: 'blocked.user', select: constants.selectUsersData})
                .then(result => {
                    // for (let blockage)
                    resolve(result);
                })
                .catch(error => {
                    reject();
                });
        });
    },


    manipulateUserToNullArraysForAndroid: (user) => {
    },

    isUserIdExists: (u_id) => {
        console.log("isUserIdExists HelperFunction is called");
        var where = {_id: u_id};
        return User.findOne(where, '_id')
            .then((user) => {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                return err;
            });
    },

    findauser: (u_id) => {
        console.log("findauser HelperFunction is called");
        var where = {_id: u_id};
        return User.findOne(where)
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                return err;
            });
    },

    isUserEmailExists: (u_email) => {
        console.log("isUserEmailExists HelperFunction is called");
        var where = {email: u_email};
        return User.findOne(where, {
            _id: 1,
            first_name:1,
            email: 1,
            password: 1,
            approved:1,
            active: 1,
            role: 1,
            profile_picture_url: 1,
            is_verified: 1
        })
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                return err;
            });
    },

    verifyCode: (u_email, u_code) => {
        console.log("verifyCode HelperFunction is called");

        var where = {email: u_email.toLowerCase(), verification_code: u_code};

        return User.findOne(where)
            .then((user) => {
                console.log("After User find one called");
                console.log(user);
                if (user) {
                    return user;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                return err;
            });
    },

    updateUser: (user) => {
        console.log("updateUser HelperFunction is called");
        return User.findOne({_id: user._id})
            .then((userfound) => {
                user = _.omit(user, ['first_name', 'first_family_name', 'second_family_name', 'third_family_name', 'role', 'password', 'email', '_id', 'platform']);
                return User.findOneAndUpdate({_id: userfound._id}, mongoDotNotation.flatten(JSON.parse(JSON.stringify(user))), {new: true})

                    .populate({
                        path: 'rolePrivileges',
                        model: 'roles',
                        populate: {
                            path: 'permissions',
                            model: 'permissions'
                        }
                    })
                    .then(async (updateduser) => {
                        if (user.fcm_tokens) {
                            console.log("removing fcm tokens from all other users.");
                            await User.update({
                                'fcm_tokens.token': user.fcm_tokens.token,
                                _id: {$ne: updateduser._id}
                            }, {$set: {fcm_tokens: {}}}, {multi: true});
                        }
                        var jwt = require('jsonwebtoken');
                        var token = module.exports.getToken(updateduser);
                        module.exports.manipulateUserToNullArraysForAndroid(updateduser);
                        var obj = {};
                        obj.user = updateduser;

                        obj.token = token;
                        return obj;
                    })
            })
            .catch(err => {
                return err
            });
    },

    updateprofile: (user, token) => {
        console.log("updateprofile HelperFunction is called");
        if (token.r != "_t") {
            user = _.omit(user, ['hourlyrate', 'experience', 'title']);
        }


        return User.findOne({_id: token.d})
            .then((userfound) => {
                user = _.omit(user, ['role', 'password', 'email', '_id', 'platform']);
                console.log("User");
                console.log(user);
                return User.findOneAndUpdate({_id: userfound._id}, mongoDotNotation.flatten(JSON.parse(JSON.stringify(user))), {new: true})
                    .then(async (updateduser) => {
                        console.log(updateduser)
                        if (user.fcm_tokens) {
                            console.log("removing fcm tokens from all other users.");
                            await User.update({
                                'fcm_tokens.token': user.fcm_tokens.token,
                                _id: {$ne: updateduser._id}
                            }, {$set: {fcm_tokens: {}}}, {multi: true});
                        }
                        module.exports.manipulateUserToNullArraysForAndroid(updateduser);
                        var obj = {};
                        obj.user = updateduser;
                        return obj;
                    })
            })
            .catch(err => {
                return err
            });
    },


    getToken: (user) => {
        console.log("getToken HelperFunction is called")
        let userrole = '_a'
        switch(user.role) {
            /* case 'subscriber':
                userrole = '_ss'
              break
            case 'jobapplicant':
                userrole = '_ja'
              break
              case 'customer':
                userrole = '_cst'
              break
              case 'doctor':
                userrole = '_doc'
              break
            default:
                userrole = '_a' */
                case 'subscriber':
                    userrole = '_ss'
                    break
                case 'jobapplicant':
                    userrole = '_ja'
                    break
                case 'hr':
                    userrole = '_hr'
                    break
                case 'interviewer':
                    userrole = '_intrvr'
                    break
                case 'itsales':
                    userrole = 'itsl'
                    break
                case 'botonist':
                    userrole = '_btnst'
                    break
                case 'marketing':
                    userrole = '_mrkt'
                    break
                case 'businessdevelopment':
                    userrole = '_bsndev'
                    break
                case 'businessdevelopment':
                    userrole = '_bsndev'
                    break
                case 'doctor':
                    userrole = '_doc'
                    break
                case 'lawyer':
                    userrole = '_lwr'
                    break
                case 'chemist':
                    userrole = '_chmst'
                    break
                case 'chemist':
                    userrole = '_chmst'
                    break
                case 'pharmacist':
                    userrole = '_phrmst'
                    break
                case 'vendor':
                    userrole = '_vndr'
                    break
                case 'agriculturescientist':
                    userrole = '_agr'
                    break
                case 'customersupport':
                    userrole = '_cstsprt'
                    break
                case 'customer':
                    userrole = '_cst'
                    break
                case 'individualtasker':
                    userrole = '_indvtskr'
                    break
                case 'companytasker':
                    userrole = '_cmpntskr'
                    break
                default:
                    userrole = '_a'
          }
        var jwt = require('jsonwebtoken')
        var token = jwt.sign({
            a: user.active,
            n: user.first_name,
            e: user.email,
            d: user._id,
            p: user.profile_picture_url,
            //r: user.role === 'subscriber' ? '_ss' : (user.role === 'jobapplicant' ? '_ja' : '_a'),
            r: userrole
        }, process.env.JWT_SECRETE);
        return token;
    },

    listAllUsers: async (sortProperty, sortOrder = 1, offset = 0, limit = 1000000, query) => {
        console.log("listAllUsers HelperFunction is called");

        const users = await User.find(query.critarion)
            //.populate('currentbranch')
            //.populate('currentCourseClassEnrolled')

            .sort({[sortProperty]: sortOrder})
            .skip(offset)
            .limit(limit);

        const userssize = await User.find().count();

        return {
            users: users,
            count: userssize,
            offset: offset,
            limit: limit
        };

    },

    updateuser: async (data) => {
        console.log("Update User HelperFunction is called");
        if('first_name' in data){
            data.first_name = data.first_name.toUpperCase()
        } 

        if('first_family_name' in data){
            data.first_family_name = data.first_family_name.toUpperCase()
        } 

        if('second_family_name' in data){
            data.second_family_name = data.second_family_name.toUpperCase()
        } 

        if('third_family_name' in data){
            data.third_family_name = data.third_family_name.toUpperCase()
        } 

        const result = await User.findOneAndUpdate({_id: data._id}, data, {new: true})

        return result;

    },


    removeUser: async (userid) => {
        console.log("removeUser HelperFunction is called")
        const user = await User.findById(userid)
        console.log(user);
        const result = await user.remove()
        return result
    },

    approveDisapproveUser: async (data) => {
        console.log("removeUser HelperFunction is called")
        const user = await User.findById(data.userid)
        let result
        if(data.approved == "approved"){
            user.approved = "approved"
            result = await user.save()
        } else if(data.approved == "disapproved"){
            user.approved = "disapproved"
            result = await user.save()
        }
        
        
        return result
    },

    activeUser: async (data) => {
        console.log("activeUser HelperFunction is called")
       try {
        const user = await User.findById(data.userid)
        let result
        if(data.active){
            user.active = true
            result = await user.save()
        } else {
            user.active = false
            result = await user.save()
        }
        return result
        
       } catch (error) {
         console.log(`Error Occurred =======`, error)
       }
    },

};
