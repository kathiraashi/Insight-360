var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Hrms Leaves schema
var HrmsLeavesSchema = mongoose.Schema({
   Requested_By: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_To: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Leave_Type: {type: Schema.Types.ObjectId, ref: 'LeaveType', required: true},
   Form_Date: {type: Date, required: true},
   To_Date: { type: Date, required: true },
   Purpose: { type: String },
   Leaves_Status: { type: String},
   Status: { type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarHrmsLeavesSchema = mongoose.model('HrmsLeaves', HrmsLeavesSchema, 'Hrms_Leaves_List');

// var Hrms OnDuty schema
var HrmsOnDutySchema = mongoose.Schema({
   Requested_By: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_To: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_Date: { type: Date, required: true },
   OnDuty_Date: {type: Date, required: true},
   From_Time: { type: String},
   FormTimeConverted : { type: Date},
   To_Time: { type: String, required: true },
   ToTimeConverted : { type: Date},
   Description: { type: String },
   OnDuty_Status: { type: String},
   Status: { type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarHrmsOnDutySchema = mongoose.model('HrmsOnDuty', HrmsOnDutySchema, 'Hrms_OnDuty_List');

// var Hrms Permission schema
var HrmsPermissionSchema = mongoose.Schema({
   Requested_By: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_To: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_Date: { type: Date, required: true },
   Out_Time: { type: String},
   OutTimeConverted : { type: Date},
   In_Time: { type: String, required: true },
   InTimeConverted : { type: Date},
   Description: { type: String },
   Permission_Status: { type: String},
   Status: { type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarHrmsPermissionSchema = mongoose.model('HrmsPermission', HrmsPermissionSchema, 'Hrms_Permission_List');

// var Hrms Advance schema
var HrmsAdvanceSchema = mongoose.Schema({
   Requested_By: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Requested_To: {type: Schema.Types.ObjectId, ref: 'HrEmployee', required: true},
   Advance_Date: { type: Date, required: true },
   Amount: { type: String, required: true},
   Description: { type: String },
   Advance_Status: { type: String},
   Status: { type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarHrmsAdvanceSchema = mongoose.model('HrmsAdvance', HrmsAdvanceSchema, 'Hrms_Advance_List');
module.exports = {
   HrmsLeavesSchema : VarHrmsLeavesSchema,
   HrmsOnDutySchema : VarHrmsOnDutySchema,
   HrmsPermissionSchema : VarHrmsPermissionSchema,
   HrmsAdvanceSchema : VarHrmsAdvanceSchema
}