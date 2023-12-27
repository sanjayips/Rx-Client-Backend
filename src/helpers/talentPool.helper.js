/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const TalentPool = mongoose.model('talentPool')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTalentPool: async (data) => {
        console.log("createTalentPool HelperFunction is called");
        const talentPools = new TalentPool(data)
        await talentPools.save()
        return talentPools
        
    },
    getTalentPoolsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTalentPools Model Function called")

        const talentPools = await TalentPool.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const talentPoolssize = talentPools.length

        return {
            talentPools: talentPools,
            count: talentPoolssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTalentPoolsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTalentPools Model Function called")

        const talentPools = await TalentPool.find(query.critarion).select(query.fields/* '_id TalentPoolName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const talentPoolssize = talentPools.length

        return {
            talentPools: talentPools,
            count: talentPoolssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTalentPool: async (data) => {
        console.log("updateTalentPool HelperFunction is called");
        const result = await promise.all([TalentPool.findOneAndUpdate({_id: data.talentPoolid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTalentPool: async (data) => {
        console.log("removeTalentPool HelperFunction is called");

        const talentPools = await TalentPool.findById(data.id);
        if(talentPools == null){
             var error = "TalentPool does not exists."
             return error
        }
        talentPools.lastModifiedBy = data.lastModifiedBy
        talentPools.active = false
        await talentPools.save()
        return talentPools;
        

    },

    findTalentPoolById: async (query) => {
        console.log("findTalentPoolById HelperFunction is called");
        
        const talentPools = await TalentPool.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return talentPools;
        

    },

    

};
