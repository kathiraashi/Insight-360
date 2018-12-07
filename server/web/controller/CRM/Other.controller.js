var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************ Crm Others *********************************************
// Crm others Create
exports.CrmOthers_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else if(!ReceivingData.Registration_Type || ReceivingData.Registration_Type === '') {
      res.status(400).send({Status: false, Message: 'Registration Details Cannot be empty'});
   } else if(!ReceivingData.Number || !ReceivingData.Number) {
      res.status(400).send({Status: false, Message: 'Number Details Cannot be empty'});
   } else {
      var Create_CrmOthers = new CrmModel.CrmOthersSchema({
         Registration_Type: mongoose.Types.ObjectId(ReceivingData.Registration_Type),
         Number: ReceivingData.Number,
         crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id),
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmOthers.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Others Creation Query Error', 'Others.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Others!."});
         } else {
            CrmModel.CrmOthersSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), _id: mongoose.Types.ObjectId(result._id)},
            {},{})
            .populate({ path: 'Registration_Type', select: ['Registration_Type']})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Others.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
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

// Crm Others List
exports.CrmOthers_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else {
      CrmModel.CrmOthersSchema.find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id)},
      {},{$sort: {createdAt: -1}})
      .populate({ path: 'Registration_Type', select: ['Registration_Type']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Others find Query Error', 'Others.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Others!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}