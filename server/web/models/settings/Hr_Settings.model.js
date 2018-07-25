var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Employee Category schema
      var EmployeeCategorySchema = mongoose.Schema({
         Employee_Category: { type : String , require : true},
         Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
         Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
         },
         { timestamps : true }
      );
   var VarEmployeeCategory = mongoose.model( 'EmployeeCategory' ,EmployeeCategorySchema, 'HR_Employee_Category');


   // Department schema
   var DepartmentSchema = mongoose.Schema({
      Department: { type : String , require : true},
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarDepartment = mongoose.model( 'Department' ,DepartmentSchema, 'HR_Department');


   // Designation schema
   var DesignationSchema = mongoose.Schema({
      Designation: { type : String , require : true},
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarDesignation = mongoose.model( 'Designation' ,DesignationSchema, 'HR_Designation');


   module.exports = {
      EmployeeCategorySchema : VarEmployeeCategory,
      DepartmentSchema : VarDepartment,
      DesignationSchema : VarDesignation,
      
   }