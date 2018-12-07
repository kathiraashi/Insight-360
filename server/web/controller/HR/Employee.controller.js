var CryptoJS = require("crypto-js");
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var HrModel = require('../../models/HR/Hr.model.js');
var ConfigurationModel = require('./../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************** Employee ***********************
// Employee Mobile Async Validate
exports.Mobile_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Mobile || ReceivingData.Mobile === '' ) {
      res.status(400).send({Status: false, Message: "Mobile number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      HrModel.HrEmployeeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'General_Info_Mobile_Number': { $regex : new RegExp("^" + ReceivingData.Mobile + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Mobile Number Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Mobile Number!."});
         } else {
            if ( result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};
// Employee create
exports.HrEmployee_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Employee_Name || ReceivingData.Employee_Name === '') {
      res.status(400).send({Status: false, Message: 'Employee Details Cannot be empty'});
   } else {
      // var EmployeeCodeNumber;
      // var Employee_Code_Last_Number;
      console.log(ReceivingData.UserManagement_Id);
      var tempUserManagement_Id = (ReceivingData.UserManagement_Id && ReceivingData.UserManagement_Id !== '') ? mongoose.Types.ObjectId(ReceivingData.UserManagement_Id) : null;
      var tempIf_UserManagement_Linked = (tempUserManagement_Id !== null) ?  true : false;
      const tempEmployee_Category = (ReceivingData.Employee_Category && ReceivingData.Employee_Category !== null || ReceivingData.Employee_Category !== '') ? mongoose.Types.ObjectId(ReceivingData.Employee_Category) : null;
      const tempGeneral_Info_Branch = (ReceivingData.General_Info_Branch && ReceivingData.General_Info_Branch !== null || ReceivingData.General_Info_Branch !== '') ? mongoose.Types.ObjectId(ReceivingData.General_Info_Branch) : null;
      const tempGeneral_Info_Report_To = (ReceivingData.General_Info_Report_To && ReceivingData.General_Info_Report_To !== null || ReceivingData.General_Info_Report_To !== '') ? mongoose.Types.ObjectId(ReceivingData.General_Info_Report_To) : null;
      var Create_Employee = new HrModel.HrEmployeeSchema({
         Employee_Name: ReceivingData.Employee_Name,
         Employee_Code: ReceivingData.Employee_Code,
         Employee_Code_Length: parseInt(ReceivingData.Employee_Code_Length),
         Employee_Category: tempEmployee_Category,
         General_Info_Branch: tempGeneral_Info_Branch,
         General_Info_Department: mongoose.Types.ObjectId(ReceivingData.General_Info_Department),
         General_Info_Designation: mongoose.Types.ObjectId(ReceivingData.General_Info_Designation),
         General_Info_Report_To: tempGeneral_Info_Report_To,
         General_Info_Mobile_Number: ReceivingData.General_Info_Mobile_Number,
         General_Info_Date_Of_Joining: ReceivingData.General_Info_Date_Of_Joining,
         General_Info_Probation_Month: ReceivingData.General_Info_Probation_Month,
         General_Info_Is_A_Manager: ReceivingData.General_Info_Is_A_Manager,
         General_Info_Active: ReceivingData.General_Info_Active,
         If_UserManagement_Linked: tempIf_UserManagement_Linked,
         UserManagement_Id: tempUserManagement_Id,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Employee.save(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Employee Creation Query Error', 'Employee.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hr Employee!."});
         } else {
            if (tempIf_UserManagement_Linked === true) {
               AdminModel.User_Management
               .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(tempUserManagement_Id), Active_Status: true}, {If_Employee_Linked: true, Hrms_Employee_Id: mongoose.Types.ObjectId(result._id)})
               .exec(function(err1, result1) {
                  if(err1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User management update Query Error', 'Employee.controller.js', err);
                     res.status(400).send({Status: false, Message: "Some error occurred while creating the Employee!."});
                  } else {
                     res.status(200).send({Status: true, Message: "Employee Created and User management updated Successfully"} );
                  }
               });
            } else {
               res.status(200).send({Status: true, Message: "Employee Created Successfully"} );
            }
         }
      });
   }
}
// Employee code only to display for reference
exports.HrEmployee_Code = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var EmployeeCodeNumber;
      var Employee_Code_Last_Number;
      ConfigurationModel.HrConfigurationSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true},
      {Code_Prefix: 1, Code_Suffix: 1, Code_Starting: 1}, {})
      .exec(function(EmployeeCodeErr, EmployeeCodeResult) {
         if(EmployeeCodeErr) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee number Query Error', 'Employee.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Employee number!."});
         } else {
            HrModel.HrEmployeeSchema
            .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Employee_Code_Length: 1}, {sort: { Employee_Code_Length: -1}, limit: 1})
            .exec(function(LengthErr, LengthResult) {
               if(LengthErr) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Last number finding query Error', 'Employee.controller.js');
                  res.status(417).send({Status: false, Message: "Some error in finding the employee number"})
               } else {
                  var number = parseInt(EmployeeCodeResult.Code_Starting);
                  if(LengthResult.length > 0) {
                     if(!LengthResult[0].Employee_Code_Length) {
                        number = parseInt(EmployeeCodeResult.Code_Starting);
                     } else {
                        number = parseInt(LengthResult[0].Employee_Code_Length) + 1;
                     }
                  }
                  Employee_Code_Last_Number = number.toString().padStart(6,0);
                  if((EmployeeCodeResult.Code_Prefix !== null || EmployeeCodeResult.Code_Prefix !== '') && (EmployeeCodeResult.Code_Suffix === null || EmployeeCodeResult.Code_Suffix === '')) {
                     EmployeeCodeNumber = EmployeeCodeResult.Code_Prefix + Employee_Code_Last_Number;
                  } else if ((EmployeeCodeResult.Code_Prefix === null || EmployeeCodeResult.Code_Prefix === '') && (EmployeeCodeResult.Code_Suffix !== null || EmployeeCodeResult.Code_Suffix !== '')) {
                     EmployeeCodeNumber = Employee_Code_Last_Number + EmployeeCodeResult.Code_Suffix;
                  } else if ((EmployeeCodeResult.Code_Prefix !== null || EmployeeCodeResult.Code_Prefix !== '') && (EmployeeCodeResult.Code_Suffix !== null || EmployeeCodeResult.Code_Suffix !== '')) {
                     EmployeeCodeNumber = EmployeeCodeResult.Code_Prefix + Employee_Code_Last_Number + EmployeeCodeResult.Code_Suffix;
                  }
                  const Data = { EmpCode: EmployeeCodeNumber, EmpCodeLength: Employee_Code_Last_Number};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            })
         }
      });
   }
}

exports.HrEmployee_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      HrModel.HrEmployeeSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {}, { sort: {updatedAt: -1, createdAt: -1}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Employee Creation Query Error', 'Employee.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hr Employee!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}