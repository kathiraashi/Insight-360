var CryptoJS = require("crypto-js");
var InventorySettingsModel = require('./../../models/settings/Inventory_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************************** Ware House *****************************************************
   // -------------------------------------------------- Ware House Async Validate -----------------------------------------------
   exports.Ware_House_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Ware_House_Name || ReceivingData.Ware_House_Name === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Name can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         InventorySettingsModel.WareHouseSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Ware_House_Name': { $regex : new RegExp("^" + ReceivingData.Ware_House_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Ware House Find Query Error', 'Inventory_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Ware House!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };

// Ware House Create -----------------------------------------------
   exports.Ware_House_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Ware_House_Name || ReceivingData.Ware_House_Name === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Name can not be empty" });
      } else if(!ReceivingData.Ware_House_Code || ReceivingData.Ware_House_Code === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Code can not be empty" });
      } else if(!ReceivingData.Address || ReceivingData.Address === '' ) {
         res.status(400).send({Status: false, Message: "Address can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_WareHouse = new InventorySettingsModel.WareHouseSchema({
            Ware_House_Name: ReceivingData.Ware_House_Name, 
            Ware_House_Code: ReceivingData.Ware_House_Code, 
            Address: ReceivingData.Address, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_WareHouse.save(function(err, result) { // Ware House Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House Creation Query Error', 'Inventory_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Ware House!."});
            } else {
               InventorySettingsModel.WareHouseSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Ware House FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House Find Query Error', 'Inventory_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Ware House!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Ware House List -----------------------------------------------
   exports.Ware_House_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         InventorySettingsModel.WareHouseSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Ware House FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House Find Query Error', 'Inventory_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ware House!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Ware House Simple List -----------------------------------------------
   exports.Ware_House_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         InventorySettingsModel.WareHouseSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Pt_No : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Ware House FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House Find Query Error', 'Inventory_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ware House!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Ware House Update -----------------------------------------------
   exports.Ware_House_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Ware_House_Id || ReceivingData.Ware_House_Id === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Id can not be empty" });
      }else if(!ReceivingData.Ware_House_Name || ReceivingData.Ware_House_Name === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Name can not be empty" });
      }  else if(!ReceivingData.Ware_House_Code || ReceivingData.Ware_House_Code === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Code can not be empty" });
      } else if(!ReceivingData.Address || ReceivingData.Address === '' ) {
         res.status(400).send({Status: false, Message: "Address can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         InventorySettingsModel.WareHouseSchema.findOne({'_id': ReceivingData.Ware_House_Id}, {}, {}, function(err, result) { //  Ware House FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings  Ware House FindOne Query Error', 'Inventory_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The  Ware House !."});
            } else {
               if (result !== null) {
                  result.Ware_House_Name = ReceivingData.Ware_House_Name;
                  result.Ware_House_Code = ReceivingData.Ware_House_Code;
                  result.Address = ReceivingData.Address; 
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { //  Ware House Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings  Ware House Update Query Error', 'Inventory_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Ware House!."});
                     } else {
                        InventorySettingsModel.WareHouseSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { // Ware House FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings  Ware House Find Query Error', 'Inventory_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The  Ware House!."});
                           } else { 
                           
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Ware House Id can not be valid!" });
               }
            }
         });
      }
   };

// Ware House Delete -----------------------------------------------
   exports.Ware_House_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Ware_House_Id || ReceivingData.Ware_House_Id === '' ) {
         res.status(400).send({Status: false, Message: "Ware House Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         InventorySettingsModel.WareHouseSchema.findOne({'_id': ReceivingData.Ware_House_Id}, {}, {}, function(err, result) { // Ware House FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House FindOne Query Error', 'Inventory_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Ware House!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Ware House Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Settings Ware House Delete Query Error', 'Inventory_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Ware House!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Ware House Id can not be valid!" });
               }
            }
         });
      }
   };