var mongoose = require('mongoose');

// Industry Type Schema
   var IndustryTypeSchema = mongoose.Schema({
      Industry_Type: { type : String , required : true },
      Company_Id: { type : Number , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarIndustryType = mongoose.model('IndustryType', IndustryTypeSchema, 'CRM_Industry_Type');


// Ownership Type Schema
   var OwnershipTypeSchema = mongoose.Schema({
      Ownership_Type: { type : String , required : true },
      Company_Id: { type : Number , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarOwnershipType = mongoose.model('OwnershipType', OwnershipTypeSchema, 'CRM_Ownership_Type');

   
module.exports = {
   IndustryTypeSchema : VarIndustryType,
   OwnershipTypeSchema : VarOwnershipType
};