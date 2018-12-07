var CryptoJS = require("crypto-js");
var HrmsModel = require('../../models/HRMS/Hrms.model.js');
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ********************************** Hrms ***********************************
// OnDuty Create
exports.HrmsOnDuty_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var Create_Duty = new HrmsModel.HrmsOnDutySchema({
         Requested_By: mongoose.Types.ObjectId(ReceivingData.Requested_By),
         Requested_To: mongoose.Types.ObjectId(ReceivingData.Requested_To),
         Requested_Date: ReceivingData.Requested_Date,
         OnDuty_Date: ReceivingData.OnDuty_Date,
         From_Time: ReceivingData.From_Time,
         FormTimeConverted: ReceivingData.FormTimeConverted,
         To_Time: ReceivingData.To_Time,
         ToTimeConverted: ReceivingData.ToTimeConverted,
         Description: ReceivingData.Description,
         OnDuty_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Duty.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms On Duty Creation Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty requested Successfully"} );
         }
      });
   }
}

// OnDuty list
exports.HrmsOnDuty_List = function(req, res) {
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
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Employee ID Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Leaves!."});
         } else {
            if(result.Hrms_Employee_Id !== '' && result.Hrms_Employee_Id !== null) {
               HrmsModel.HrmsOnDutySchema
               .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Requested_To: mongoose.Types.ObjectId(result.Hrms_Employee_Id)}, {}, {sort: { createdAt: -1, updatedAt: -1}})
               .populate({path: 'Requested_By', select: []})
               .populate({path: 'Requested_To', select: []})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .exec(function(err1, result1) {
                  if(err1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Permission List Query Error', 'Permission.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while listing the Hrms Permission!."});
                  } else {
                     HrmsModel.HrmsOnDutySchema
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

// OnDuty View
exports.HrmsOnDuty_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},{})
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Designation', select: []} })
      .populate({path: 'Requested_By', select: [], populate: { path: 'General_Info_Department', select: []} })
      .populate({path: 'Requested_To', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty View Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Hrms OnDuty!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });         
         }
      });
   }
}

// OnDuty Edit
exports.HrmsOnDuty_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},
      {
      Requested_Date: ReceivingData.Requested_Date,
      OnDuty_Date: ReceivingData.OnDuty_Date,
      From_Time: ReceivingData.From_Time,
      FormTimeConverted: ReceivingData.FormTimeConverted,
      To_Time: ReceivingData.To_Time,
      ToTimeConverted: ReceivingData.ToTimeConverted,
      Description: ReceivingData.Description,
      OnDuty_Status: 'Draft', 
      Status: 'Draft'
      }).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty Edit Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Editing the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty Edited Successfully"} );
         }
      });
   }
}

// OnDuty Request
exports.HrmsOnDuty_Requesting = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},
      {OnDuty_Status: 'Requested', Status: 'Requested'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty Requesting Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Requesting the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty Request send Successfully"} );
         }
      });
   }
}
// Leaves Approve
exports.HrmsOnDuty_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},
      {OnDuty_Status: 'Approved', Status: 'Approved'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty Approve Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Approve the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty Request Approved Successfully"} );
         }
      });
   }
}
// OnDuty Reject
exports.HrmsOnDuty_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},
      {OnDuty_Status: 'Rejected', Status: 'Rejected'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty Rejected Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Rejected the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty Request Rejected Successfully"} );
         }
      });
   }
}
// OnDuty Modify
exports.HrmsOnDuty_Modify = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '') {
      res.status(400).send({Status: false, Message: 'OnDuty Details Cannot be empty'});
   } else {
      HrmsModel.HrmsOnDutySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.OnDuty_Id), If_Deleted: false, Active_Status: true},
      {OnDuty_Status: 'Modify', Status: 'Modify'}).exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms OnDuty Modify Query Error', 'OnDuty.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Modify the Hrms OnDuty!."});
         } else {
            res.status(200).send({Status: true, Message: "OnDuty send to Modified Successfully"} );
         }
      });
   }
}