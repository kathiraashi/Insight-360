var CryptoJS = require("crypto-js");
var CRMSettingsModel = require('./../../models/settings/CRM_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');





// ************************************************** Industry Type *****************************************************
   // Industry Type Create -----------------------------------------------
      exports.Industry_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_IndustryType = new CRMSettingsModel.IndustryTypeSchema({
               Industry_Type: ReceivingData.Industry_Type, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_IndustryType.save(function(err, result) { // Industry Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Industry Type!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type List -----------------------------------------------
      exports.Industry_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type Simple List -----------------------------------------------
      exports.Industry_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type Update -----------------------------------------------
      exports.Industry_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         }else if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.Industry_Type = ReceivingData.Industry_Type;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Industry Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(400).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Industry Type!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Industry Type Delete -----------------------------------------------
      exports.Industry_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Industry Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(400).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Industry Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Ownership Type *****************************************************
   // Ownership Type Create -----------------------------------------------
   exports.Ownership_Type_Create = function(req, res) {
      res.status(200).send({ Status: true,  Response: 'Test' });
   };
// Ownership Type List -----------------------------------------------
   exports.Ownership_Type_List = function(req, res) {
      res.status(200).send({ Status: true,  Response: 'Test' });
   };
// Ownership Type Simple List -----------------------------------------------
   exports.Ownership_Type_SimpleList = function(req, res) {
      res.status(200).send({ Status: true,  Response: 'Test' });
   };
// Ownership Type Update -----------------------------------------------
   exports.Ownership_Type_Update = function(req, res) {
      res.status(200).send({ Status: true,  Response: 'Test' });
   };
// Ownership Type Delete -----------------------------------------------
   exports.Ownership_Type_Delete = function(req, res) {
      res.status(200).send({ Status: true,  Response: 'Test' });
   };