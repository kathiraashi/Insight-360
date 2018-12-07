var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************ Crm Activities ********************************************
// Crm Activities Create
exports.CrmReminders_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else if(!ReceivingData.Date || ReceivingData.Date === '') {
      res.status(400).send({Status: false, Message: 'Date Details Cannot be empty'});
   } else if(!ReceivingData.Subject || ReceivingData.Subject === '') {
      res.status(400).send({Status: false, Message: 'Subject Details Cannot be empty'});
   } else if(!ReceivingData.Contact_Person || ReceivingData.Contact_Person === '') {
      res.status(400).send({Status: false, Message: 'Contact Person Details Cannot be empty'});
   } else if(!ReceivingData.Description || ReceivingData.Description === '') {
      res.status(400).send({Status: false, Message: 'Description Details Cannot be empty'});
   } else if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '') {
      res.status(400).send({Status: false, Message: 'Activity Type Details Cannot be empty'});
   } else if(!ReceivingData.Status || ReceivingData.Status === '') {
      res.status(400).send({Status: false, Message: 'Status Details Cannot be empty'});
   } else {
      var Create_CrmReminders = new CrmModel.CrmRemindersSchema({
         Date: ReceivingData.Date,
         Subject: ReceivingData.Subject,
         Contact_Person: mongoose.Types.ObjectId(ReceivingData.Contact_Person),
         Activity_Type: mongoose.Types.ObjectId(ReceivingData.Activity_Type),
         Status: mongoose.Types.ObjectId(ReceivingData.Status),
         Priority: ReceivingData.Priority,
         Description: ReceivingData.Description,
         crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id),
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmReminders.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Reminders Creation Query Error', 'Reminders.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Reminders!."});
         } else {
            CrmModel.CrmRemindersSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), _id: mongoose.Types.ObjectId(result._id)},
            {},{})
            .populate({ path: 'Contact_Person', select: ['Name']})
            .populate({ path: 'Activity_Type', select: ['Activity_Type']})
            .populate({ path: 'Status', select: ['Activity_Status']})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Reminder Find Query Error', 'Reminder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Reminder!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
}

// Crm Activities List
exports.CrmReminder_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else {
         CrmModel.CrmRemindersSchema
         .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id)},
         {},{$sort: {createdAt: -1}})
         .populate({ path: 'Contact_Person', select: ['Name']})
         .populate({ path: 'Activity_Type', select: ['Activity_Type']})
         .populate({ path: 'Status', select: ['Activity_Status']})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err_1, result_1) {
            if(err_1) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Reminder Find Query Error', 'Reminder.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Reminder!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
   }
}