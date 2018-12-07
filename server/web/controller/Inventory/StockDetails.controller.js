var CryptoJS = require("crypto-js");
var ProductModel = require('../../models/Product/Product.model.js');
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var CrmModel = require('../../models/CRM/Crm.model.js');
var InventoryModel = require('./../../models/Inventory/Inventory.model.js');
var WareHouseModel = require('./../../models/settings/Inventory_Settings.model')
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ------------------------------- Stock Details -----------------------------
// Stock Details List
exports.InventoryStockDetails_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      InventoryModel.Inventory_StockDetailsSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false}, {WareHouse_Id: 1, Product_Id: 1, End_Quantity: 1}, {sort: {updatedAt: -1}})
      .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute'] })
      .populate({ path: 'WareHouse_Id', select: ['Ware_House_Name', 'Address'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock Details List Query Error', 'StockDetails.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Stock Detail!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}
// Stock view
exports.InventoryStockDetails_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Stock_Id || ReceivingData.Stock_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else {
      InventoryModel.Inventory_StockDetailsSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Stock_Id)}, {End_Quantity: 1, WareHouse_Id: 1, Product_Id: 1, In_or_Out: 1})
      .populate({ path: 'WareHouse_Id', select: ['Ware_House_Name', 'Address'] })
      .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute'] })
      .exec(function(err_1, result_1) {
         if (err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock Details finding Query Error', 'StockDetails.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while finding the Stock Detail!."});
         } else {
            InventoryModel.Inventory_StockDetails_History_Schema
            .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Product_Id: mongoose.Types.ObjectId(result_1.Product_Id._id), WareHouse_Id: mongoose.Types.ObjectId(result_1.WareHouse_Id._id)}, {createdAt: 1, Reference_Key: 1, Start_Quantity: 1, End_Quantity: 1, Processed_Quantity: 1, WareHouse_Id: 1, In_or_Out: 1}, {sort: { createdAt: 1, updatedAt: 1}})
            .populate({ path: 'WareHouse_Id', select: ['Ware_House_Name', 'Address'] })
            .exec(function(err_2, result_2) {
               if (err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock History Details finding Query Error', 'StockDetails.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while finding the Stock history Detail!."});
               } else {
                  const Data = {'Stock_Details': result_1, 'Stock_History_Details': result_2};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            })
         }
      })
   }
   
}
// Stock Add
exports.InventoryStockDetails_Add = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else  if(!ReceivingData.WareHouse_Id || ReceivingData.WareHouse_Id === '') {
      res.status(400).send({Status: false, Message: 'WareHouse Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_Quote_ProductSchema
      .find({Purchase_Quote_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product find Query Error', 'StockDetails.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Find the Product!."});
         } else {
            const FindStock = (result) => Promise.all(
               result.map(obj => AddStock(obj))
            ).then(response  => {
               if(response) {
                  PurchaseModel.Purchase_QuoteSchema
                  .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { Quote_Status: 'Received', Status: 'Received'}})
                  .exec(function(err_2, result_2){
                     if(err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock add Query Error', 'StockDetails.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while update stock!."});
                     } else {
                        res.status(200).send({Status: true, Message: "Stock Updated Successfully."});
                     }
                  });
               }
            });
            const AddStock = (info) => Promise.all([
               InventoryModel.Inventory_StockDetailsSchema.findOne({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}),
               InventoryModel.Inventory_StockDetailsSchema.update({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}, {$inc: {End_Quantity: parseInt(info.Quantity)}})
            ]).then(response => {
               if(response[0] !== null) {
                  var Create_Stock_History =  new InventoryModel.Inventory_StockDetails_History_Schema({
                     History_StockDetails_Id : mongoose.Types.ObjectId(response[0]._id),
                     Product_Id : mongoose.Types.ObjectId(response[0].Product_Id),
                     WareHouse_Id : mongoose.Types.ObjectId(response[0].WareHouse_Id),
                     Start_Quantity : response[0].End_Quantity,
                     Processed_Quantity : info.Quantity,
                     End_Quantity :  parseInt(response[0].End_Quantity) + parseInt(info.Quantity),
                     Reference_Id : mongoose.Types.ObjectId(ReceivingData.Order_Id),
                     Reference_Key : ReceivingData.Reference_Key,
                     In_or_Out : 'In',
                     Company_Id : mongoose.Types.ObjectId(response[0].Company_Id),
                     Created_By : mongoose.Types.ObjectId(response[0].Created_By),
                     Last_Modified_By : mongoose.Types.ObjectId(response[0].Last_Modified_By),
                     Active_Status : true,
                     If_Deleted : false
                  });
                  Create_Stock_History.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock History Create Query Error', 'StockDetails.controller.js');
                     } else {
                        return result_1;
                     }
                  });
               } 
               return response[0];
            });
            FindStock(result);
         }
      });

   }
}

// Stock Remove
exports.InventoryStockDetails_Remove = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else  if(!ReceivingData.WareHouse_Id || ReceivingData.WareHouse_Id === '') {
      res.status(400).send({Status: false, Message: 'WareHouse Details cannot be empty'});
   } else {
      CrmModel.CrmQuote_ProductSchema
      .find({Crm_Quote_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product find Query Error', 'StockDetails.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Find the Product!."});
         } else {
            const FindStock = (result) => Promise.all(
               result.map(obj => RemoveStock(obj))
            ).then(response  => {
               if(response) {
                  CrmModel.CrmSaleOrderSchema
                  .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.SaleOrder_Id)}, {$set: { SaleOrder_Status: 'Delivered', Status: 'Delivered'}},)
                  .exec(function(err_2, result_2){
                     if(err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock add Query Error', 'StockDetails.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while update stock!."});
                     } else {
                        res.status(200).send({Status: true, Message: "Stock Updated Successfully."});
                     }
                  });
               }
            });
            const RemoveStock = (info) => Promise.all([
               InventoryModel.Inventory_StockDetailsSchema.findOne({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}),
               InventoryModel.Inventory_StockDetailsSchema.update({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}, {$inc: {End_Quantity: -(parseInt(info.Quantity))}})
            ]).then(response => {
               if(response[0] !== null) {
                  var Create_Stock_History =  new InventoryModel.Inventory_StockDetails_History_Schema({
                     History_StockDetails_Id : mongoose.Types.ObjectId(response[0]._id),
                     Product_Id : mongoose.Types.ObjectId(response[0].Product_Id),
                     WareHouse_Id : mongoose.Types.ObjectId(response[0].WareHouse_Id),
                     Start_Quantity : response[0].End_Quantity,
                     Processed_Quantity : info.Quantity,
                     End_Quantity : parseInt(response[0].End_Quantity) - parseInt(info.Quantity),
                     Reference_Id : mongoose.Types.ObjectId(ReceivingData.SaleOrder_Id),
                     Reference_Key : ReceivingData.Reference_Key,
                     In_or_Out : 'Out',
                     Company_Id : mongoose.Types.ObjectId(response[0].Company_Id),
                     Created_By : mongoose.Types.ObjectId(response[0].Created_By),
                     Last_Modified_By : mongoose.Types.ObjectId(response[0].Last_Modified_By),
                     Active_Status : true,
                     If_Deleted : false
                  });
                  Create_Stock_History.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock History Create Query Error', 'StockDetails.controller.js');
                     } else {
                        return result_1;
                     }
                  });
               } 
               return response[0];
            });
            FindStock(result);
         }
      });

   }
}

// check stoke availability
exports.InventoryStockDetails_Availability = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else  if(!ReceivingData.WareHouse_Id || ReceivingData.WareHouse_Id === '') {
      res.status(400).send({Status: false, Message: 'WareHouse Details cannot be empty'});
   } else {
      CrmModel.CrmQuote_ProductSchema
      .find({Crm_Quote_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product find Query Error', 'StockDetails.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Find the Product!."});
         } else {
            const FindStock = (result) =>  Promise.all(
               result.map(obj => StockAvailability(obj))
            ).then(response => {
               const AvailabilityResult = response.every(x => x === true)
               if(AvailabilityResult) {
                  res.status(200).send({Status: true})
               } else {
                  res.status(200).send({Status: false})
               }
            });
            const StockAvailability = (info) =>Promise.all([
               InventoryModel.Inventory_StockDetailsSchema.findOne({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}),
            ]).then(response => {
               if(response[0] !== null) {
                  if(response[0].End_Quantity > info.Quantity) {
                     return true;
                  } else {
                     return false;
                  }
               } else{
                  return false;
               }
            });
            FindStock(result);
         }
      });
   }
}