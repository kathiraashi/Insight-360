var CryptoJS = require("crypto-js");
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ******************** Vendor Contact **********************************
// Phone Async Validate
exports.Mobile_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Mobile || ReceivingData.Mobile === '' ) {
      res.status(400).send({Status: false, Message: "Mobile number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.VendorContactSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Mobile': { $regex : new RegExp("^" + ReceivingData.Mobile + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Mobile NumberFind Query Error', 'Contact.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Mobile Number!."});
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
// Contact Name Async validate
exports.Name_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: "Phone number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.VendorContactSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Name': { $regex : new RegExp("^" + ReceivingData.Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Name Find Query Error', 'Contact.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Name!."});
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

// create crm contact
exports.VendorContact_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.Name || ReceivingData.Name === '') {
      res.status(400).send({Status: false, Message: 'Name Details cannot be empty'});
   } else  if(!ReceivingData.Title || ReceivingData.Title === '') {
      res.status(400).send({Status: false, Message: 'Title Details cannot be empty'});
   } else  if(!ReceivingData.Mobile || ReceivingData.Mobile === '') {
      res.status(400).send({Status: false, Message: 'Mobile Details cannot be empty'});
   } else  {
      var Create_VendorContact = new PurchaseModel.VendorContactSchema({
         Title: ReceivingData.Title,
         Name: ReceivingData.Name,
         Email: ReceivingData.Email,
         Mobile: ReceivingData.Mobile,
         Job_Position: ReceivingData.Job_Position,
         Vendor_Id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id),
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_VendorContact.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Vendor Contact Creat Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Vendor Contact!."});
         } else {
            PurchaseModel.VendorContactSchema
            .findOne({ Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Vendor_Id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id), _id: mongoose.Types.ObjectId(result._id)}, 
            {}, {$sort: {createdAt: -1}})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Contact.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
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
// Vendor contact list
exports.VendorContact_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.Vendor_Id || ReceivingData.Vendor_Id === '') {
      res.status(400).send({Status: false, Message: 'Vendor Contact Details cannot be empty'});
   } else {
      PurchaseModel.VendorContactSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Vendor_Id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id)}, 
      {}, {$sort: {createdAt: -1}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Vendor Contact Creat Query Error', 'Vendor.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Vendor Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}
// Vendor contact simple list
exports.VendorContact_SimpleList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.Vendor_Id || ReceivingData.Vendor_Id === '') {
      res.status(400).send({Status: false, Message: 'Vendor Contact Details cannot be empty'});
   } else {
      PurchaseModel.VendorContactSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Vendor_Id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id)}, 
      {Name: 1}, {$sort: {createdAt: -1}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Vendor Contact Creat Query Error', 'Vendor.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Vendor Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}
// Vendor contact view 
exports.VendorContact_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.Vendor_Id || ReceivingData.Vendor_Id === '') {
      res.status(400).send({Status: false, Message: 'Vendor Details cannot be empty'});
   } else if(!ReceivingData.Contact_Id || ReceivingData.Contact_Id === '') {
      res.status(400).send({Status: false, Message: 'contact Details cannot be empty'});
   } else {
      PurchaseModel.VendorContactSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.Vendor_Id), _id: mongoose.Types.ObjectId(ReceivingData.Contact_Id)}, {})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact view Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while view the Crm Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}