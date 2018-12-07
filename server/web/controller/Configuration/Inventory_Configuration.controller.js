var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************* Inventory Configuration ************************************************

// ----------------------------------------- Inventory Config Create --------------------------------------------
   exports.InventoryConfig_Create = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else if(!ReceivingData.Multiple_Warehouse || ReceivingData.Multiple_Warehouse === '') {
         res.status(400).send({Status: false, Message: 'Multiple Warehouse Detail cannot be empty'});
      } else if(!ReceivingData.Sales_Update_Stock_by || ReceivingData.Sales_Update_Stock_by === '') {
         res.status(400).send({Status: false, Message: 'Sales Update Stock cannot be empty'});
      } else if(!ReceivingData.Sales_Create_Back_Order || ReceivingData.Sales_Create_Back_Order === '') {
         res.status(400).send({Status: false, Message: 'Sales Create Back Order cannot be empty'});
      } else if(!ReceivingData.Purchase_Update_Stock_by || ReceivingData.Purchase_Update_Stock_by === '') {
         res.status(400).send({Status: false, Message: 'Purchase Update Stock cannot be empty'});
      } else if(!ReceivingData.Purchase_Create_Back_Order || ReceivingData.Purchase_Create_Back_Order === '') {
         res.status(400).send({Status: false, Message: 'Purchase Create Back Order cannot be empty'});
      } else {
         var Create_InventoryConfig = new ConfigurationModel.InventoryConfigSchema({
            Multiple_Warehouse: ReceivingData.Multiple_Warehouse,
            Sales_Update_Stock_by: ReceivingData.Sales_Update_Stock_by,
            Sales_Create_Back_Order: ReceivingData.Sales_Create_Back_Order,
            Purchase_Update_Stock_by: ReceivingData.Purchase_Update_Stock_by,
            Purchase_Create_Back_Order: ReceivingData.Purchase_Create_Back_Order,
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status: true,
            If_Deleted: false
         });
         Create_InventoryConfig.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Configuration Creation Query Error', 'Inventory_Configuration.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Inventory Configuration!."});
            } else {
               res.status(200).send({Status: true, Message: 'Inventory Configuration Created Successfully!' });
            }
         });
      }
   };

// ----------------------------------------- Inventory Config List --------------------------------------------
   exports.InventoryConfig_List = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));      
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else {
         ConfigurationModel.InventoryConfigSchema
         .findOne({ Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Configuration Find Query Error', 'Inventory_Configuration.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Inventory Configuration!."});
            } else {               
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// ----------------------------------------- Inventory Config Update --------------------------------------------
   exports.InventoryConfig_Update = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info, 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else if(!ReceivingData.InventoryConfig_Id || ReceivingData.InventoryConfig_Id === ''){
         res.status(400).send({Status: false, Message: 'Pervious Inventory Config details cannot be empty'});
      } else if(!ReceivingData.Multiple_Warehouse || ReceivingData.Multiple_Warehouse === '') {
         res.status(400).send({Status: false, Message: 'Multiple Warehouse Detail cannot be empty'});
      } else if(!ReceivingData.Sales_Update_Stock_by || ReceivingData.Sales_Update_Stock_by === '') {
         res.status(400).send({Status: false, Message: 'Sales Update Stock cannot be empty'});
      } else if(!ReceivingData.Sales_Create_Back_Order || ReceivingData.Sales_Create_Back_Order === '') {
         res.status(400).send({Status: false, Message: 'Sales Create Back Order cannot be empty'});
      } else if(!ReceivingData.Purchase_Update_Stock_by || ReceivingData.Purchase_Update_Stock_by === '') {
         res.status(400).send({Status: false, Message: 'Purchase Update Stock cannot be empty'});
      } else if(!ReceivingData.Purchase_Create_Back_Order || ReceivingData.Purchase_Create_Back_Order === '') {
         res.status(400).send({Status: false, Message: 'Purchase Create Back Order cannot be empty'});
      } else {
         ConfigurationModel.InventoryConfigSchema
         .updateOne({'_id': mongoose.Types.ObjectId(ReceivingData.InventoryConfig_Id), Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Active_Status: true, If_Deleted: false}, {$set: {Active_Status: false}})
         .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Configuration Update Query Error', 'Inventory_Configuration.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Update The Inventory Configuration!."});
            } else {
               var Update_InventoryConfig = new ConfigurationModel.InventoryConfigSchema({
                  Multiple_Warehouse: ReceivingData.Multiple_Warehouse,
                  Sales_Update_Stock_by: ReceivingData.Sales_Update_Stock_by,
                  Sales_Create_Back_Order: ReceivingData.Sales_Create_Back_Order,
                  Purchase_Update_Stock_by: ReceivingData.Purchase_Update_Stock_by,
                  Purchase_Create_Back_Order: ReceivingData.Purchase_Create_Back_Order,
                  Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                  Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Active_Status: true,
                  If_Deleted: false
               });
               Update_InventoryConfig.save(function(err_1, result_1){
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Configuration Creation Query Error', 'Inventory_Configuration.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Inventory Configuration!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Inventory Configuration Updated Successfully' });
                  }
               });
            }
         });
      }
   };