var CryptoJS = require("crypto-js");
var HrmsModel = require('../../models/HRMS/Hrms.model.js');
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************* Hrms *************************************
// Leave Create
exports.HrmsLeaves_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var Create_Leaves = new HrmsModel.HrmsLeavesSchema({
         Requested_By: mongoose.Types.ObjectId(ReceivingData.Requested_By),
         Requested_To: mongoose.Types.ObjectId(ReceivingData.Requested_To),
         Leave_Type: mongoose.Types.ObjectId(ReceivingData.Leave_Type),
         Form_Date: ReceivingData.Form_Date,
         To_Date: ReceivingData.To_Date,
         Purpose: ReceivingData.Purpose,
         Leaves_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Leaves.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Creation Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave requested Successfully"} );
         }
      });
   }
}

// leave list
exports.HrmsLeaves_List = function(req, res) {
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
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Employee ID Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Leaves!."});
         } else {
            if(result.Hrms_Employee_Id !== '' && result.Hrms_Employee_Id !== null) {
               HrmsModel.HrmsLeavesSchema
               .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_To: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
               .populate({path: 'Requested_By', select: []})
               .populate({path: 'Requested_To', select: []})
               .populate({path: 'Leave_Type', select: []})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .exec(function(err1, result1) {
                  if(err1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission List Query Error', 'Permission.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Permission!."});
                  } else {
                     HrmsModel.HrmsLeavesSchema
                     .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_By: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
                     .populate({path: 'Requested_By', select: []})
                     .populate({path: 'Requested_To', select: []})
                     .populate({path: 'Leave_Type', select: []})
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
// Leaves View
exports.HrmsLeaves_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},{})
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Designation', select: []} })
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Department', select: []} })
      .populate({path: 'Requested_To', select: []})
      .populate({path: 'Leave_Type', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves View Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Hrms Leaves!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });         
         }
      });
   }
}
// Leaves Edit
exports.HrmsLeaves_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},
      {Leave_Type: mongoose.Types.ObjectId(ReceivingData.Leave_Type),
      Form_Date: ReceivingData.Form_Date,
      To_Date: ReceivingData.To_Date,
      Purpose: ReceivingData.Purpose,
      Leaves_Status: 'Draft', 
      Status: 'Draft'
      }).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Edit Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Editing the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave Edited Successfully"} );
         }
      });
   }
}

// Leaves Request
exports.HrmsLeaves_Requesting = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},
      {Leaves_Status: 'Requested', Status: 'Requested'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Requesting Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Requesting the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave Request send Successfully"} );
         }
      });
   }
}
// Leaves Approve
exports.HrmsLeaves_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},
      {Leaves_Status: 'Approved', Status: 'Approved'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Approve Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Approve the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave Request Approved Successfully"} );
         }
      });
   }
}
// Leaves Reject
exports.HrmsLeaves_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},
      {Leaves_Status: 'Rejected', Status: 'Rejected'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Rejected Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Rejected the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave Request Rejected Successfully"} );
         }
      });
   }
}
// Leaves Modify
exports.HrmsLeaves_Modify = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '') {
      res.status(400).send({Status: false, Message: 'Leave Details Cannot be empty'});
   } else {
      HrmsModel.HrmsLeavesSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Leaves_Id), If_Deleted: false, Active_Status: true},
      {Leaves_Status: 'Modify', Status: 'Modify'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Modify Query Error', 'Leaves.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Modify the Hrms Leaves!."});
         } else {
            res.status(200).send({Status: true, Message: "Leave send to Modified Successfully"} );
         }
      });
   }
}