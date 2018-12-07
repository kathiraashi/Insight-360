var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Lead Create schema
var LeadsSchema = mongoose.Schema({
   Company_Name: { type: String, required: true },
   Email: { type: String },
   Phone: { type: String, required: true, unique: true },
   Lead_Source: { type: Schema.Types.ObjectId, ref: 'LeadSource' },
   Priority: { type: String },
   Product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true}],
   Assign_To: { type: String },
   Address: {  Street: { type : String },
               Area: { type : String },
               ZipCode: { type : String },
               Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                           Country_Name: { type : String } },
               State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                        State_Name: { type : String } },
               City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                     City_Name: { type : String } } },
   Log_Call_Count: { type: Number },
   Call_Schedule_Count: { type: Number },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarLeadsSchema = mongoose.model('Lead', LeadsSchema, 'Lead_List');

// Log Phone Call 
var LogPhoneCallSchema = mongoose.Schema({
   Company_Name: { type: Schema.Types.ObjectId, ref: 'Lead', required: true},
   Date: { type: Date, required: true },
   Product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true}],
   Contact_Person: { type: String, required: true },
   Email: { type: String },
   Phone: { type: String, required: true },
   Description: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarLogPhoneCallSchema = mongoose.model('Log_Phone_Call', LogPhoneCallSchema, 'Lead_Log_Phone_Call_List');

// Call Schedule
var CallSchedule = mongoose.Schema({
   Company_Name: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
   Date: { type: Date , required: true },
   Contact_Person: { type: String, required: true },
   Description: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarCallSchedule = mongoose.model('Call_Schedule', CallSchedule, 'Lead_Call_Schedule_List');

module.exports = {
   LeadsSchema : VarLeadsSchema,
   LogPhoneCallSchema : VarLogPhoneCallSchema,
   CallSchedule: VarCallSchedule
}