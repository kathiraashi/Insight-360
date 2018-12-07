var CryptoJS = require("crypto-js");
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var InventoryModel = require('./../../models/Inventory/Inventory.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************** To Receive **************************
// To Receive List
// Purchase Order List
exports.ToReceive_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      InventoryModel.Inventory_ToReceiveSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, 
      {Order_Ref_Number: 1, ToReceive_Ref_Number: 1, Valid_Date: 1, Vendor_Name: 1, Contact:1, Created_By: 1, ToReceive_Status: 1, Status: 1, createdAt: 1, updatedAt: 1},
      {sort: { createdAt: -1, updatedAt: -1}})
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Contact', select: ['Name']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive List Query Error', 'ToReceive.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the ToReceive!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// To Receive Create form Purchase Order
exports.ToReceive_Convert = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details Cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {})
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Contact', select: ['Name']})
      .populate({ path: 'Global_Product_Tax', select: ['Tax_Name']})
      .populate({ path: 'Purchase_Request_Number', select: ['Requested_Number']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Finding Query Error', 'ToReceive.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding the Quote!."});
         } else {
            PurchaseModel.Purchase_Quote_ProductSchema
            .find({Purchase_Quote_Id: mongoose.Types.ObjectId(result._id)}, {})
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .populate({ path: 'Product_Tax', select: ['Tax_Name']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote view Query Error', 'ToReceive.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
               } else {
                  InventoryModel.Inventory_ToReceiveSchema
                  .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {ToReceive_Number_Length: -1}, {sort: {ToReceive_Number_Length: -1}, limit: 1})
                  .exec(function(ToReceiveNumberErr, ToReceiveNumberResult){
                     if (ToReceiveNumberErr) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Ref Number Query Error', 'ToReceive.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Finding the ToReceive Ref Number!."});
                     } else {
                        var number = (ToReceiveNumberResult.length > 0) ? ToReceiveNumberResult[0].ToReceive_Number_Length + 1 : 1;
                        const ToReceive_Last_Number = number.toString().padStart(6, 0);
                        const ToReceiveRefNumber = "PurchaseOrder/" + ToReceive_Last_Number;
            
                        var tempPurchaseRequestNumber = null;
                        if(result.Purchase_Request_Number !== null) {
                           tempPurchaseRequestNumber = mongoose.Types.ObjectId(result.Purchase_Request_Number._id);
                        } else {
                           tempPurchaseRequestNumber = null;
                        }
            
                        var Create_ToReceive = new InventoryModel.Inventory_ToReceiveSchema({
                           Reference_Model: 'PurchaseQuote',
                           Reference_Id: mongoose.Types.ObjectId(result._id),
                           Purchase_Order_Id: mongoose.Types.ObjectId(result._id),
                           ToReceive_Ref_Number: ToReceiveRefNumber,
                           ToReceive_Number_Length: ToReceive_Last_Number,
                           Vendor_Name: mongoose.Types.ObjectId(result.Vendor_Name._id),
                           Contact: mongoose.Types.ObjectId(result.Contact._id),
                           Quote_Date: result.Quote_Date,
                           Valid_Date: result.Valid_Date,
                           Quote_Ref_Number: result.Quote_Ref_Number,
                           Order_Ref_Number: result.Order_Ref_Number,
                           Purchase_Request_Number: tempPurchaseRequestNumber,
                           Subject: result.Subject,
                           ToReceive_Status: 'Awaiting Receive',
                           Status: 'Awaiting_Receive',
                           Company_Id: mongoose.Types.ObjectId(result.Company_Id),
                           Created_By: mongoose.Types.ObjectId(result.User_Id),
                           Last_Modified_By: mongoose.Types.ObjectId(result.User_Id),
                           Active_Status: true,
                           If_Deleted: false,
                        });
                        Create_ToReceive.save(function(err_3, result_3) {
                           if(err_3) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Creation Query Error', 'ToReceive.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while creating the ToReceive!."});
                           } else {
                              const itemArray = result_1.map(obj => {
                                 const newObj = {
                                    Inventory_ToReceive_Id: mongoose.Types.ObjectId(result_3._id),
                                    Product_Id: mongoose.Types.ObjectId(obj.Product_Id._id),
                                    Description: obj.Description,
                                    Quantity: obj.Quantity,
                                    Approved_Quantity: obj.Quantity
                                 };             
                                 return newObj;
                              });
                              InventoryModel.Inventory_ToReceive_ProductSchema.collection.insert(itemArray, function(err_5, result_5) {
                                 if(err_5) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Product Creation Query Error', 'ToReceive.controller.js');
                                    res.status(417).send({Status: false, Message: "Some error occurred while creating the ToReceive Product!."});
                                 } else {
                                    PurchaseModel.Purchase_QuoteSchema
                                    .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { Quote_Status: 'Awaiting Receive', Status: 'Awaiting_Receive'}})
                                    .exec(function(UpdateErr, UpdateResult) {
                                      if(UpdateErr) {
                                       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Order Status Update Query Error', 'ToReceive.controller.js');
                                       res.status(417).send({Status: false, Message: "Some error occurred while updating the Purchase Order Status!."});
                                      } else {
                                       res.status(200).send({Status: true, Message: "To Receive Created Successfully"});
                                      }
                                    });
                                 }
                              });
                           }
                        });
                     }
                  });
               }
            });
         }
      });
   }
}

// To Receive update 
exports.ToReceive_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.InventoryOrder_Id || ReceivingData.InventoryOrder_Id === '') {
      res.status(400).send({Status: false, Message: 'ToReceive Details cannot be empty'});
   } else {
      const FindProduct = (result) => Promise.all(
         result.map(obj => updateProduct(obj))
      ).then(response => {
         if (response) {
            res.status(200).send({Status: true, Message: "To Receive Product's Edited Successfully."});
         }
      });
      const updateProduct = (info) => Promise.all([
         InventoryModel.Inventory_ToReceive_ProductSchema
         .update({Inventory_ToReceive_Id: mongoose.Types.ObjectId(ReceivingData.InventoryOrder_Id), Product_Id: mongoose.Types.ObjectId(info.Product)},
         {$set: {Approved_Quantity: info.Approved_Quantity}})
      ]).then(response => {
         if (response[0] !== null) {
            return true;
         }
      });
      FindProduct(ReceivingData.items);
   }
}

// To Receive BackOrder
exports.ToReceive_CreateBackOrder = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'ToReceive Details cannot be empty'});
   } else {
      InventoryModel.Inventory_ToReceiveSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err_1, result_1) {
         if (err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'To Receive Order Find Query Error', 'ToReceive.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding the ToReceive!."});
         } else {            
            InventoryModel.Inventory_ToReceive_ProductSchema
            .find({Inventory_ToReceive_Id: mongoose.Types.ObjectId(result_1._id)}, {}, {})
            .exec(function(err_2, result_2) {
               if (err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'To Receive Product Find Update Query Error', 'ToReceive.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Finding the ToReceive Products!."});
               } else {
                  InventoryModel.Inventory_ToReceiveSchema
                  .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {ToReceive_Number_Length: -1}, {sort: {ToReceive_Number_Length: -1}, limit: 1})
                  .exec(function(ToReceiveNumberErr, ToReceiveNumberResult){
                     if (ToReceiveNumberErr) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Ref Number Query Error', 'ToReceive.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Finding the ToReceive Ref Number!."});
                     } else {
                        var number = (ToReceiveNumberResult.length > 0) ? ToReceiveNumberResult[0].ToReceive_Number_Length + 1 : 1;
                        const ToReceive_Last_Number = number.toString().padStart(6, 0);
                        const ToReceiveRefNumber = "PurchaseOrder/" + ToReceive_Last_Number;
            
                        var tempPurchaseRequestNumber = null;
                        if(result_1.Purchase_Request_Number !== null) {
                           tempPurchaseRequestNumber = mongoose.Types.ObjectId(result_1.Purchase_Request_Number);
                        } else {
                           tempPurchaseRequestNumber = null;
                        }
                        var Create_ToReceive = new InventoryModel.Inventory_ToReceiveSchema({
                           Reference_Model: 'Inventory_ToReceive',
                           Reference_Id: mongoose.Types.ObjectId(result_1._id),
                           Purchase_Order_Id: mongoose.Types.ObjectId(result_1.Purchase_Order_Id),
                           ToReceive_Ref_Number: ToReceiveRefNumber,
                           ToReceive_Number_Length: ToReceive_Last_Number,
                           Vendor_Name: mongoose.Types.ObjectId(result_1.Vendor_Name._id),
                           Contact: mongoose.Types.ObjectId(result_1.Contact._id),
                           Quote_Date: result_1.Quote_Date,
                           Valid_Date: result_1.Valid_Date,
                           Quote_Ref_Number: result_1.Quote_Ref_Number,
                           Order_Ref_Number: result_1.Order_Ref_Number,
                           Purchase_Request_Number: tempPurchaseRequestNumber,
                           Subject: result_1.Subject,
                           ToReceive_Status: 'Awaiting Receive',
                           Status: 'Awaiting_Receive',
                           Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                           Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Active_Status: true,
                           If_Deleted: false,
                        });
                        Create_ToReceive.save(function(err_3, result_3) {
                           if(err_3) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Creation Query Error', 'ToReceive.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while creating the ToReceive!."});
                           } else {
                              const itemArray = result_2.map(obj => {
                                 const newObj = {
                                    Inventory_ToReceive_Id: mongoose.Types.ObjectId(result_3._id),
                                    Product_Id: mongoose.Types.ObjectId(obj.Product_Id._id),
                                    Description: obj.Description,
                                    Quantity: parseInt(obj.Quantity) - parseInt(obj.Approved_Quantity),
                                    Approved_Quantity: parseInt(obj.Quantity) - parseInt(obj.Approved_Quantity)
                                 };             
                                 return newObj;
                              });
                              InventoryModel.Inventory_ToReceive_ProductSchema.collection.insert(itemArray, function(err_4, result_4) {
                                 if(err_4) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive Product Creation Query Error', 'ToReceive.controller.js');
                                    res.status(417).send({Status: false, Message: "Some error occurred while creating the ToReceive Product!."});
                                 } else {
                                    PurchaseModel.Purchase_QuoteSchema
                                    .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(result_1.Purchase_Order_Id)}, {$set: { Quote_Status: 'Partially Receive', Status: 'Partially_Receive'}})
                                    .exec(function(UpdateErr, UpdateResult) {
                                      if(UpdateErr) {
                                       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Order Status Update Query Error', 'ToReceive.controller.js');
                                       res.status(417).send({Status: false, Message: "Some error occurred while updating the Purchase Order Status!."});
                                      } else {
                                       res.status(200).send({Status: true, Message: "Back Order Created Successfully"});
                                    }
                                    });
                                 }
                              });
                           }
                        });
                     }
                  });
               }
            });
         }
      });
   }
}

// Stock Add
exports.ToReceiveStockDetails_Add = function(req, res) {
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
      InventoryModel.Inventory_ToReceiveSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err_0, result_0) {
         InventoryModel.Inventory_ToReceive_ProductSchema
         .find({Inventory_ToReceive_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
         .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product find Query Error', 'ToReceive.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while Find the Product!."});
            } else {
               const FindStock = (result) => Promise.all(
                  result.map(obj => AddStock(obj))
               ).then(response  => {
                  if(response) {
                     InventoryModel.Inventory_ToReceiveSchema
                     .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { ToReceive_Status: 'Received', Status: 'Received'}},)
                     .exec(function(err_2, result_2){
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock add Query Error', 'ToReceive.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while update stock!."});
                        } else {
                           PurchaseModel.Purchase_QuoteSchema
                           .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(result_0.Purchase_Order_Id)}, {$set: { Quote_Status: 'Received', Status: 'Received'}})
                           .exec(function(UpdateErr, UpdateResult) {
                             if(UpdateErr) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Order Status Update Query Error', 'ToReceive.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while updating the Purchase Order Status!."});
                             } else {
                              res.status(200).send({Status: true, Message: "Stock Updated Successfully."});
                           }
                           });
                        }
                     });
                  }
               });
               const AddStock = (info) => Promise.all([
                  InventoryModel.Inventory_StockDetailsSchema.findOne({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}),
                  InventoryModel.Inventory_StockDetailsSchema.update({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}, {$inc: {End_Quantity: parseInt(info.Approved_Quantity)}})
               ]).then(response => {
                  if(response[0] !== null) {
                     var Create_Stock_History =  new InventoryModel.Inventory_StockDetails_History_Schema({
                        History_StockDetails_Id : mongoose.Types.ObjectId(response[0]._id),
                        Product_Id : mongoose.Types.ObjectId(response[0].Product_Id),
                        WareHouse_Id : mongoose.Types.ObjectId(response[0].WareHouse_Id),
                        Start_Quantity : response[0].End_Quantity,
                        Processed_Quantity : parseInt(info.Approved_Quantity),
                        End_Quantity :  parseInt(response[0].End_Quantity) + parseInt(info.Approved_Quantity),
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
      });
   }
}
// ToReceive View
exports.ToReceive_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'ToReceive Details cannot be empty'});
   } else {
      InventoryModel.Inventory_ToReceiveSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {},)
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Contact', select: ['Name']})
      .populate({ path: 'Purchase_Request_Number', select: ['Requested_Number']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote List Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
         } else {
            InventoryModel.Inventory_ToReceive_ProductSchema
            .find({Inventory_ToReceive_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {},)
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .populate({ path: 'Product_Tax', select: ['Tax_Name']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'ToReceive List Query Error', 'ToReceive.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the ToReceive!."});
               } else {
                  const Data = {'ToReceive_Details': result, 'Product_Details': result_1};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });

         }
      });
   }
}
