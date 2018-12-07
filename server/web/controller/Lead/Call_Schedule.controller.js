var CryptoJS = require("crypto-js");
var LeadsModel = require('../../models/Leads/Leads.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ****************************************** Call Schedule **************************************
// Call Schedule Create
exports.CallSchedule_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details cannot be empty" });
   } else if (!ReceivingData.Company_Name || ReceivingData.Company_Name === ''  ) {
      res.status(400).send({Status: false, Message: "Company Name Details cannot be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: "Date Details cannot be empty" });
   } else if (!ReceivingData.Contact_Person || ReceivingData.Contact_Person === ''  ) {
      res.status(400).send({Status: false, Message: "Contact Person Details cannot be empty" });
   } else {
      var Create_CallSchedule = new LeadsModel.CallSchedule({
         Company_Name: mongoose.Types.ObjectId(ReceivingData.Company_Name),
         Date: ReceivingData.Date,
         Contact_Person: ReceivingData.Contact_Person,
         Description: ReceivingData.Description,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CallSchedule.save(function(err, result) {
         if(err){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Call Schedule Creation Query Error', 'Lead.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Call schedule!."});
         } else {
            LeadsModel.LeadsSchema.update({_id: mongoose.Types.ObjectId(ReceivingData.Company_Name), Company_Id:mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {$inc: {Call_Schedule_Count: +1}})
            .exec(function(err_1, result_1) {
               if(err_1){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Call Schedule update count Query Error', 'Lead.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Call Schedule update count!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Successfully Call Schedule Created'});
               }
            });
         }
      });
   }
};


// Call Schedule List
exports.CallSchedule_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      LeadsModel.CallSchedule
      .find({Company_Id: ReceivingData.Company_Id, Active_Status: true, If_Deleted: false},{}, {$sort: {createdAt: -1}})
      .populate({ path: 'Company_Name', select: ['Company_Name'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Call Schedule Find Query Error', 'Call_Schedule.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Call Schedule!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}


// Filter Customer Call Schedule List
exports.FilteredCallSchedule_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else if (!ReceivingData.Lead_Id || ReceivingData.Lead_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Lead Details cannot be empty" });
   } else {
      LeadsModel.CallSchedule
      .find({Company_Id: ReceivingData.Company_Id, Company_Name: ReceivingData.Lead_Id, Active_Status: true, If_Deleted: false},{}, {$sort: {createdAt: -1}})
      .populate({ path: 'Company_Name', select: ['Company_Name'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Call Schedule Find Query Error', 'Call_Schedule.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Call Schedule!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}