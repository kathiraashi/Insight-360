var CryptoJS = require("crypto-js");
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************* Product Configuration ************************************************

// ----------------------------------------- Product Config Create --------------------------------------------
   exports.ProductConfig_Create = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else if(!ReceivingData.Product_Variants || ReceivingData.Product_Variants === ''){
         res.status(400).send({Status: false, Message: 'Product Variant Detail cannot be empty'});
      } else if(!ReceivingData.Bar_Code || ReceivingData.Bar_Code === ''){
         res.status(400).send({Status: false, Message: 'Bar Code Detail cannot be empty'});
      } else if(!ReceivingData.Item_Code || ReceivingData.Item_Code === ''){
         res.status(400).send({Status: false, Message: 'Item Code Details cannot be empty'});
      } else if(!ReceivingData.HSN_Code || ReceivingData.HSN_Code === ''){
         res.status(400).send({Status: false, Message: 'HSN Code Details cannot be empty'});
      } else if(!ReceivingData.Price_List || ReceivingData.Price_List === ''){
         res.status(400).send({Status: false, Message: 'Price List Details cannot be empty'});
      } else {
         var Create_ProductConfig = new ConfigurationModel.ProductConfigSchema({
            Product_Variants: ReceivingData.Product_Variants,
            Bar_Code: ReceivingData.Bar_Code,
            Item_Code: ReceivingData.Item_Code,
            HSN_Code: ReceivingData.HSN_Code,
            Price_List: ReceivingData.Price_List,
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status: true,
            If_Deleted: false
         });
         Create_ProductConfig.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Creation Query Error', 'Product_Configuration.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Product Configuration!."});
            } else {
               ConfigurationModel.ProductConfigSchema
               .findOne({'_id': result._id})
               .findOne({'_id': result._id})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Find Query Error', 'Product_Configuration.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while Find the Product Configuration!."});
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

// ----------------------------------------- Product Config List --------------------------------------------
   exports.ProductConfig_List = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else {
         ConfigurationModel.ProductConfigSchema
         .findOne({Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Find Query Error', 'Product_Configuration.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Configuration!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// ----------------------------------------- Inventory Config Update --------------------------------------------
   exports.ProductConfig_Update = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info, 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
         res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
      } else if(!ReceivingData.ProductConfig_Id || ReceivingData.ProductConfig_Id === ''){
         res.status(400).send({Status: false, Message: 'Pervious Product Config details cannot be empty'});
      } else if(!ReceivingData.Product_Variants || ReceivingData.Product_Variants === '') {
         res.status(400).send({Status: false, Message: 'Product_Variants Detail cannot be empty'});
      } else if(!ReceivingData.Bar_Code || ReceivingData.Bar_Code === '') {
         res.status(400).send({Status: false, Message: 'Bar Code cannot be empty'});
      } else if(!ReceivingData.Item_Code || ReceivingData.Item_Code === '') {
         res.status(400).send({Status: false, Message: 'Item Code cannot be empty'});
      } else if(!ReceivingData.HSN_Code || ReceivingData.HSN_Code === '') {
         res.status(400).send({Status: false, Message: 'HSN Code cannot be empty'});
      } else if(!ReceivingData.Price_List || ReceivingData.Price_List === '') {
         res.status(400).send({Status: false, Message: 'Price List cannot be empty'});
      } else {
         ConfigurationModel.ProductConfigSchema
         .updateOne({'_id': ReceivingData.ProductConfig_Id, Active_Status: true, If_Deleted: false, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {$set: {Active_Status: false}}, {})
         .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Update Query Error', 'Product_Configuration.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Update The Product Configuration!."});
            } else {
               var Update_ProductConfig = new ConfigurationModel.ProductConfigSchema({
                  Product_Variants: ReceivingData.Product_Variants,
                  Bar_Code: ReceivingData.Bar_Code,
                  Item_Code: ReceivingData.Item_Code,
                  HSN_Code: ReceivingData.HSN_Code,
                  Price_List: ReceivingData.Price_List,
                  Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                  Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Active_Status: true,
                  If_Deleted: false
               });
               Update_ProductConfig.save(function(err_1, result_1){
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Creation Query Error', 'Product_Configuration.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Product Configuration!."});
                  } else {
                     ConfigurationModel.ProductConfigSchema
                     .findOne({'_id': result_1._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_2, result_2) { //Product Config query
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Configuration Find Query Error', 'Product_Configuration.controller.js', err_1);
                           res.status(417).send({status: false, Message: "Some error occurred while Find The Product Configuration!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            }
         });
      }
   };

