var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************************** Crm Configuration *****************************************
// Crm Configuration Create
exports.CrmConfig_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      var Create_CrmConfig = new ConfigurationModel.CrmConfigurationSchema({
         Add_Name_in_Quote: ReceivingData.Add_Name_in_Quote,
         Tax: ReceivingData.Tax,
         Discount: ReceivingData.Discount,
         Discount_Value: ReceivingData.Discount_Value,
         Quote_Ref_Number: ReceivingData.Quote_Ref_Number,
         Quote_Ref_Number_Prefix: ReceivingData.Quote_Ref_Number_Prefix,
         Quote_Ref_Number_Suffix: ReceivingData.Quote_Ref_Number_Suffix,
         Quote_Ref_Number_Starting: ReceivingData.Quote_Ref_Number_Starting,
         Quote_Ref_Number_Based: ReceivingData.Quote_Ref_Number_Based,
         Quote_Ref_Number_Custom_Date: ReceivingData.Quote_Ref_Number_Custom_Date,
         Quote_Ref_Number_Custom_Month: ReceivingData.Quote_Ref_Number_Custom_Month,
         Invoice_Ref_Number: ReceivingData.Invoice_Ref_Number,
         Invoice_Ref_Number_Prefix: ReceivingData.Invoice_Ref_Number_Prefix,
         Invoice_Ref_Number_Suffix: ReceivingData.Invoice_Ref_Number_Suffix,
         Invoice_Ref_Number_Starting: ReceivingData.Invoice_Ref_Number_Starting,
         Invoice_Ref_Number_Based: ReceivingData.Invoice_Ref_Number_Based,
         Invoice_Ref_Number_Custom_Date: ReceivingData.Invoice_Ref_Number_Custom_Date,
         Invoice_Ref_Number_Custom_Month: ReceivingData.Invoice_Ref_Number_Custom_Month,
         Customer: ReceivingData.Customer,
         Sale_Ref_Number: ReceivingData.Sale_Ref_Number,
         Sale_Ref_Number_Prefix: ReceivingData.Sale_Ref_Number_Prefix,
         Sale_Ref_Number_Suffix: ReceivingData.Sale_Ref_Number_Suffix,
         Sale_Ref_Number_Starting: ReceivingData.Sale_Ref_Number_Starting,
         Sale_Ref_Number_Based: ReceivingData.Sale_Ref_Number_Based,
         Sale_Ref_Number_Custom_Date: ReceivingData.Sale_Ref_Number_Custom_Date,
         Sale_Ref_Number_Custom_Month: ReceivingData.Sale_Ref_Number_Custom_Month,
         AMC_Invoice: ReceivingData.AMC_Invoice,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmConfig.save(function(err, result) {
         if(err) {            
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Configuration Create Query Error', 'Crm_Configuration.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Create the Crm Configuration!."});
         } else {
            res.status(200).send({Status: true, Message: 'Crm Configuration Successfully Created' });
         }
      });
   } 
}

// Crm Configuration List
exports.CrmConfig_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      ConfigurationModel.CrmConfigurationSchema
      .findOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Configuration Find Query Error', 'Crm_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Crm Configuration!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// Crm Configuration Update
exports.CrmConfig_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      ConfigurationModel.CrmConfigurationSchema
      .updateOne({_id: mongoose.Types.ObjectId(ReceivingData.CrmConfig_Id), Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {$set: {Active_Status: false}}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Configuration Find Query Error', 'Crm_Configuration.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Crm Configuration!."});
         } else {
            var Create_CrmConfig = new ConfigurationModel.CrmConfigurationSchema({
               Add_Name_in_Quote: ReceivingData.Add_Name_in_Quote,
               Tax: ReceivingData.Tax,
               Discount: ReceivingData.Discount,
               Discount_Value: ReceivingData.Discount_Value,
               Quote_Ref_Number: ReceivingData.Quote_Ref_Number,
               Quote_Ref_Number_Prefix: ReceivingData.Quote_Ref_Number_Prefix,
               Quote_Ref_Number_Suffix: ReceivingData.Quote_Ref_Number_Suffix,
               Quote_Ref_Number_Starting: ReceivingData.Quote_Ref_Number_Starting,
               Quote_Ref_Number_Based: ReceivingData.Quote_Ref_Number_Based,
               Quote_Ref_Number_Custom_Date: ReceivingData.Quote_Ref_Number_Custom_Date,
               Quote_Ref_Number_Custom_Month: ReceivingData.Quote_Ref_Number_Custom_Month,
               Invoice_Ref_Number: ReceivingData.Invoice_Ref_Number,
               Invoice_Ref_Number_Prefix: ReceivingData.Invoice_Ref_Number_Prefix,
               Invoice_Ref_Number_Suffix: ReceivingData.Invoice_Ref_Number_Suffix,
               Invoice_Ref_Number_Starting: ReceivingData.Invoice_Ref_Number_Starting,
               Invoice_Ref_Number_Based: ReceivingData.Invoice_Ref_Number_Based,
               Invoice_Ref_Number_Custom_Date: ReceivingData.Invoice_Ref_Number_Custom_Date,
               Invoice_Ref_Number_Custom_Month: ReceivingData.Invoice_Ref_Number_Custom_Month,
               Customer: ReceivingData.Customer,
               Sale_Ref_Number: ReceivingData.Sale_Ref_Number,
               Sale_Ref_Number_Prefix: ReceivingData.Sale_Ref_Number_Prefix,
               Sale_Ref_Number_Suffix: ReceivingData.Sale_Ref_Number_Suffix,
               Sale_Ref_Number_Starting: ReceivingData.Sale_Ref_Number_Starting,
               Sale_Ref_Number_Based: ReceivingData.Sale_Ref_Number_Based,
               Sale_Ref_Number_Custom_Date: ReceivingData.Sale_Ref_Number_Custom_Date,
               Sale_Ref_Number_Custom_Month: ReceivingData.Sale_Ref_Number_Custom_Month,
               AMC_Invoice: ReceivingData.AMC_Invoice,
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false
            });
            Create_CrmConfig.save(function(err_1, result_1) {
               if(err_1) {            
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Configuration Create Query Error', 'Crm_Configuration.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Create the Crm Configuration!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Crm Configuration Successfully Updated' });
               }
            });
         } 
      });
   }
}