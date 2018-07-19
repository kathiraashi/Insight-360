var mongoose = require ('mongoose');

// Lead source schema
   var LeadSourceSchema = mongoose.Schema({
      Lead_Source: { type : String , require : true},
      Company_Id: { type : String , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarLeadSource = mongoose.model( 'LeadSource' ,LeadSourceSchema, 'Leads_Lead_Source');

module.exports = {
   LeadSourceSchema : VarLeadSource
}