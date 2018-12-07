var CryptoJS = require("crypto-js");
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var ConfigurationModel = require('../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************ Purchase Quote ******************************************
// Purchase Quote Number Async Validate
exports.QuoteNumber_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Requested_Number || ReceivingData.Requested_Number === '' ) {
      res.status(400).send({Status: false, Message: "Quote Number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.Purchase_QuoteSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Quote_Ref_Number': { $regex : new RegExp("^" + ReceivingData.Requested_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Number find Query Error', 'Quote.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Quote Number!."});
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
// Purchase Quote Number Async Validate
exports.OrderNumber_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   console.log(ReceivingData);
   if(!ReceivingData.Requested_Number || ReceivingData.Requested_Number === '' ) {
      res.status(400).send({Status: false, Message: "Order Number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.Purchase_QuoteSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Order_Ref_Number': { $regex : new RegExp("^" + ReceivingData.Requested_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Number find Query Error', 'Quote.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Quote Number!."});
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
// Purchase Quote Create
exports.PurchaseQuote_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var QuoteRefNumber = 0;
      var Quote_Last_Number;
      var tempGlobal_Product_Tax = [];
      if(ReceivingData.Global_Product_Tax !== null){
         tempGlobal_Product_Tax = ReceivingData.Global_Product_Tax.map(x => mongoose.Types.ObjectId(x));
      } else {
         tempGlobal_Product_Tax = null;
      }
      if(ReceivingData.Quote_Ref_Number === null) {
         ConfigurationModel.PurchaseConfigurationSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, 
         {Purchase_Quotation_Prefix: 1, Purchase_Quotation_Suffix: 1, Purchase_Quotation_Starting: 1}, {})
         .exec(function(AutoRefNumberErr, AutoRefNumberResult) { 
            if(AutoRefNumberErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Auto Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
            } else {
               PurchaseModel.Purchase_QuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Quote_Number_Length: 1}, {sort:{Auto_Quote_Number_Length: -1}, limit: 1})
               .exec(function(QuoteLengthErr, QuoteLengthResult) {
                  if(QuoteLengthErr) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Auto Refer number Query Error', 'Quote.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
                  } else {
                     var number = parseInt(AutoRefNumberResult.Purchase_Quotation_Starting);
                     console.log(AutoRefNumberResult);
                     if (QuoteLengthResult.length > 0) {
                        if (!QuoteLengthResult[0].Auto_Quote_Number_Length) {
                           var number = parseInt(AutoRefNumberResult.Purchase_Quotation_Starting);
                        } else {
                           number = QuoteLengthResult[0].Auto_Quote_Number_Length + 1;
                        }
                     } 
                     Quote_Last_Number = number.toString().padStart(6, 0);
                     if ((AutoRefNumberResult.Purchase_Quotation_Prefix !== null || AutoRefNumberResult.Purchase_Quotation_Prefix !== '') && (AutoRefNumberResult.Purchase_Quotation_Suffix === null || AutoRefNumberResult.Purchase_Quotation_Suffix === ''))  {
                        QuoteRefNumber = AutoRefNumberResult.Purchase_Quotation_Prefix + Quote_Last_Number;
                     } else if ((AutoRefNumberResult.Purchase_Quotation_Prefix === null || AutoRefNumberResult.Purchase_Quotation_Prefix === '') && (AutoRefNumberResult.Purchase_Quotation_Suffix !== null || AutoRefNumberResult.Purchase_Quotation_Suffix !== '')) { 
                        QuoteRefNumber = Quote_Last_Number + AutoRefNumberResult.Purchase_Quotation_Suffix;
                     } else if ((AutoRefNumberResult.Purchase_Quotation_Prefix !== null || AutoRefNumberResult.Purchase_Quotation_Prefix !== '') && (AutoRefNumberResult.Purchase_Quotation_Suffix !== null || AutoRefNumberResult.Purchase_Quotation_Suffix !== '')) { 
                        QuoteRefNumber = AutoRefNumberResult.Purchase_Quotation_Prefix + Quote_Last_Number + AutoRefNumberResult.Purchase_Quotation_Suffix;
                     }
                     CreateQuote();
                  }
               });
            }
         });
      } else {
         QuoteRefNumber = ReceivingData.Quote_Ref_Number;
         PurchaseModel.Purchase_QuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Quote_Number_Length: 1}, {sort:{Auto_Quote_Number_Length: -1}, limit: 1})
         .exec(function(QuoteLengthErr, QuoteLengthResult) {
            if(QuoteLengthErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Manual Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
            } else {
               if (QuoteLengthResult.length > 0) {
                  if (!QuoteLengthResult[0].Auto_Quote_Number_Length) {
                     Quote_Last_Number = 0;
                  } else {
                     Quote_Last_Number = QuoteLengthResult[0].Auto_Quote_Number_Length;
                  }
                  CreateQuote();
               } 
            }});
      }
      
   }
   function CreateQuote() {
      console.log(Quote_Last_Number);
      var Create_PurchaseQuote = new PurchaseModel.Purchase_QuoteSchema({
         Vendor_Name: mongoose.Types.ObjectId(ReceivingData.Vendor_Name),
         Contact: mongoose.Types.ObjectId(ReceivingData.Contact),
         Quote_Date: ReceivingData.Quote_Date,
         Valid_Date: ReceivingData.Valid_Date,
         Quote_Ref_Number: QuoteRefNumber,
         Order_Ref_Number: null,
         Auto_Quote_Number_Length: Quote_Last_Number,
         Auto_Order_Number_Length: null,
         Purchase_Request_Number: mongoose.Types.ObjectId(ReceivingData.Purchase_Request_Number),
         Subject: ReceivingData.Subject,
         Sub_Total: ReceivingData.Sub_Total,
         Global_Product_Tax:tempGlobal_Product_Tax,
         Overall_Global_Tax: ReceivingData.Overall_Global_Tax,
         Tax: ReceivingData.Tax,
         Total: ReceivingData.Total,
         Quote_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
      });
      Create_PurchaseQuote.save(function(err, result) {
         if(err) {
            console.log(err);
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Creation Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Quote!."});
         } else {
            const itemArray = ReceivingData.items.map(obj => {
               var tempProduct_Tax = [];
               if(obj.Product_Tax !== null){
                  tempProduct_Tax = obj.Product_Tax.map(x => mongoose.Types.ObjectId(x))
               } else {
                  tempProduct_Tax = null;
               }
               const newObj = {
                  Purchase_Quote_Id: result._id,
                  Product_Id: mongoose.Types.ObjectId(obj.Product),
                  Price: obj.Price,
                  Description: obj.Description,
                  Quantity: obj.Quantity,
                  Product_Tax: tempProduct_Tax,
                  Taxable_Amount: obj.Taxable_Amount,
                  Overall_Inline_Tax: obj.Overall_Inline_Tax,
                  Tax_Amount: obj.Tax_Amount,
                  Product_Total: obj.Product_Total,
               };             
               return newObj;
            });
            PurchaseModel.Purchase_Quote_ProductSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Creation Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Product!."});
               } else {
                  res.status(200).send({Status: true, Message: "Purchase Quote Created Successfully"});
               }
            });
         }
      });
   }
}
// Purchase Quote List
exports.PurchaseQuote_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Status: 'Draft'}, 
      {Quote_Ref_Number: 1, Valid_Date: 1, Vendor_Name: 1, Created_By: 1, Quote_Status: 1, Status: 1, Total: 1, createdAt: 1},
      {sort: { createdAt: -1, updatedAt: -1}})
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
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
// Purchase Quote View
exports.PurchaseQuote_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.PurchaseQuote_Id || ReceivingData.PurchaseQuote_Id === '') {
      res.status(400).send({Status: false, Message: 'Quote Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseQuote_Id)}, {})
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Contact', select: ['Name']})
      .populate({ path: 'Global_Product_Tax', select: ['Tax_Name']})
      .populate({ path: 'Purchase_Request_Number', select: ['Requested_Number']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote View Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
         } else {
            PurchaseModel.Purchase_Quote_ProductSchema
            .find({Purchase_Quote_Id: mongoose.Types.ObjectId(result._id)}, {})
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .populate({ path: 'Product_Tax', select: ['Tax_Name']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote view Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
               } else {
                  const Data = {'Quote_Details': result, 'Product_Details': result_1};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
}
// Purchase Quote Edit
exports.PurchaseQuote_Edit = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.PurchaseQuote_Id || ReceivingData.PurchaseQuote_Id === '') {
      res.status(400).send({Status: false, Message: 'Quote Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseQuote_Id)}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote update Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while update the Quote!."});
         } else {
            var tempGlobal_Product_Tax = [];
            if(ReceivingData.Global_Product_Tax !== null){
               tempGlobal_Product_Tax = ReceivingData.Global_Product_Tax.map(x => mongoose.Types.ObjectId(x));
            } else {
               tempGlobal_Product_Tax = null;
            }
            result.Vendor_Name = mongoose.Types.ObjectId(ReceivingData.Vendor_Name);
            result.Contact = mongoose.Types.ObjectId(ReceivingData.Contact);
            result.Quote_Date = ReceivingData.Quote_Date;
            result.Valid_Date = ReceivingData.Valid_Date;
            result.Quote_Ref_Number = ReceivingData.Quote_Ref_Number;
            result.Order_Ref_Number = null;
            result.Auto_Quote_Number_Length = ReceivingData.Auto_Quote_Number_Length;
            result.Auto_Order_Number_Length = null;
            result.Purchase_Request_Number = mongoose.Types.ObjectId(ReceivingData.Purchase_Request_Number);
            result.Subject = ReceivingData.Subject;
            result.Sub_Total = ReceivingData.Sub_Total;
            result.Global_Product_Tax = tempGlobal_Product_Tax;
            result.Overall_Global_Tax = ReceivingData.Overall_Global_Tax;
            result.Tax = ReceivingData.Tax;
            result.Total = ReceivingData.Total;
            result.Quote_Status = 'Draft';
            result.Status = 'Draft';
            result.Company_Id = mongoose.Types.ObjectId(ReceivingData.Company_Id);
            result.Created_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
            result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
            result.Active_Status = true;
            result.If_Deleted = false;
            result.save(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote update Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while update the Quote!."});
               } else {
                  PurchaseModel.Purchase_Quote_ProductSchema.remove({Purchase_Quote_Id: ReceivingData.PurchaseQuote_Id})
                  .exec(function(err_2, result_2) {
                     if(err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote update Query Error', 'Quote.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while update the Quote!."});
                     } else {
                        const itemArray = ReceivingData.items.map(obj => {
                           var tempProduct_Tax = [];
                           if(obj.Product_Tax !== null){
                              tempProduct_Tax = obj.Product_Tax.map(x => mongoose.Types.ObjectId(x))
                           } else {
                              tempProduct_Tax = null;
                           }
                           const newObj = {
                              Purchase_Quote_Id: mongoose.Types.ObjectId(ReceivingData.PurchaseQuote_Id),
                              Product_Id: mongoose.Types.ObjectId(obj.Product),
                              Price: obj.Price,
                              Description: obj.Description,
                              Quantity: obj.Quantity,
                              Product_Tax: tempProduct_Tax,
                              Taxable_Amount: obj.Taxable_Amount,
                              Overall_Inline_Tax: obj.Overall_Inline_Tax,
                              Tax_Amount: obj.Tax_Amount,
                              Product_Total: obj.Product_Total,
                           };             
                           return newObj;
                        });
                        PurchaseModel.Purchase_Quote_ProductSchema.collection.insert(itemArray, function(err_3, result_3) {
                           if(err_3) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Edit Query Error', 'Quote.controller.js');
                              res.status(417).send({Status: false, Message: "Some error occurred while Editing the Quote Product!."});
                           } else {
                              res.status(200).send({Status: true, Message: "Purchase Quote Edited Successfully"});
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
// Purchase Order create (Quote confirm)
exports.PurchaseQuote_ConfirmOrder = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Quote_Id || ReceivingData.Quote_Id === '') {
      res.status(400).send({Status: false, Message: 'Quote Details Cannot be empty'});
   } else {
      var OrderRefNumber = 0;
      var Order_Last_Number;
      if(ReceivingData.Order_Ref_Number === null) {
         ConfigurationModel.PurchaseConfigurationSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, 
         {Purchase_Order_Prefix: 1, Purchase_Order_Suffix: 1, Purchase_Order_Starting: 1}, {})
         .exec(function(AutoRefNumberErr, AutoRefNumberResult) { 
            if(AutoRefNumberErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Auto Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Order Refer Number!."});
            } else {
               PurchaseModel.Purchase_QuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Order_Number_Length: 1}, {sort:{Auto_Order_Number_Length: -1}, limit: 1})
               .exec(function(OrderLengthErr, OrderLengthResult) {
                  if(OrderLengthErr) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Auto Refer number Query Error', 'Quote.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
                  } else {
                     var number = parseInt(AutoRefNumberResult.Purchase_Order_Starting);
                     if (OrderLengthResult.length > 0) {
                        if (!OrderLengthResult[0].Auto_Order_Number_Length) {
                           var number = parseInt(AutoRefNumberResult.Purchase_Order_Starting);
                        } else {
                           number = OrderLengthResult[0].Auto_Order_Number_Length + 1;
                        }
                     } 
                     Order_Last_Number = number.toString().padStart(6, 0);
                     if ((AutoRefNumberResult.Purchase_Order_Prefix !== null || AutoRefNumberResult.Purchase_Order_Prefix !== '') && (AutoRefNumberResult.Purchase_Order_Suffix === null || AutoRefNumberResult.Purchase_Order_Suffix === ''))  {
                        OrderRefNumber = AutoRefNumberResult.Purchase_Order_Prefix + Order_Last_Number;
                     } else if ((AutoRefNumberResult.Purchase_Order_Prefix === null || AutoRefNumberResult.Purchase_Order_Prefix === '') && (AutoRefNumberResult.Purchase_Order_Suffix !== null || AutoRefNumberResult.Purchase_Order_Suffix !== '')) { 
                        OrderRefNumber = Order_Last_Number + AutoRefNumberResult.Purchase_Order_Suffix;
                     } else if ((AutoRefNumberResult.Purchase_Order_Prefix !== null || AutoRefNumberResult.Purchase_Order_Prefix !== '') && (AutoRefNumberResult.Purchase_Order_Suffix !== null || AutoRefNumberResult.Purchase_Order_Suffix !== '')) { 
                        OrderRefNumber = AutoRefNumberResult.Purchase_Order_Prefix + Order_Last_Number + AutoRefNumberResult.Purchase_Order_Suffix;
                     } 
                     OrderCreate();
                  }
               });
            }
         });
      } else {
         OrderRefNumber = ReceivingData.Order_Ref_Number;
         PurchaseModel.Purchase_QuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Order_Number_Length: 1}, {sort:{Auto_Order_Number_Length: -1}, limit: 1})
         .exec(function(OrderLengthErr, OrderLengthResult) {
            if(OrderLengthErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Order Manual Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Order Refer Number!."});
            } else {
               if (OrderLengthResult.length > 0) {
                  if (!OrderLengthResult[0].Auto_Order_Number_Length) {
                     Order_Last_Number = 0;
                  } else {
                     Order_Last_Number = OrderLengthResult[0].Auto_Order_Number_Length;
                  }
                  OrderCreate();
               } 
            }});
      }
   }
   function OrderCreate() {
      PurchaseModel.Purchase_QuoteSchema.update({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Status: 'Draft', If_Deleted: false, Active_Status: true}, {$set: {Status: 'Order_Confirmed', Quote_Status: 'Order Confirmed', Order_Ref_Number: OrderRefNumber, Auto_Order_Number_Length: Order_Last_Number}})
         .exec(function(err_2, result_2) {
            if(err_2) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Order Manual Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Order Refer Number!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Message: "Order Created Successfully" });
            }
         });
   }
}
// Purchase Order List
exports.PurchaseQuote_OrderList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), $or: [{Status: 'Order_Confirmed' }, {Status: 'Received' }, {Status: 'Awaiting_Receive' }, {Status: 'Partially_Receive' }]}, 
      {Order_Ref_Number: 1, Valid_Date: 1, Vendor_Name: 1, Created_By: 1, Quote_Status: 1, Status: 1, Total: 1, createdAt: 1},
      {sort: { createdAt: -1, updatedAt: -1}})
      .populate({ path: 'Vendor_Name', select: ['Vendor_Name']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
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

// purchase order confirm for  to receive
exports.PurchaseQuote_Order_CreateToReceive  = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Order_Id || ReceivingData.Order_Id === '') {
      res.status(400).send({Status: false, Message: 'Order Details cannot be empty'});
   } else {
      PurchaseModel.Purchase_QuoteSchema
      .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Order_Id)}, {$set: { Quote_Status: 'Awaiting Receive', Status: 'Awaiting_Receive', If_ToReceive: true}},)
      .exec(function(err_1, result_1) {
         if(err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Order List Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Purchase Order!."});
         } else {
            res.status(200).send({Status: true, Message: "Successfully Receive Order Create"});
         }
      });
   }
}