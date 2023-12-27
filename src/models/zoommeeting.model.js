/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 2);
var timestamps = require('mongoose-timestamp');

breakoutRoomSchema = new Schema({
    
    enable: {
        type: String
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

restrictedCountriesSchema = new Schema({
    
    enable: {
        type: String
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

settingsSchema = new Schema({
    
    host_video: {
        type: Boolean
    },
    participant_video: {
        type: Boolean
    },
    cn_meeting: {
        type: Boolean
    },
    in_meeting: {
        type: Boolean
    },
    join_before_host: {
        type: Boolean
    },
    jbh_time: {
        type: Number
    },
    mute_upon_entry: {
        type: Boolean
    },
    watermark: {
        type: Boolean
    },
    use_pmi: {
        type: Boolean
    },
    approval_type: {
        type: Number
    },
    audio: {
        type: String
    },
    auto_recording: {
        type: String
    },
    enforce_login: {
        type: Boolean
    },
    enforce_login_domains: {
        type: String
    },
    alternative_host_update_polls: {
        type: String
    },
    close_registration: {
        type: Boolean
    },
    show_share_button: {
        type: Boolean
    },
    allow_multiple_devices: {
        type: Boolean
    },
    registrants_confirmation_email: {
        type: Boolean
    },
    waiting_room: {
        type: Boolean
    },
    request_permission_to_unmute_participants: {
        type: Boolean
    },
    registrants_email_notification: {
        type: Boolean
    },
    meeting_authentication: {
        type: Boolean
    },
    encryption_type: {
        type: String
    },
    approved_or_denied_countries_or_regions: restrictedCountriesSchema,
    breakout_room: breakoutRoomSchema,
    alternative_hosts_email_notification: {
        type: Boolean
    },
    device_testing: {
        type: Boolean
    },
    focus_mode: {
        type: Boolean
    },
    private_meeting: {
        type: Boolean
    },
    email_notification: {
        type: Boolean
    },
    host_save_video_order: {
        type: Boolean
    },
    
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const zoomMeetingSchema = new Schema({
    id: {
    type:Number    
  },
  host_id: {
    type:String    
  },
  host_email: {
    type:String    
  },
  topic: {
    type:String    
  },
  type: {
    type:Number    
  },
  status: {
    type:String    
  },
  start_time: {
    type:String    
  },
  duration: {
    type:Number    
  },
  timezone: {
    type:String    
  },
  agenda: {
    type:String    
  },
  start_url: {
    type:String    
  },
  join_url: {
    type:String    
  },
  password: {
    type:String    
  },
  h323_password: {
    type:String    
  },
  pstn_password: {
    type:String    
  },
  encrypted_password: {
    type:String    
  },
  settings: settingsSchema,
  pre_schedule: {
    type:Boolean    
  }
  
});




zoomMeetingSchema.plugin(timestamps);
const categoriesModel = mongoose.model("zoommeetings", zoomMeetingSchema);

module.exports = categoriesModel;
