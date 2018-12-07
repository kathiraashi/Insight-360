var CryptoJS = require("crypto-js");
var LeadsModel = require('../../models/Leads/Leads.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// *************************************** Lead ***************************************
// Phone Async Validate
exports.Phone_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
      res.status(400).send({Status: false, Message: "Phone number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details cannot be empty" });
   }else {
      LeadsModel.LeadsSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Phone': { $regex : new RegExp("^" + ReceivingData.Phone + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
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
// Lead Create
exports.Leads_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({ Status: false, Message: 'Company Details can\'t be empty' });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({ Status: false, Message: 'User Details can\'t be empty' });
   } else if(!ReceivingData.Company_Name || ReceivingData.Company_Name === '') {
      res.status(400).send({ Status: false, Message: 'Company details can\'t be empty' });
   } else if(!ReceivingData.Product || ReceivingData.Product === '') {
      res.status(400).send({ Status: false, Message: 'Product details can\'t be empty' });
   } else if(!ReceivingData.Phone || ReceivingData.Phone === '') {
      res.status(400).send({ Status: false, Message: 'Phone details can\'t be empty' });
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
      const _Product = ReceivingData.Product.map(obj => mongoose.Types.ObjectId(obj));
      if(ReceivingData.Lead_Source !== null && ReceivingData.Lead_Source !== '') {
       ReceivingData.Lead_Source = mongoose.Types.ObjectId(ReceivingData.Lead_Source);  
      }
      var Create_Leads = new LeadsModel.LeadsSchema ({
         Company_Name: ReceivingData.Company_Name,
         Email: ReceivingData.Email,
         Phone: ReceivingData.Phone,
         Lead_Source: ReceivingData.Lead_Source,
         Priority: ReceivingData.Priority,
         Product: _Product,
         Assign_To: ReceivingData.Assign_To,
         "Address.Street": ReceivingData.Street,
         "Address.Area": ReceivingData.Area,
         "Address.ZipCode": ReceivingData.ZipCode,
         "Address.Country": ReceivingData.Country,
         "Address.State": ReceivingData.State,
         "Address.City": ReceivingData.City,
         Log_Call_Count: 0,
         Call_Schedule_Count: 0,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Leads.save(function(err, result) {
         if(err){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Creation Query Error', 'Lead.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Lead!."});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Lead Created'});
         }
      });
   }
};

// Lead List
exports.Leads_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({ Status: false, Message: 'Company Details can\'t be empty' });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({ Status: false, Message: 'User Details can\'t be empty' });
   } else {
      LeadsModel.LeadsSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {Company_Name: 1, Phone: 1, Email: 1, createdAt: 1, Log_Call_Count: 1, Call_Schedule_Count: 1})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Find Query Error', 'Lead.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Lead View
exports.Leads_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({ Status: false, Message: 'Company Details can\'t be empty' });
   } else  if(!ReceivingData.Lead_Id || ReceivingData.Lead_Id === '') {
      res.status(400).send({ Status: false, Message: 'Leads Details can\'t be empty' });
   } else {
      LeadsModel.LeadsSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id, _id: ReceivingData.Lead_Id}, {})
      .populate({ path: 'Product', select: ['Product_Name_withAttribute'] })
      .populate({ path: 'Lead_Source', select: ['Lead_Source'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead View Query Error', 'Lead.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while View The Lead!."});
         } else {
            
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Lead Simple List
exports.Leads_Simple_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({ Status: false, Message: 'Company Details can\'t be empty' });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({ Status: false, Message: 'User Details can\'t be empty' });
   } else {
      LeadsModel.LeadsSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {_id: 1, Company_Name: 1})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Find Query Error', 'Lead.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
