var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************************** Accounts Configuration *****************************************
// Account Configuration Create
exports.AccountsConfig_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Date || ReceivingData.Date === ''){
      res.status(400).send({Status: false, Message: 'Date Details cannot be empty'});
   } else if(!ReceivingData.Month || ReceivingData.Month === ''){
      res.status(400).send({Status: false, Message: 'Month Details cannot be empty'});
   } else if(!ReceivingData.Currency || ReceivingData.Currency === ''){
      res.status(400).send({Status: false, Message: 'Currency Details cannot be empty'});
   } else {
      var Create_AccountsConfig = new ConfigurationModel.AccountsConfigurationSchema({
         Date: ReceivingData.Date,
         Month: ReceivingData.Month,
         Currency: ReceivingData.Currency,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_AccountsConfig.save(function(err, result) {
         if(err) {            
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Accounts Configuration Create Query Error', 'Accounts_Configuration.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Create the Accounts Configuration!."});
         } else {
            res.status(200).send({Status: true, Message: 'Accounts Configuration Successfully Created' });
         }
      });
   }
}

// Account Configuration List
exports.AccountsConfig_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      ConfigurationModel.AccountsConfigurationSchema
      .findOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Accounts Configuration Find Query Error', 'Accounts_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Accounts Configuration!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// Account Configuration Update
exports.AccountsConfig_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Date || ReceivingData.Date === ''){
      res.status(400).send({Status: false, Message: 'Date Details cannot be empty'});
   } else if(!ReceivingData.Month || ReceivingData.Month === ''){
      res.status(400).send({Status: false, Message: 'Month Details cannot be empty'});
   } else if(!ReceivingData.Currency || ReceivingData.Currency === ''){
      res.status(400).send({Status: false, Message: 'Currency Details cannot be empty'});
   } else {
      ConfigurationModel.AccountsConfigurationSchema
      .updateOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.AccountsConfig_Id)}, {$set: {Active_Status: false}}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Accounts Configuration Find Query Error', 'Accounts_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Accounts Configuration!."});
         } else {
            var Create_AccountsConfig = new ConfigurationModel.AccountsConfigurationSchema({
               Date: ReceivingData.Date,
               Month: ReceivingData.Month,
               Currency: ReceivingData.Currency,
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false
            });
            Create_AccountsConfig.save(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Accounts Configuration Update Query Error', 'Accounts_Configuration.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Update the Accounts Configuration!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Accounts Configuration Successfully Updated' });
               }
            });
         }
      });
   }
}