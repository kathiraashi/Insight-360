var CryptoJS = require("crypto-js");
var NotificationModel = require('../../models/Notification/Notification.model');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************* Notify ****************************************
// Notify List
exports.Notify_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: "Company Details can\'t be empty"});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: "User Details can\'t be empty"});
   } else {
      NotificationModel.NotifySchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), User_Id: mongoose.Types.ObjectId(ReceivingData.User_Id)}, {}, {sort: {createdAt: -1}})
      .populate({ path: 'Notification_Id', populate: { path: 'Reference_Id', select: ['Company_Name']}})
      .populate({ path: 'Notification_Id', populate: { path: 'User_Id', select: ['Name', 'User_Type']}})
      .populate({ path: 'User_Id', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Notify List Query Error', 'Notification.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Listing the Notify!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         } 
      });
   }
}
// notify checked
exports.Notify_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: "Company Details can\'t be empty"});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: "User Details can\'t be empty"});
   } else if(!ReceivingData.notified || ReceivingData.notified === '') {
      res.status(400).send({Status: false, Message: "notified Details can\'t be empty"});
   } else {
      const Notification_Id = ReceivingData.notified.map(x => mongoose.Types.ObjectId(x));
      NotificationModel.NotifySchema
      .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: {$in: Notification_Id}}, {$set: {If_Notify: true}})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Notify update Query Error', 'Notification.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while update the Notify!."});
         } else {
            res.status(200).send({Status: true});
         } 
      });
   }
}