var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ConfigurationModel = require('./../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************** Sale Order *********************************
// Contact SaleOrder Async validate
exports.SaleOrder_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.SaleOrder_Ref_Number || ReceivingData.SaleOrder_Ref_Number === '' ) {
      res.status(400).send({Status: false, Message: "Sale Order number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      CrmModel.CrmSaleOrderSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'SaleOrder_Ref_Number': { $regex : new RegExp("^" + ReceivingData.SaleOrder_Ref_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Number Find Query Error', 'SaleOrder.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Sale Order Number!."});
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
// Create sale order
exports.CrmSaleOrder_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
         res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
         res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
      } else {
      var SaleOrderRefNumber = 0;
      var SaleOrder_Last_Number;

      if (ReceivingData.SaleOrder_Ref_Number === null) {
         ConfigurationModel.CrmConfigurationSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, 
         {Sale_Ref_Number_Prefix: 1, Sale_Ref_Number_Suffix: 1, Sale_Ref_Number_Starting: 1}, {})
         .exec(function(AutoRefNumberErr, AutoRefNumberResult) {
            if(AutoRefNumberErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Auto Refer number Query Error', 'SaleOrder.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the SaleOrder Refer Number!."});
            } else {
               CrmModel.CrmSaleOrderSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_SaleOrder_Number_Length: 1}, {sort:{Auto_SaleOrder_Number_Length: -1}, limit: 1} )
               .exec(function(SaleOrderLengthErr, SaleOrderLengthResult) {
                  if(SaleOrderLengthErr) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Auto Refer number Query Error', 'SaleOrder.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Sale Order Refer Number!."});
                  } else {
                     var number = parseInt(AutoRefNumberResult.Sale_Ref_Number_Starting);
                     if (SaleOrderLengthResult.length > 0) {
                        if (!SaleOrderLengthResult[0].Auto_SaleOrder_Number_Length) {
                           var number = parseInt(AutoRefNumberResult.Sale_Ref_Number_Starting);
                        } else {
                           number = SaleOrderLengthResult[0].Auto_SaleOrder_Number_Length + 1;
                        }
                        console.log(number);
                     } 
                     SaleOrder_Last_Number = number.toString().padStart(6, 0);
                     if ((AutoRefNumberResult.Sale_Ref_Number_Prefix !== null || AutoRefNumberResult.Sale_Ref_Number_Prefix !== '') && (AutoRefNumberResult.Sale_Ref_Number_Suffix === null || AutoRefNumberResult.Sale_Ref_Number_Suffix === ''))  {
                        SaleOrderRefNumber = AutoRefNumberResult.Sale_Ref_Number_Prefix + SaleOrder_Last_Number;
                     } else if ((AutoRefNumberResult.Sale_Ref_Number_Prefix === null || AutoRefNumberResult.Sale_Ref_Number_Prefix === '') && (AutoRefNumberResult.Sale_Ref_Number_Suffix !== null || AutoRefNumberResult.Sale_Ref_Number_Suffix !== '')) { 
                        SaleOrderRefNumber = SaleOrder_Last_Number + AutoRefNumberResult.Sale_Ref_Number_Suffix;
                     } else if ((AutoRefNumberResult.Sale_Ref_Number_Prefix !== null || AutoRefNumberResult.Sale_Ref_Number_Prefix !== '') && (AutoRefNumberResult.Sale_Ref_Number_Suffix !== null || AutoRefNumberResult.Sale_Ref_Number_Suffix !== '')) { 
                        SaleOrderRefNumber = AutoRefNumberResult.Sale_Ref_Number_Prefix + SaleOrder_Last_Number + AutoRefNumberResult.Sale_Ref_Number_Suffix;
                     } 
                     CreateSaleOrder();
                  }
               });
            }
         });
      } else {
         SaleOrderRefNumber = ReceivingData.SaleOrder_Ref_Number;
         CrmModel.CrmSaleOrderSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_SaleOrder_Number_Length: 1}, {sort:{Auto_SaleOrder_Number_Length: -1}, limit: 1} )
         .exec(function(SaleOrderLengthErr, SaleOrderLengthResult) {
            if(SaleOrderLengthErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Manual Refer number Query Error', 'SaleOrder.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Sale Order Refer Number!."});
            } else {
               if (SaleOrderLengthResult.length > 0) {
                  if (!SaleOrderLengthResult[0].Auto_SaleOrder_Number_Length) {
                     SaleOrder_Last_Number = 0;
                  } else {
                     SaleOrder_Last_Number = SaleOrderLengthResult[0].Auto_SaleOrder_Number_Length;
                  }
               } 
            }});
            CreateSaleOrder();
         }
      }
function CreateSaleOrder() {
   Create_SaleOrder = new CrmModel.CrmSaleOrderSchema({
      Date: ReceivingData.Date,
      PO_Number: ReceivingData.PO_Number,
      SaleOrder_Ref_Number: SaleOrderRefNumber,
      Auto_SaleOrder_Number_Length: SaleOrder_Last_Number,
      Order_ConfirmBy: ReceivingData.Order_ConfirmBy,
      Quote_Id: mongoose.Types.ObjectId(ReceivingData.Quote_Id),
      Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
      Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
      If_DeliverOrder: null,
      SaleOrder_Status: 'Confirmed',
      Status: 'Confirmed',
      If_Deleted: false,
      Active_Status: true
   });
   Create_SaleOrder.save(function(err, result) {
      if (err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Creation Query Error', 'SaleOrder.controller.js');
         res.status(417).send({Status: false, Message: "Some error occurred while creating the Sale Order!."});
      } else {
         CrmModel.CrmQuoteSchema
         .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Quote_Id)}, {$set: { Quote_Status: 'Confirmed', Status: 'Confirmed'}}, {})
         .exec(function(err_1, result_1){
            if (err_1) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order Creation Query Error', 'SaleOrder.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Sale Order!."});
            } else {
               res.status(200).send({Status: true, Message: "Sale Order Created Successfully"});
            }
         });
      }
   });
};
}

exports.CrmSaleOrder_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      CrmModel.CrmSaleOrderSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)},{SaleOrder_Ref_Number: 1, Quote_Id: 1, Created_By: 1, updatedAt: 1, SaleOrder_Status: 1, Status: 1 }, {sort: { createdAt: -1, updatedAt: -1}})
      .populate({path: 'Quote_Id', select: ['Quote_Ref_Number', 'Valid_Date', 'Company_Name', 'Quote_Status'], populate: { path: 'Company_Name', select: ['Company_Name']}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote List Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}
exports.CrmSaleOrder_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      CrmModel.CrmSaleOrderSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.SaleOrder_Id)},{})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sale Order view Query Error', 'SaleOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
         } else {
            CrmModel.CrmQuoteSchema
            .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(result.Quote_Id)}, {},)
            .populate({ path: 'Company_Name', select: ['Company_Name']})
            .populate({ path: 'Contact_Person', select: ['Name', 'Email', 'Mobile']})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Global_Product_Tax', select: ['Tax_Name']})
            .populate({ path: 'Quote_Config'})
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'SaleOrder List Query Error', 'SaleOrder.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
               } else {
                  CrmModel.CrmQuote_ProductSchema
                  .find({Crm_Quote_Id: mongoose.Types.ObjectId(result.Quote_Id._id)}, {},)
                  .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
                  .populate({ path: 'Product_Tax', select: ['Tax_Name']})
                  .exec(function(err_2, result_2) {
                     if(err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'SaleOrder List Query Error', 'SaleOrder.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
                     } else {
                        const Data = {'SaleOrder_Details': result, 'Quote_Details': result_1, 'Product_Details': result_2};
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      });
   }
}

// sale order confirm for  deliver order
exports.CrmSaleOrder_CreateDeliverOrder  = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else {
      CrmModel.CrmSaleOrderSchema
      .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { SaleOrder_Status: 'Awaiting Delivery', Status: 'Awaiting_Delivery', If_DeliverOrder: true}},)
      .exec(function(err_1, result_1) {
         if(err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'SaleOrder List Query Error', 'SaleOrder.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the SaleOrder!."});
         } else {
            res.status(200).send({Status: true, Message: "Successfully Deliver Order Create"});
         }
      });
   }
}