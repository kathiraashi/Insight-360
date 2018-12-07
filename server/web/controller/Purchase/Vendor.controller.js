var CryptoJS = require("crypto-js");
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ********************************* Purchase Vendor *****************************************
//  Phone Async Validators
exports.Phone_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Phone_Number || ReceivingData.Phone_Number === '' ) {
      res.status(400).send({Status: false, Message: "Phone number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.VendorSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Phone_Number': { $regex : new RegExp("^" + ReceivingData.Phone_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Phone NumberFind Query Error', 'Leads.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Phone Number!."});
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

// Purchase Vendor Create
exports.PurchaseVendor_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Vendor_Name || ReceivingData.Vendor_Name === '') {
      res.status(400).send({Status: false, Message: 'Vendor Name cannot be empty'});
   } else if(!ReceivingData.Phone_Number || ReceivingData.Phone_Number === '') {
      res.status(400).send({Status: false, Message: 'Phone Number Cannot be empty'});
   } else {
      if (ReceivingData.Country && typeof ReceivingData.Country === 'object' && Object.keys(ReceivingData.Country).length > 0 ) {
         ReceivingData.Country._id = mongoose.Types.ObjectId(ReceivingData.Country._id);
      }
      if (ReceivingData.State && typeof ReceivingData.State === 'object' && Object.keys(ReceivingData.State).length > 0 ) {
         ReceivingData.State._id = mongoose.Types.ObjectId(ReceivingData.State._id);
      }
      if (ReceivingData.City && typeof ReceivingData.City === 'object' && Object.keys(ReceivingData.City).length > 0 ) {
         ReceivingData.City._id = mongoose.Types.ObjectId(ReceivingData.City._id);
      }
      if (ReceivingData.SubContractCountry && typeof ReceivingData.SubContractCountry === 'object' && Object.keys(ReceivingData.SubContractCountry).length > 0 ) {
         ReceivingData.SubContractCountry._id = mongoose.Types.ObjectId(ReceivingData.SubContractCountry._id);
      }
      if (ReceivingData.SubContractState && typeof ReceivingData.SubContractState === 'object' && Object.keys(ReceivingData.SubContractState).length > 0 ) {
         ReceivingData.SubContractState._id = mongoose.Types.ObjectId(ReceivingData.SubContractState._id);
      }
      if (ReceivingData.SubContractCity && typeof ReceivingData.SubContractCity === 'object' && Object.keys(ReceivingData.SubContractCity).length > 0 ) {
         ReceivingData.SubContractCity._id = mongoose.Types.ObjectId(ReceivingData.SubContractCity._id);
      }
      var Create_PurchaseVendor = new PurchaseModel.VendorSchema({
         Vendor_Name: ReceivingData.Vendor_Name,
         Phone_Number: ReceivingData.Phone_Number,
         Email: ReceivingData.Email,
         Website: ReceivingData.Website,
         "Address.Street": ReceivingData.Street,
         "Address.Area": ReceivingData.Area,
         "Address.ZipCode": ReceivingData.ZipCode,
         "Address.Country": ReceivingData.Country,
         "Address.State": ReceivingData.State,
         "Address.City": ReceivingData.City,
         SameAddresses: ReceivingData.SameAddresses,
         If_Subcontract: ReceivingData.If_Subcontract,
         "SubContractAddress.Street": ReceivingData.SubContractStreet,
         "SubContractAddress.Area": ReceivingData.SubContractArea,
         "SubContractAddress.ZipCode": ReceivingData.SubContractZipCode,
         "SubContractAddress.Country": ReceivingData.SubContractCountry,
         "SubContractAddress.State": ReceivingData.SubContractState,
         "SubContractAddress.City": ReceivingData.SubContractCity,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });

      Create_PurchaseVendor.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Vendor Creat Query Error', 'Vendor.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Vendor!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Vendor Successfully Created' });
         }
      });
   }
}

// Purchase Vendor List
exports.PurchaseVendor_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else {
      PurchaseModel.VendorSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {Vendor_Name: 1, Phone_Number: 1, Email: 1, Website: 1 }, {$sort: { createdAt: -1}})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Vendor List Query Error', 'Vendor.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while List the Purchase Vendor!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();            
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }

}
// Purchase Vendor Simple List
exports.PurchaseVendor_SimpleList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else {
      PurchaseModel.VendorSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {Vendor_Name: 1}, {$sort: { createdAt: -1}})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Vendor List Query Error', 'Vendor.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while List the Purchase Vendor!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();            
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }

}

// Purchase Vendor view 
exports.PurchaseVendor_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.Vendor_Id || ReceivingData.Vendor_Id === '') {
      res.status(400).send({Status: 400, Message: 'Vendor Details Cannot be empty'});
   } else {
      PurchaseModel.VendorSchema.findOne({_id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id), Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {}, {})
      .populate({ path: 'Industry_Type', select: ['Industry_Type'] })
      .populate({ path: 'Account_Type', select: ['Account_Type'] })
      .populate({ path: 'Ownership_Type', select: ['Ownership_Type'] })
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer View Query Error', 'Customer.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}