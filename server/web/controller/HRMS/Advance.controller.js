var CryptoJS = require("crypto-js");
var HrmsModel = require('../../models/HRMS/Hrms.model.js');
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ********************************** Hrms ***********************************
// Advance Create
exports.HrmsAdvance_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var Create_Advance = new HrmsModel.HrmsAdvanceSchema({
         Requested_By: mongoose.Types.ObjectId(ReceivingData.Requested_By),
         Requested_To: mongoose.Types.ObjectId(ReceivingData.Requested_To),
         Advance_Date: ReceivingData.Advance_Date,
         Amount: ReceivingData.Amount,
         Advance_Status: 'Draft',
         Status: 'Draft',
         Description: ReceivingData.Description,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Advance.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms On Advance Creation Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance Created Successfully"} );
         }
      });
   }
}

// Advance list
exports.HrmsAdvance_List = function(req, res) {
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
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Employee ID Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Leaves!."});
         } else {
            if(result.Hrms_Employee_Id !== '' && result.Hrms_Employee_Id !== null) {
               HrmsModel.HrmsAdvanceSchema
               .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_To: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
               .populate({path: 'Requested_By', select: []})
               .populate({path: 'Requested_To', select: []})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .exec(function(err1, result1) {
                  if(err1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission List Query Error', 'Permission.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Permission!."});
                  } else {
                     HrmsModel.HrmsAdvanceSchema
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
// Advance View
exports.HrmsAdvance_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},{})
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Designation', select: []} })
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Department', select: []} })
      .populate({path: 'Requested_To', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance View Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Hrms Advance!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });         
         }
      });
   }
}

// Advance Edit
exports.HrmsAdvance_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},
      {
         Advance_Date: ReceivingData.Advance_Date,
         Amount: ReceivingData.Amount,
         Advance_Status: 'Draft',
         Status: 'Draft',
         Description: ReceivingData.Description
      }).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance Edit Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Editing the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance Edited Successfully"} );
         }
      });
   }
}

// Advance Request
exports.HrmsAdvance_Requesting = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},
      {Advance_Status: 'Requested', Status: 'Requested'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance Requesting Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Requesting the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance Request send Successfully"} );
         }
      });
   }
}
// Advance Approve
exports.HrmsAdvance_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},
      {Advance_Status: 'Approved', Status: 'Approved'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance Approve Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Approve the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance Request Approved Successfully"} );
         }
      });
   }
}
// Advance Reject
exports.HrmsAdvance_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},
      {Advance_Status: 'Rejected', Status: 'Rejected'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance Rejected Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Rejected the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance Request Rejected Successfully"} );
         }
      });
   }
}
// Advance Modify
exports.HrmsAdvance_Modify = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Advance_Id || ReceivingData.Advance_Id === '') {
      res.status(400).send({Status: false, Message: 'Advance Details Cannot be empty'});
   } else {
      HrmsModel.HrmsAdvanceSchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Advance_Id), If_Deleted: false, Active_Status: true},
      {Advance_Status: 'Modify', Status: 'Modify'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Advance Modify Query Error', 'Advance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Modify the Hrms Advance!."});
         } else {
            res.status(200).send({Status: true, Message: "Advance send to Modified Successfully"} );
         }
      });
   }
}