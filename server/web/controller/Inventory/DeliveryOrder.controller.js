var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var InventoryModel = require('./../../models/Inventory/Inventory.model.js');
var ConfigurationModel = require('./../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// **************************** DDelivery Order *************************************
// Delivery List
exports.DeliverOrder_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      InventoryModel.Inventory_DeliverOrderSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)},{DeliverOrder_Ref_Number: 1, Reference_Id: 1, Created_By: 1, updatedAt: 1, DeliverOrder_Status: 1, Status: 1, Order_Ref_Number: 1, Company_Name: 1, SaleOrder_Id: 1 }, {sort: { createdAt: -1, updatedAt: -1}})
      .populate({path: 'SaleOrder_Id', select: ['Quote_Id', 'SaleOrder_Ref_Number'], populate: { path: 'Quote_Id', select: ['Company_Name'], populate: { path: 'Company_Name', select: ['Company_Name']}}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DeliverOrder List Query Error', 'DeliveryOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the DeliverOrder!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}
// deliver view
exports.DeliverOrder_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      InventoryModel.Inventory_DeliverOrderSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)},{})
      .populate({path: 'SaleOrder_Id', select: [], populate: { path: 'Quote_Id', select: [], populate: { path: 'Company_Name', select: []}}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order view Query Error', 'SaleOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
         } else {
            InventoryModel.Inventory_Deliver_ProductSchema
            .find({Inventory_Deliver_Id: mongoose.Types.ObjectId(result._id)}, {},)
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'SaleOrder List Query Error', 'SaleOrder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
               } else {
                  const Data = {'DeliverOrder_Details': result, 'Product_Details': result_1};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });

         }
      });
   }
}

// Deliver Convert
exports.DeliverOrder_Convert = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details Cannot be empty'});
   } else { 
      CrmModel.CrmSaleOrderSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {Quote_Id: 1})
      .populate({ path: 'Quote_Id', select: []})
      .exec(function(err_1, result_1) {
         if(err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order details Finding Query Error', 'DeliveryOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding the Order details!."});
         } else {
            CrmModel.CrmQuote_ProductSchema
            .find({Crm_Quote_Id: mongoose.Types.ObjectId(result_1.Quote_Id._id)}, {})
            .exec(function(err_2, result_2) {
               if(err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product details Finding Query Error', 'DeliveryOrder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Finding the Product details!."});
               } else {
                  InventoryModel.Inventory_DeliverOrderSchema
                  .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {DeliverOrder_Number_Length: -1}, {sort: {DeliverOrder_Number_Length: -1}, limit: 1})
                  .exec(function(DeliverNumberErr, DeliverNumberResult){
                     if (DeliverNumberErr) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Deliver Order Ref Number Query Error', 'DeliveryOrder.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Finding the Deliver Order Ref Number!."});
                     } else { 
                        var number = (DeliverNumberResult.length > 0) ? DeliverNumberResult[0].DeliverOrder_Number_Length + 1 : 1;
                        const DeliverOrder_Last_Number = number.toString().padStart(6, 0);
                        const DeliverOrderRefNumber = "DeliverOrder/" + DeliverOrder_Last_Number;
                        
                        var Create_DeliverOrder = new InventoryModel.Inventory_DeliverOrderSchema({
                           Reference_Model: 'CrmSaleOrder',
                           Reference_Id: mongoose.Types.ObjectId(result_1._id),
                           SaleOrder_Id: mongoose.Types.ObjectId(result_1._id),
                           Order_Ref_Number: result_1.SaleOrder_Ref_Number,
                           Company_Name: result_1.Quote_Id.Company_Name.Company_Name,
                           DeliverOrder_Ref_Number: DeliverOrderRefNumber,
                           DeliverOrder_Number_Length: DeliverOrder_Last_Number,
                           DeliverOrder_Status: 'Awaiting Deliver',
                           Status: 'Awaiting_Deliver',
                           Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                           Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Active_Status: true,
                           If_Deleted: false,
                        });
                        Create_DeliverOrder.save(function(err_3, result_3) {
                           if (err_3) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Deliver Order conversion Query Error', 'DeliveryOrder.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while Finding the Deliver Order conversion!."});
                           } else { 
                              const itemArray = result_2.map(obj => {
                                 const newObj = {
                                    Inventory_Deliver_Id: mongoose.Types.ObjectId(result_3._id),
                                    Product_Id: mongoose.Types.ObjectId(obj.Product_Id._id),
                                    Description: obj.Description,
                                    Quantity: obj.Quantity,
                                    Approved_Quantity: obj.Quantity
                                 };             
                                 return newObj;
                              });
                              InventoryModel.Inventory_Deliver_ProductSchema.collection.insert(itemArray, function(err_4, result_4) {
                                 if(err_4) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DeliverOrder Product Creation Query Error', 'DeliveryOrder.controller.js');
                                    res.status(417).send({Status: false, Message: "Some error occurred while creating the Deliver Order Product!."});
                                 } else {
                                    CrmModel.CrmSaleOrderSchema
                                    .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { SaleOrder_Status: 'Awaiting Delivery', Status: 'Awaiting_Delivery'}},)
                                    .exec(function(UpdateErr, UpdateResult) {
                                      if(UpdateErr) {
                                       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Status Update Query Error', 'DeliveryOrder.controller.js');
                                       res.status(417).send({Status: false, Message: "Some error occurred while updating the Order Status!."});
                                      } else {
                                       res.status(200).send({Status: true, Message: "Deliver Order Created Successfully"});
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

// Delivery Order update
exports.DeliverOrder_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.InventoryOrder_Id || ReceivingData.InventoryOrder_Id === '') {
      res.status(400).send({Status: false, Message: 'Delivery Order Details cannot be empty'});
   } else {
      const FindProduct = (result) => Promise.all(
         result.map(obj => updateProduct(obj))
      ).then(response => {
         if(response) {
            res.status(200).send({Status: true, Message: "Deliver Order Product's Edited Successfully."});
         }
      });
      const updateProduct = (info) => Promise.all([
         InventoryModel.Inventory_Deliver_ProductSchema
         .update({Inventory_Deliver_Id: mongoose.Types.ObjectId(ReceivingData.InventoryOrder_Id), Product_Id: mongoose.Types.ObjectId(info.Product)},
         {$set: {Approved_Quantity: info.Approved_Quantity}})
      ]).then(response => {
         if (response[0] !== null) {
            return true;
         }
      });
      FindProduct(ReceivingData.items);
   }
}

// DeliverOrder Create BackOrder
exports.DeliverOrder_CreateBackOrder = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else {
      InventoryModel.Inventory_DeliverOrderSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {}, {})
      .exec(function(err_1, result_1) {
         if(err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Deliver Order Find Query Error', 'DeliveryOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding the Deliver Order!."});
         } else {
            InventoryModel.Inventory_Deliver_ProductSchema
            .find({ Inventory_Deliver_Id: mongoose.Types.ObjectId(result_1._id)}, {}, {})
            .exec(function(err_2, result_2) {
               if(err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Deliver Order Product Find Query Error', 'DeliveryOrder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Finding the Deliver Order Products!."});
               } else {
                  InventoryModel.Inventory_DeliverOrderSchema
                  .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {DeliverOrder_Number_Length: -1}, {sort: {DeliverOrder_Number_Length: -1}, limit: 1})
                  .exec(function(err_3, result_3){
                     if(err_3) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Deliver Order Number Find Query Error', 'DeliveryOrder.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Finding the Deliver Order Number!."});
                     } else {
                        var number = (result_3.length > 0) ? result_3[0].DeliverOrder_Number_Length + 1 : 1;
                        const DeliverOrder_Last_Number = number.toString().padStart(6, 0);
                        const DeliverOrderRefNumber = "DeliverOrder/" + DeliverOrder_Last_Number;

                        var Create_DeliverOrder = new InventoryModel.Inventory_DeliverOrderSchema({
                           Reference_Model: 'Inventory_Deliver',
                           Reference_Id: mongoose.Types.ObjectId(result_1._id),
                           SaleOrder_Id: mongoose.Types.ObjectId(result_1.SaleOrder_Id),
                           Order_Ref_Number: result_1.Order_Ref_Number,
                           Company_Name: result_1.Company_Name,
                           DeliverOrder_Ref_Number: DeliverOrderRefNumber,
                           DeliverOrder_Number_Length: DeliverOrder_Last_Number,
                           DeliverOrder_Status: 'Awaiting Deliver',
                           Status: 'Awaiting_Deliver',
                           Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                           Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Active_Status: true,
                           If_Deleted: false,
                        });
                        Create_DeliverOrder.save(function(err_4, result_4) {
                           if(err_4) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DeliverOrder Creation Query Error', 'DeliveryOrder.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while creating the Deliver Order!."});
                           } else {
                              const itemArray = result_2.map(obj => {
                                 const newObj = {
                                    Inventory_Deliver_Id: mongoose.Types.ObjectId(result_4._id),
                                    Product_Id: mongoose.Types.ObjectId(obj.Product_Id._id),
                                    Description: obj.Description,
                                    Quantity: parseInt(obj.Quantity) - parseInt(obj.Approved_Quantity),
                                    Approved_Quantity: parseInt(obj.Quantity) - parseInt(obj.Approved_Quantity),
                                 };             
                                 return newObj;
                              });
                              InventoryModel.Inventory_Deliver_ProductSchema.collection.insert(itemArray, function(err_4, result_4) {
                                 if(err_4) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DeliverOrder Product Creation Query Error', 'DeliveryOrder.controller.js');
                                    res.status(417).send({Status: false, Message: "Some error occurred while creating the Deliver Order Product!."});
                                 } else {
                                    CrmModel.CrmSaleOrderSchema
                                    .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(result_1.SaleOrder_Id)}, {$set: { SaleOrder_Status: 'Partially Delivery', Status: 'Partially_Delivery'}},)
                                    .exec(function(UpdateErr, UpdateResult) {
                                      if(UpdateErr) {
                                       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Status Update Query Error', 'DeliveryOrder.controller.js');
                                       res.status(417).send({Status: false, Message: "Some error occurred while updating the Order Status!."});
                                      } else {
                                       res.status(200).send({Status: true, Message: "Deliver Order Created Successfully"});
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

// DeliverOrder stock update
exports.DeliverOrderStockDetails_Remove = function(req, res) {
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
      InventoryModel.Inventory_DeliverOrderSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.Order_Id), Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {}, {})
      .exec(function(err_0, result_0) {
         if(err_0) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DeliverOrder find Query Error', 'DeliveryOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while finding the Deliver Order!."});
         } else {
            InventoryModel.Inventory_Deliver_ProductSchema
            .find({Inventory_Deliver_Id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {} , {})
            .exec(function(err_1, result_1){
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product find Query Error', 'DeliveryOrder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Find the Product!."});
               } else {
                  const FindStock = (result) => Promise.all(
                     result.map(obj => AddStock(obj))
                  ).then(response  => {
                     if(response) {
                        InventoryModel.Inventory_DeliverOrderSchema
                        .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: {DeliverOrder_Status : 'Delivered', Status: 'Delivered'}},)
                        .exec(function(err_2, result_2){
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock add Query Error', 'ToReceive.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while update stock!."});
                           } else {
                              CrmModel.CrmSaleOrderSchema
                              .updateMany({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(result_0.SaleOrder_Id)}, {$set: { SaleOrder_Status: 'Delivered', Status: 'Delivered'}},)
                              .exec(function(UpdateErr, UpdateResult) {
                                if(UpdateErr) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Status Update Query Error', 'DeliveryOrder.controller.js');
                                 res.status(417).send({Status: false, Message: "Some error occurred while updating the Order Status!."});
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
                     InventoryModel.Inventory_StockDetailsSchema.update({Product_Id: mongoose.Types.ObjectId(info.Product_Id), WareHouse_Id: mongoose.Types.ObjectId(ReceivingData.WareHouse_Id)}, {$inc: {End_Quantity: -(parseInt(info.Approved_Quantity))}})
                  ]).then(response => {
                     if(response[0] !== null) {
                        var Create_Stock_History =  new InventoryModel.Inventory_StockDetails_History_Schema({
                           History_StockDetails_Id : mongoose.Types.ObjectId(response[0]._id),
                           Product_Id : mongoose.Types.ObjectId(response[0].Product_Id),
                           WareHouse_Id : mongoose.Types.ObjectId(response[0].WareHouse_Id),
                           Start_Quantity : response[0].End_Quantity,
                           Processed_Quantity : parseInt(info.Approved_Quantity),
                           End_Quantity :  parseInt(response[0].End_Quantity) - parseInt(info.Approved_Quantity),
                           Reference_Id : mongoose.Types.ObjectId(ReceivingData.Order_Id),
                           Reference_Key : ReceivingData.Reference_Key,
                           In_or_Out : 'Out',
                           Company_Id : mongoose.Types.ObjectId(response[0].Company_Id),
                           Created_By : mongoose.Types.ObjectId(response[0].Created_By),
                           Last_Modified_By : mongoose.Types.ObjectId(response[0].Last_Modified_By),
                           Active_Status : true,
                           If_Deleted : false
                        });
                        Create_Stock_History.save(function(err_3, result_3) {
                           if(err_3) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock History Create Query Error', 'StockDetails.controller.js');
                           } else {
                              return result_1;
                           }
                        });
                     } 
                     return response[0];
                  });
                  FindStock(result_1);
               }
            });
         }
      });
      
   }
}