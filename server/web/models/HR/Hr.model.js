var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Hr Employee 
var HrEmployeeSchema = mongoose.Schema({
   Employee_Name:{ type: String, required: true},
   Employee_Code:{ type: String, required: true},
   Employee_Category: { type: Schema.Types.ObjectId, ref: 'EmployeeCategory', required: true},
   General_Info_Branch: { type: Schema.Types.ObjectId, ref: 'Branches', required: true},
   General_Info_Department: { type: Schema.Types.ObjectId, ref: 'Departments', required: true},
   General_Info_Designation: { type: Schema.Types.ObjectId, ref: 'Designation', required: true},
   General_Info_Report_To: { type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   General_Info_Mobile_Number: { type: String, required: true},
   General_Info_Date_Of_Joining: { type: Date, required: true},
   General_Info_Probation_Month: { type: String, required: true},
   General_Info_Is_A_Manager: { type: Boolean },
   General_Info_Active: { type: Boolean},
   Employee_Code_Length: { type: Number},
   If_UserManagement_Linked: { type: Boolean},
   UserManagement_Id: { type: Schema.Types.ObjectId, ref: 'User_Management'},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarHrEmployeeSchema = mongoose.model('HrEmployee', HrEmployeeSchema, 'Hr_Employee_List');

module.exports = {
   HrEmployeeSchema: VarHrEmployeeSchema
}