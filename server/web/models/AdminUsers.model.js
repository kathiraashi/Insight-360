var mongoose = require('mongoose');

var AdminUsersSchema = mongoose.Schema({
   User_Name: { type : String , required : true },
   User_Password: { type : String, required : true },
   User_Blocked_Status: { type : Number , required : true },
   Company_Id: { type : String , required : true },
   Company_Response_Id: { type : String , required : true },
   },
   { timestamps: true }
);

var VarAdminUsers = mongoose.model('AdminUsers', AdminUsersSchema, 'Admin_Users');

module.exports = {
   AdminUsers : VarAdminUsers
};