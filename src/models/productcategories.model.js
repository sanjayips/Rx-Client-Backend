/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 2);
var timestamps = require('mongoose-timestamp');

const productsCategoriesSchema = new Schema({
  productCategoryTitle: {
    type:String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  }
  
},
{
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    usePushEach: true
});



const productCategoriesModel = mongoose.model("productCategories", productsCategoriesSchema);

module.exports = productCategoriesModel;
