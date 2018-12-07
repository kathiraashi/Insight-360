var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ConfigurationModel = require('./../../models/Configuration/Configuration.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************ Crm Quote *********************************************
// Crm Quote Create
exports.CrmQuote_Create = function(req, res) {
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
      if (ReceivingData.Quote_Ref_Number === null) {
         ConfigurationModel.CrmConfigurationSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, 
         {Quote_Ref_Number_Prefix: 1, Quote_Ref_Number_Suffix: 1, Quote_Ref_Number_Starting: 1}, {})
         .exec(function(AutoRefNumberErr, AutoRefNumberResult) {
            if(AutoRefNumberErr) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Auto Refer number Query Error', 'Quote.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
            } else {
               CrmModel.CrmQuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Quote_Number_Length: 1}, {sort:{Auto_Quote_Number_Length: -1}, limit: 1} )
               .exec(function(QuoteLengthErr, QuoteLengthResult) {
                  if(QuoteLengthErr) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Auto Refer number Query Error', 'Quote.controller.js');
                     res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Refer Number!."});
                  } else {
                     var number = parseInt(AutoRefNumberResult.Quote_Ref_Number_Starting);
                     if (QuoteLengthResult.length > 0) {
                        if (!QuoteLengthResult[0].Auto_Quote_Number_Length) {
                           var number = parseInt(AutoRefNumberResult.Quote_Ref_Number_Starting);
                        } else {
                           number = QuoteLengthResult[0].Auto_Quote_Number_Length + 1;
                        }
                     } 
                     Quote_Last_Number = number.toString().padStart(6, 0);
                     if ((AutoRefNumberResult.Quote_Ref_Number_Prefix !== null || AutoRefNumberResult.Quote_Ref_Number_Prefix !== '') && (AutoRefNumberResult.Quote_Ref_Number_Suffix === null || AutoRefNumberResult.Quote_Ref_Number_Suffix === ''))  {
                        QuoteRefNumber = AutoRefNumberResult.Quote_Ref_Number_Prefix + Quote_Last_Number;
                     } else if ((AutoRefNumberResult.Quote_Ref_Number_Prefix === null || AutoRefNumberResult.Quote_Ref_Number_Prefix === '') && (AutoRefNumberResult.Quote_Ref_Number_Suffix !== null || AutoRefNumberResult.Quote_Ref_Number_Suffix !== '')) { 
                        QuoteRefNumber = Quote_Last_Number + AutoRefNumberResult.Quote_Ref_Number_Suffix;
                     } else if ((AutoRefNumberResult.Quote_Ref_Number_Prefix !== null || AutoRefNumberResult.Quote_Ref_Number_Prefix !== '') && (AutoRefNumberResult.Quote_Ref_Number_Suffix !== null || AutoRefNumberResult.Quote_Ref_Number_Suffix !== '')) { 
                        QuoteRefNumber = AutoRefNumberResult.Quote_Ref_Number_Prefix + Quote_Last_Number + AutoRefNumberResult.Quote_Ref_Number_Suffix;
                     } 
                     CreateQuote();
                  }
               });
            }
         });
      } else {
         QuoteRefNumber = ReceivingData.Quote_Ref_Number;
         CrmModel.CrmQuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Quote_Number_Length: 1}, {sort:{Auto_Quote_Number_Length: -1}, limit: 1} )
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
      var Create_CrmQuote = new CrmModel.CrmQuoteSchema({
         Company_Name: mongoose.Types.ObjectId(ReceivingData.Company_Name),
         Contact_Person: mongoose.Types.ObjectId(ReceivingData.Contact_Person),
         Previous_QuoteOrRevise_Id: [],
         Quote_Date: ReceivingData.Quote_Date,
         Valid_Date: ReceivingData.Valid_Date,
         Quote_Ref_Number: QuoteRefNumber,
         Auto_Quote_Number_Length: Quote_Last_Number,
         Employee_Name: ReceivingData.Employee_Name,
         Sub_Total_WithOut_GlobalDiscount: ReceivingData.Sub_Total_WithOut_GlobalDiscount,
         Sub_Total: ReceivingData.Sub_Total,
         Global_Discount: ReceivingData.Global_Discount,
         Global_Product_Tax:tempGlobal_Product_Tax,
         Overall_Global_Tax: ReceivingData.Overall_Global_Tax,
         Tax: ReceivingData.Tax,
         Total: ReceivingData.Total,
         Quote_Config: ReceivingData.Quote_Config,
         Quote_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
         If_Revised: false,
         If_Nested: false
      });
      Create_CrmQuote.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Creation Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote!."});
         } else {
            const itemArray = ReceivingData.items.map(obj => {
               var tempProduct_Tax = [];
               if(obj.Product_Tax !== null){
                  tempProduct_Tax = obj.Product_Tax.map(x => mongoose.Types.ObjectId(x))
               } else {
                  tempProduct_Tax = null;
               }
               const newObj = {
                  Crm_Quote_Id: mongoose.Types.ObjectId(result._id),
                  Product_Id: mongoose.Types.ObjectId(obj.Product),
                  Description: obj.Description,
                  Price: obj.Price,
                  Quantity: obj.Quantity,
                  Product_Tax: tempProduct_Tax,
                  Taxable_Amount: obj.Taxable_Amount,
                  Product_Discount: obj.Product_Discount,
                  Overall_Inline_Tax: obj.Overall_Inline_Tax,
                  Tax_Amount: obj.Tax_Amount,
                  Product_Total: obj.Product_Total,
               };             
               return newObj;
            });
            CrmModel.CrmQuote_ProductSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Creation Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Quote Product!."});
               } else {
                  res.status(200).send({Status: true, Message: "Quote Created Successfully"});
               }
            });
         }
      });
   }
};

exports.CrmQuote_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      CrmModel.CrmQuoteSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Nested: false}, 
      {Quote_Ref_Number: 1, Valid_Date: 1, Company_Name: 1, Contact_Person: 1, Created_By: 1, Quote_Status: 1, Status: 1, createdAt: 1, Previous_QuoteOrRevise_Id: 1},
      {sort: { createdAt: -1, updatedAt: -1}})
      .populate({ path: 'Company_Name', select: ['Company_Name']})
      .populate({ path: 'Contact_Person', select: ['Name', 'Email', 'Mobile']})
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
exports.CrmRevise_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      CrmModel.CrmQuoteSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Quote_Id)}, 
      {Previous_QuoteOrRevise_Id: 1})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Revise List Query Error', 'Revise.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Revise!."});
         } else {
            result.Previous_QuoteOrRevise_Id = result.Previous_QuoteOrRevise_Id.map(x => mongoose.Types.ObjectId(x));
            CrmModel.CrmQuoteSchema
            .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: {$in: result.Previous_QuoteOrRevise_Id}},
            {Quote_Ref_Number: 1, Valid_Date: 1, Company_Name: 1, Contact_Person: 1, Created_By: 1, Quote_Status: 1, Status: 1, createdAt: 1},
            {sort: { createdAt: -1, updatedAt: -1}})
            .populate({ path: 'Company_Name', select: ['Company_Name']})
            .populate({ path: 'Contact_Person', select: ['Name', 'Email', 'Mobile']})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote List Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
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

exports.CrmQuote_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else  if(!ReceivingData.Quote_Id || ReceivingData.Quote_Id === '') {
      res.status(400).send({Status: false, Message: 'Quote Details cannot be empty'});
   } else {
      CrmModel.CrmQuoteSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Quote_Id)}, {},)
      .populate({ path: 'Company_Name', select: ['Company_Name']})
      .populate({ path: 'Contact_Person', select: ['Name', 'Email', 'Mobile']})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Global_Product_Tax', select: ['Tax_Name']})
      .populate({ path: 'Quote_Config'})
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote List Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Quote!."});
         } else {
            CrmModel.CrmQuote_ProductSchema
            .find({Crm_Quote_Id: mongoose.Types.ObjectId(ReceivingData.Quote_Id)}, {},)
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .populate({ path: 'Product_Tax', select: ['Tax_Name']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote List Query Error', 'Quote.controller.js');
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

// Crm Quote Edit
exports.CrmQuote_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var tempGlobal_Product_Tax = [];
      var Quote_Last_Number;
      if(ReceivingData.Global_Product_Tax !== null){
         tempGlobal_Product_Tax = ReceivingData.Global_Product_Tax.map(x => mongoose.Types.ObjectId(x));
      } else {
         tempGlobal_Product_Tax = null;
      }
      QuoteRefNumber = ReceivingData.Quote_Ref_Number;
      CrmModel.CrmQuoteSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {Auto_Quote_Number_Length: 1}, {sort:{Auto_Quote_Number_Length: -1}, limit: 1} )
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
            } 
         }});
         CreateQuote();
   }
   function CreateQuote() {
      var Create_CrmQuote = new CrmModel.CrmQuoteSchema({
         Company_Name: mongoose.Types.ObjectId(ReceivingData.Company_Name),
         Contact_Person: mongoose.Types.ObjectId(ReceivingData.Contact_Person),
         Previous_QuoteOrRevise_Id: [],
         Quote_Date: ReceivingData.Quote_Date,
         Valid_Date: ReceivingData.Valid_Date,
         Quote_Ref_Number: QuoteRefNumber,
         Auto_Quote_Number_Length: Quote_Last_Number,
         Employee_Name: ReceivingData.Employee_Name,
         Sub_Total_WithOut_GlobalDiscount: ReceivingData.Sub_Total_WithOut_GlobalDiscount,
         Sub_Total: ReceivingData.Sub_Total,
         Global_Discount: ReceivingData.Global_Discount,
         Global_Product_Tax:tempGlobal_Product_Tax,
         Overall_Global_Tax: ReceivingData.Overall_Global_Tax,
         Tax: ReceivingData.Tax,
         Total: ReceivingData.Total,
         Quote_Config: ReceivingData.Quote_Config,
         Quote_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
         If_Revised: false,
         If_Nested: false
      });
      Create_CrmQuote.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Edit Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Edit the Quote!."});
         } else {
            const itemArray = ReceivingData.items.map(obj => {
               var tempProduct_Tax = [];
               if(obj.Product_Tax !== null){
                  tempProduct_Tax = obj.Product_Tax.map(x => mongoose.Types.ObjectId(x))
               } else {
                  tempProduct_Tax = null;
               }
               const newObj = {
                  Crm_Quote_Id: mongoose.Types.ObjectId(result._id),
                  Product_Id: mongoose.Types.ObjectId(obj.Product),
                  Description: obj.Description,
                  Price: obj.Price,
                  Quantity: obj.Quantity,
                  Product_Tax: tempProduct_Tax,
                  Taxable_Amount: obj.Taxable_Amount,
                  Product_Discount: obj.Product_Discount,
                  Overall_Inline_Tax: obj.Overall_Inline_Tax,
                  Tax_Amount: obj.Tax_Amount,
                  Product_Total: obj.Product_Total,
               };             
               return newObj;
            });
            CrmModel.CrmQuote_ProductSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Edit Query Error', 'Quote.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Edit the Quote Product!."});
               } else {
                  CrmModel.CrmQuoteSchema
                  .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Previous_Quote_Id)}, {$set: { If_Deleted: true}}, {})
                  .exec(function(err_2, result_2) {
                     if (err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Edit Query Error', 'Quote.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while Edit the Quote Product!."});
                     } else {
                        res.status(200).send({Status: true, Message: "Quote Edited Successfully"});
                     }
                  });
                 
               }
            });
         }
      });
   }
};

exports.CrmQuote_Approved = function(req, res){
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Quote_Id || ReceivingData.Quote_Id === '') {
      res.status(400).send({Status: false, Message: 'Quote Details Cannot be empty'});
   } else { 
      CrmModel.CrmQuoteSchema
      .update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.Quote_Id)}, {$set: { Quote_Status: 'Valid', Status: 'Valid'}}, {})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Quote Product Edit Query Error', 'Quote.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Edit the Quote Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Quote Approved Successfully"});
         }
      });
   }
}