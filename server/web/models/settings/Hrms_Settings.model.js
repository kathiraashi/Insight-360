var mongoose = require('mongoose');

// Leave Type schema
   var LeaveTypeSchema = mongoose.Schema({
      Leave_Type: { type : String , require : true},
      Company_Id: { type : String , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarLeaveType = mongoose.model( 'LeaveType' ,LeaveTypeSchema, 'Hrms_Leave_Type');

   // Expenses Type schema
      var ExpensesTypeSchema = mongoose.Schema({
         Expenses_Type: { type : String , require : true},
         Company_Id: { type : String , required : true },
         Created_By : { type : String, required : true },
         Last_Modified_By: { type : String , required : true },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
         },
         { timestamps : true }
      );
      var VarExpensesType = mongoose.model( 'ExpensesType' ,ExpensesTypeSchema, 'Hrms_Expenses_Type');



module.exports = {
   LeaveTypeSchema : VarLeaveType,
   ExpensesTypeSchema : VarExpensesType
}