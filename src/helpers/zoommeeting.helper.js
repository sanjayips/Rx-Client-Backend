/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

var ZoomMeeting = mongoose.model('zoommeetings')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("../helpers/logger");

module.exports = {

    createZoomMeeting: async (data) => {
        console.log("createZoomMeeting HelperFunction is called");
        const zoommeeting = new ZoomMeeting(data);
        await zoommeeting.save()
        return zoommeeting;
        
    },
    getZoomMeetings: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000) => {
        console.log("getCategories Model Function called")
        const zoommeetings = await ZoomMeeting.find()
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const zmmtnsize = zoommeetings.length

        return {
            zoommeetings: zoommeetings,
            count: zmmtnsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateZoomMeeting: async (data) => {
        console.log("updateZoomMeeting HelperFunction is called");
        
        const result = await ZoomMeeting.findOneAndUpdate({_id: data.meetingid}, data, {new: true})

        return result; 
                
    },

    removeZoomMeeting: async (id) => {
        console.log("removeUser HelperFunction is called");

        const zoommeeting = await ZoomMeeting.findById(id);
        
        const result = await zoommeeting.remove();
        return result;
        

    },

};
