var CryptoJS = require("crypto-js");
var HrmsModel = require('../../models/HRMS/Hrms.model.js');
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ********************************** Hrms ***********************************
// Permission Create
exports.HrmsPermission_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var Create_Permission = new HrmsModel.HrmsPermissionSchema({
         Requested_By: mongoose.Types.ObjectId(ReceivingData.Requested_By),
         Requested_To: mongoose.Types.ObjectId(ReceivingData.Requested_To),
         Requested_Date: ReceivingData.Requested_Date,
         Out_Time: ReceivingData.Out_Time,
         OutTimeConverted: ReceivingData.OutTimeConverted,
         In_Time: ReceivingData.In_Time,
         InTimeConverted: ReceivingData.ToTimeConverted,
         Description: ReceivingData.Description,
         Permission_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Permission.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms On Permission Creation Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission requested Successfully"} );
         }
      });
   }
}

// Permission list
exports.HrmsPermission_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else{
      AdminModel.User_Management
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.User_Id), Active_Status: true}, {Hrms_Employee_Id: 1})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Employee ID Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Leaves!."});
         } else {
            if(result.Hrms_Employee_Id !== '' && result.Hrms_Employee_Id !== null) {
               HrmsModel.HrmsPermissionSchema
               .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_To: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
               .populate({path: 'Requested_By', select: []})
               .populate({path: 'Requested_To', select: []})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .exec(function(err1, result1) {
                  if(err1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission List Query Error', 'Permission.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Permission!."});
                  } else {
                     HrmsModel.HrmsPermissionSchema
                     .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_By: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
                     .populate({path: 'Requested_By', select: []})
                     .populate({path: 'Requested_To', select: []})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .exec(function(err2, result2) {
                        if(err2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission List Query Error', 'Permission.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Permission!."});
                        } else {
                           const Data = { 'otherList': result1 ,'myList' : result2 };
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            }
            
         }
      });
      
   }
}
// Permission View
exports.HrmsPermission_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},{})
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Designation', select: []} })
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Department', select: []} })
      .populate({path: 'Requested_To', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission View Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Hrms Permission!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });         
         }
      });
   }
}

// Permission Edit
exports.HrmsPermission_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},
      {
      Requested_Date: ReceivingData.Requested_Date,
      Out_Time: ReceivingData.Out_Time,
      OutTimeConverted: ReceivingData.OutTimeConverted,
      InTimeConverted: ReceivingData.InTimeConverted,
      In_Time: ReceivingData.In_Time,
      Description: ReceivingData.Description,
      Permission_Status: 'Draft', 
      Status: 'Draft'
      }).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission Edit Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Editing the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission Edited Successfully"} );
         }
      });
   }
}

// Permission Request
exports.HrmsPermission_Requesting = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},
      {Permission_Status: 'Requested', Status: 'Requested'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission Requesting Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Requesting the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission Request send Successfully"} );
         }
      });
   }
}
// Permission Approve
exports.HrmsPermission_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},
      {Permission_Status: 'Approved', Status: 'Approved'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission Approve Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Approve the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission Request Approved Successfully"} );
         }
      });
   }
}
// Permission Reject
exports.HrmsPermission_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},
      {Permission_Status: 'Rejected', Status: 'Rejected'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission Rejected Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Rejected the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission Request Rejected Successfully"} );
         }
      });
   }
}
// Permission Modify
exports.HrmsPermission_Modify = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Permission_Id || ReceivingData.Permission_Id === '') {
      res.status(400).send({Status: false, Message: 'Permission Details Cannot be empty'});
   } else {
      HrmsModel.HrmsPermissionSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Permission_Id), If_Deleted: false, Active_Status: true},
      {Permission_Status: 'Modify', Status: 'Modify'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission Modify Query Error', 'Permission.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Modify the Hrms Permission!."});
         } else {
            res.status(200).send({Status: true, Message: "Permission send to Modified Successfully"} );
         }
      });
   }
}