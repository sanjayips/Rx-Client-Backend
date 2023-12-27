/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 2);
var timestamps = require('mongoose-timestamp');

const jobsCategoriesSchema = new Schema({
  jobCategoryTitle: {
    type:String,
    required: true,
    unique: true
  },
  
});






jobsCategoriesSchema.plugin(timestamps);
const categoriesModel = mongoose.model("categories", jobsCategoriesSchema);

module.exports = categoriesModel;
