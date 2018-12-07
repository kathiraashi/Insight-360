var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************************** Hr Configuration *****************************************
// Hr Configuration Create
exports.HrConfig_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Employee || ReceivingData.Employee === ''){
      res.status(400).send({Status: false, Message: 'Employee Details cannot be empty'});
   } else if(!ReceivingData.Code || ReceivingData.Code === ''){
      res.status(400).send({Status: false, Message: 'Code Details cannot be empty'});
   } else {
      var Create_HrConfig = new ConfigurationModel.HrConfigurationSchema({
         Employee: ReceivingData.Employee,
         Employee_Prefix: ReceivingData.Employee_Prefix,
         Employee_Suffix: ReceivingData.Employee_Suffix,
         Employee_Starting: ReceivingData.Employee_Starting,
         Employee_Based: ReceivingData.Employee_Based,
         Employee_Custom_Date: ReceivingData.Employee_Custom_Date,
         Employee_Custom_Month: ReceivingData.Employee_Custom_Month,
         Code: ReceivingData.Code,
         Code_Prefix: ReceivingData.Code_Prefix,
         Code_Suffix: ReceivingData.Code_Suffix,
         Code_Starting: ReceivingData.Code_Starting,
         Code_Based: ReceivingData.Code_Based,
         Code_Custom_Date: ReceivingData.Code_Custom_Date,
         Code_Custom_Month: ReceivingData.Code_Custom_Month,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_HrConfig.save(function(err, result) {
         if(err) {            
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Configuration Create Query Error', 'Crm_Configuration.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Create the Hr Configuration!."});
         } else {
            res.status(200).send({Status: true, Message: 'Hr Configuration Successfully Created' });
         }
      });
   }
}

// Hr Configuration List
exports.HrConfig_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      ConfigurationModel.HrConfigurationSchema
      .findOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Configuration Find Query Error', 'Hr_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Hr Configuration!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// Hr Configuration Update
exports.HrConfig_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      ConfigurationModel.HrConfigurationSchema
      .updateOne({_id: mongoose.Types.ObjectId(ReceivingData.HrConfig_Id), Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {$set: {Active_Status: false}}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Configuration Find Query Error', 'Crm_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Crm Configuration!."});
         } else {
            var Create_HrConfig = new ConfigurationModel.HrConfigurationSchema({
               Employee: ReceivingData.Employee,
               Employee_Prefix: ReceivingData.Employee_Prefix,
               Employee_Suffix: ReceivingData.Employee_Suffix,
               Employee_Starting: ReceivingData.Employee_Starting,
               Employee_Based: ReceivingData.Employee_Based,
               Employee_Custom_Date: ReceivingData.Employee_Custom_Date,
               Employee_Custom_Month: ReceivingData.Employee_Custom_Month,
               Code: ReceivingData.Code,
               Code_Prefix: ReceivingData.Code_Prefix,
               Code_Suffix: ReceivingData.Code_Suffix,
               Code_Starting: ReceivingData.Code_Starting,
               Code_Based: ReceivingData.Code_Based,
               Code_Custom_Date: ReceivingData.Code_Custom_Date,
               Code_Custom_Month: ReceivingData.Code_Custom_Month,
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false
            });
            Create_HrConfig.save(function(err, result) {
               if(err) {            
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Configuration update Query Error', 'Crm_Configuration.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while updated the Hr Configuration!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Hr Configuration Successfully Updated' });
               }
            });
         } 
      });
   }
}