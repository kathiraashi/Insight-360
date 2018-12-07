var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var AccountsModel = require('./../../models/Accounts/Accounts.model.js');

// ******************************* Accounts Income ************************************
// Income create
exports.Income_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Income_Type || ReceivingData.Income_Type === '') {
      res.status(400).send({Status: false, Message: 'Income Details Cannot be empty'});
   } else {
      var Create_Income = new AccountsModel.IncomeSchema({
         Income_Type: mongoose.Types.ObjectId(ReceivingData.Income_Type),
         Amount: ReceivingData.Amount,
         Date: ReceivingData.Date,
         Description: ReceivingData.Description,
         Mode_Of_Pay: ReceivingData.Mode_Of_Pay,
         Bank_Method: ReceivingData.Bank_Method,
         Reference_No: ReceivingData.Reference_No,
         Cheque_No: ReceivingData.Cheque_No,
         Expected_Date_Clearing: ReceivingData.Expected_Date_Clearing,
         Issues_Bank: ReceivingData.Issues_Bank,
         Issues_Branch: ReceivingData.Issues_Branch,
         Deposit_Bank: mongoose.Types.ObjectId(ReceivingData.Deposit_Bank),
         Status: 'Draft',
         Income_Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
      });
      Create_Income.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income Creation Query Error', 'Income.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Income!."});
         } else {
            res.status(200).send({Status: true, Message: "Successfully Income Created" });
         }
      });
   }
}

// Income List
exports.Income_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      AccountsModel.IncomeSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {Income_Type: 1, Date: 1, Amount: 1, Status: 1, Income_Status: 1 }, {sort: {createdAt: -1, updatedAt: -1}})
      .populate({path: 'Income_Type', select: ['Income_Type']})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income List Query Error', 'Income.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Income!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         } 
      });
   }
}

// Income View
exports.Income_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Income_Id || ReceivingData.Income_Id === '') {
      res.status(400).send({Status: false, Message: 'Income Details Cannot be empty'});
   } else {
      AccountsModel.IncomeSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Income_Id)}, {}, {})
      .populate({path: 'Income_Type', select: []})
      .populate({path: 'Deposit_Bank', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income List Query Error', 'Income.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Income!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         } 
      });
   }
}