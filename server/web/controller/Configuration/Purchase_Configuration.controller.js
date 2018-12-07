var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************************** Purchase Configuration *****************************************
// Purchase Configuration Create
exports.PurchaseConfig_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Purchase_Quotation || ReceivingData.Purchase_Quotation === ''){
      res.status(400).send({Status: false, Message: 'Purchase Quotation Details cannot be empty'});
   } else if(!ReceivingData.Purchase_Order || ReceivingData.Purchase_Order === ''){
      res.status(400).send({Status: false, Message: 'Purchase Order Details cannot be empty'});
   } else {
      var Create_PurchaseConfig = new ConfigurationModel.PurchaseConfigurationSchema({
         Purchase_Quotation: ReceivingData.Purchase_Quotation,
         Purchase_Quotation_Prefix: ReceivingData.Purchase_Quotation_Prefix,
         Purchase_Quotation_Suffix: ReceivingData.Purchase_Quotation_Suffix,
         Purchase_Quotation_Starting: ReceivingData.Purchase_Quotation_Starting,
         Purchase_Quotation_Based: ReceivingData.Purchase_Quotation_Based,
         Purchase_Quotation_Custom_Date: ReceivingData.Purchase_Quotation_Custom_Date,
         Purchase_Quotation_Custom_Month: ReceivingData.Purchase_Quotation_Custom_Month,
         Purchase_Order: ReceivingData.Purchase_Order,
         Purchase_Order_Prefix: ReceivingData.Purchase_Order_Prefix,
         Purchase_Order_Suffix: ReceivingData.Purchase_Order_Suffix,
         Purchase_Order_Starting: ReceivingData.Purchase_Order_Starting,
         Purchase_Order_Based: ReceivingData.Purchase_Order_Based,
         Purchase_Order_Custom_Date: ReceivingData.Purchase_Order_Custom_Date,
         Purchase_Order_Custom_Month: ReceivingData.Purchase_Order_Custom_Month,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
      });
      Create_PurchaseConfig.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Configuration Create Query Error', 'Purchase_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Create The Purchase Configuration!."});
         } else {
            res.status(200).send({Status: true, Message: 'Purchase Configuration Successfully Created'});
         }
      });
   }
}

// Purchase Configuration List
exports.PurchaseConfig_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty!'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty!'});
   } else {
      ConfigurationModel.PurchaseConfigurationSchema
      .findOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Configuration Find Query Error', 'Purchase_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Purchase Configuration!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// Purchase Update Configuration
exports.PurchaseConfig_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty!'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty!'});
   } else if(!ReceivingData.Purchase_Quotation || ReceivingData.Purchase_Quotation === ''){
      res.status(400).send({Status: false, Message: 'Purchase Quotation Details cannot be empty'});
   } else if(!ReceivingData.Purchase_Order || ReceivingData.Purchase_Order === ''){
      res.status(400).send({Status: false, Message: 'Purchase Order Details cannot be empty'});
   } else {
      ConfigurationModel.PurchaseConfigurationSchema
      .updateOne({_id: mongoose.Types.ObjectId(ReceivingData.PurchaseConfig_Id), Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {$set: { Active_Status: false}})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Configuration Update Query Error', 'Purchase_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Update The Purchase Configuration!."});
         } else {
            var Create_PurchaseConfig = new ConfigurationModel.PurchaseConfigurationSchema({
               Purchase_Quotation: ReceivingData.Purchase_Quotation,
               Purchase_Quotation_Prefix: ReceivingData.Purchase_Quotation_Prefix,
               Purchase_Quotation_Suffix: ReceivingData.Purchase_Quotation_Suffix,
               Purchase_Quotation_Starting: ReceivingData.Purchase_Quotation_Starting,
               Purchase_Quotation_Based: ReceivingData.Purchase_Quotation_Based,
               Purchase_Quotation_Custom_Date: ReceivingData.Purchase_Quotation_Custom_Date,
               Purchase_Quotation_Custom_Month: ReceivingData.Purchase_Quotation_Custom_Month,
               Purchase_Order: ReceivingData.Purchase_Order,
               Purchase_Order_Prefix: ReceivingData.Purchase_Order_Prefix,
               Purchase_Order_Suffix: ReceivingData.Purchase_Order_Suffix,
               Purchase_Order_Starting: ReceivingData.Purchase_Order_Starting,
               Purchase_Order_Based: ReceivingData.Purchase_Order_Based,
               Purchase_Order_Custom_Date: ReceivingData.Purchase_Order_Custom_Date,
               Purchase_Order_Custom_Month: ReceivingData.Purchase_Order_Custom_Month,
               Purchase_Request: null,
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false,
            });
            Create_PurchaseConfig.save(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Configuration update Query Error', 'Purchase_Configuration.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while update The Purchase Configuration!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Purchase Configuration Successfully updated'});
               }
            });
         }
      });
   }
}