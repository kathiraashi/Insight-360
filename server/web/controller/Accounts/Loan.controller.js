var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var AccountsModel = require('./../../models/Accounts/Accounts.model.js')

// ******************************* Accounts Loan ************************************
// Loan create
exports.Loan_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      var Create_Loan = new AccountsModel.LoanSchema({
         Lender_Name: ReceivingData.Lender_Name,
         Lender_Account_Number: ReceivingData.Lender_Account_Number,
         Amount: ReceivingData.Amount,
         Date: ReceivingData.Date,
         Interest_Rate: ReceivingData.Interest_Rate,
         Cycle_Of_Prepayment: ReceivingData.Cycle_Of_Prepayment,
         No_Of_Week: ReceivingData.No_Of_Week,
         No_Of_Months: ReceivingData.No_Of_Months,
         Start_From: ReceivingData.Start_From,
         Mode_Of_Pay: ReceivingData.Mode_Of_Pay,
         Bank_Method: ReceivingData.Bank_Method,
         Reference_No: ReceivingData.Reference_No,
         Cheque_No: ReceivingData.Cheque_No,
         Expected_Date_Clearing: ReceivingData.Expected_Date_Clearing,
         Issues_Bank: ReceivingData.Issues_Bank,
         Issues_Branch: ReceivingData.Issues_Branch,
         Deposit_Bank: mongoose.Types.ObjectId(ReceivingData.Deposit_Bank),
         Status: 'Draft',
         Loan_Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
      });
      Create_Loan.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan Creation Query Error', 'Loan.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Loan!."});
         } else {
            const itemArray = ReceivingData.Payment_List.map(obj => {
               const newObj = {
                  Accounts_Loan_Id: mongoose.Types.ObjectId(result._id),
                  Table_Date: obj.Table_Date,
                  Table_Amount: obj.Table_Amount,
                  Loan_Payment_Status: obj.Loan_Payment_Status,
                  Status: obj.Status,
                  Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                  Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                  Active_Status: true,
                  If_Deleted: false,
               }
               return newObj;
            });
            AccountsModel.LoanPaymentSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan Creation Query Error', 'Loan.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Loan!."});
               } else {
                  res.status(200).send({Status: true, Message: "Successfully Loan Created" });
               }
            });
         }
      });
   }
}

// Loan List
exports.Loan_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      AccountsModel.LoanSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {Lender_Account_Number: 1, Date: 1, Lender_Name: 1, Amount: 1, Status: 1, Loan_Status: 1, Cycle_Of_Prepayment: 1 }, {sort: {createdAt: -1, updatedAt: -1}})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan List Query Error', 'Loan.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while listing the Loan!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         } 
      });
   }
}

// Loan View
exports.Loan_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Income_Id || ReceivingData.Income_Id === '') {
      res.status(400).send({Status: false, Message: 'Income Details Cannot be empty'});
   } else {
      AccountsModel.LoanSchema
      .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Income_Id)}, {}, {})
      .populate({path: 'Deposit_Bank', select: []})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan View Query Error', 'Loan.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Loan!."});
         } else {
            AccountsModel.LoanPaymentSchema
            .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Accounts_Loan_Id: mongoose.Types.ObjectId(result._id)}, {}, {})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan View Query Error', 'Loan.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while View the Loan!."});
               } else {
                  const Data = { 'LoanDetails': result, 'LoanPaymentDetails': result_1 };
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         } 
      });
   }
}