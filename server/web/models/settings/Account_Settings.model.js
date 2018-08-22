var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Bank Schema
   var BankSchema = mongoose.Schema({
      Bank_Name: { type: String , require: true },
      Account_Name: { type: String , require: true},
      Account_Type: { type: String , require: true},
      Account_No: { type: String , require: true},
      IFSC_Code: { type: String , require: true},
      Address: { type: String },
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true },
      },
      { timestamps : true}
   );
   var VarBank = mongoose.model('Bank', BankSchema, 'Account_Bank');


// Income Type schema
   var IncomeTypeSchema = mongoose.Schema({
      Income_Type: { type : String , require : true},
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarIncomeType = mongoose.model( 'IncomeType' ,IncomeTypeSchema, 'Account_Income_Type');

// Payment Terms schema
      var PaymentTermsSchema = mongoose.Schema({
         Payment_Terms: { type : String , require : true},
         Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
         Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
         },
         { timestamps : true }
      );
      var VarPaymentTerms = mongoose.model( 'PaymentTerms' ,PaymentTermsSchema, 'Account_Payment_Terms');

      // Taxes schema
      var TaxesSchema = mongoose.Schema({
         Tax_Name: { type : String , require : true},
         Tax_Scope: { type : String , require : true},
         Tax_Computation: { type : Object , require : true},
         Amount: { type : String , require : true},
         Notes: { type : String },
         Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
         Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
         },
         { timestamps : true }
      );
      var VarTaxes = mongoose.model( 'Taxes' ,TaxesSchema, 'Account_Taxes');

module.exports = {
   IncomeTypeSchema : VarIncomeType,
   PaymentTermsSchema : VarPaymentTerms,
   BankSchema:VarBank,
   TaxesSchema : VarTaxes
}