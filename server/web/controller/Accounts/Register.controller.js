var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var AccountsModel = require('./../../models/Accounts/Accounts.model.js');

// ************************************** Account Register **********************************
// Register Create
exports.Register_Create = function(req,res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Reference_Key || ReceivingData.Reference_Key === '') {
      res.status(400).send({Status: false, Message: 'Reference Details Cannot be empty'});
   } else if(!ReceivingData.Reference_Id || ReceivingData.Reference_Id === '') {
      res.status(400).send({Status: false, Message: 'Reference Details Cannot be empty'});
   } else if(!ReceivingData.Type || ReceivingData.Type === '') {
      res.status(400).send({Status: false, Message: 'Type Details Cannot be empty'});
   } else {
      var tempType = (ReceivingData.Type === 'Income') ? 'Income/Investment' : 'Loan';
      if (ReceivingData.Type === 'Income') {
         AccountsModel.IncomeSchema
         .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {}, {})
         .exec(function(Income_err_1, Income_result_1) {
            if (Income_err_1) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income Find Query Error', 'Register.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while Finding income!."});
            } else {
               // console.log(Income_result_1);
               if (Income_result_1.Mode_Of_Pay === 'Bank') {
                  bankRegister(Income_result_1);
               } else {
                  cashRegister(Income_result_1);
               }
            }
         });
      } else {
         AccountsModel.LoanSchema
         .findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {}, {})
         .exec(function(Loan_err_1, Loan_result_1) {
            if (Loan_err_1) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income Find Query Error', 'Register.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while Finding income!."});
            } else {
               // console.log(Loan_result_1);
               if (Loan_result_1.Mode_Of_Pay === 'Bank') {
                  bankRegister(Loan_result_1);
               } else {
                  cashRegister(Loan_result_1);
               }
            }
         });
      }
   }

   function bankRegister(DataInput) {
      AccountsModel.BankRegisterSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Bank: mongoose.Types.ObjectId(DataInput.Deposit_Bank)}, {Balance: 1}, {sort: {_id: -1}, limit: 1})
      .exec(function(bank_err_1, bank_result_1) {
         if (bank_err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Find Query Error', 'Register.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding Bank!."});
         } else {
            var tempBalance = "";
            var tempReferenceIncomeId = "";
            var tempReferenceLoanId = "";
            if (bank_result_1.length > 0) {
               tempBalance = (parseFloat(DataInput.Amount) + parseFloat(bank_result_1[0].Balance)).toFixed(2).toString();
            } else {
               tempBalance = DataInput.Amount;
            }
            if (ReceivingData.Type === 'Income') {
               tempReferenceIncomeId = ReceivingData.Reference_Id;
               tempReferenceLoanId = null;
            } else {
               tempReferenceIncomeId = null;
               tempReferenceLoanId = ReceivingData.Reference_Id;
            }
            console.log(tempBalance);
            var Create_BankRegister = new AccountsModel.BankRegisterSchema({
               Reference_Key: ReceivingData.Reference_Key,
               Income_Reference_Id: mongoose.Types.ObjectId(tempReferenceIncomeId),
               Loan_Reference_Id: mongoose.Types.ObjectId(tempReferenceLoanId),
               Type: tempType,
               Date: new Date(),
               Credit: DataInput.Amount,
               Debit: null,
               Balance: tempBalance,
               Bank: mongoose.Types.ObjectId(DataInput.Deposit_Bank),
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false,
            });
            Create_BankRegister.save(function(bank_err_2, bank_result_2) {
               if (bank_err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Register Creation Query Error', 'Register.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Bank Register!."});
               } else {
                  if(ReceivingData.Type === 'Income') {
                     AccountsModel.IncomeSchema
                     .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {$set: {Income_Status: 'Credited', Status: 'Credited'}}, {})
                     .exec(function(updateIncomeErr, updateIncomeResult) {
                        if (updateIncomeErr) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income status update Query Error', 'Register.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while update the Income Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: "Successfully Bank Register Created" });
                        }
                     });
                  } else {
                     AccountsModel.LoanSchema
                     .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {$set: {Loan_Status: 'Credited', Status: 'Credited'}}, {})
                     .exec(function(updateBankErr, updateBankResult) {
                        if (updateBankErr) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan status update Query Error', 'Register.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while update the Income Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: "Successfully Bank Register Created" });
                        }
                     });
                  }
               }
            }); 
         }
      });
   }

   function cashRegister(DataInput) {
      AccountsModel.CashRegisterSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {Balance: 1}, {sort: {_id: -1}, limit: 1})
      .exec(function(cash_err_1, cash_result_1) {
         if (cash_err_1) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cash Find Query Error', 'Register.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while Finding income!."});
         } else {
            var tempBalance = "";
            if (cash_result_1.length > 0) {
               tempBalance = (parseFloat(DataInput.Amount) + parseFloat(cash_result_1[0].Balance)).toFixed(2).toString();
            } else {
               tempBalance = DataInput.Amount;
            }
            if (ReceivingData.Type === 'Income') {
               tempReferenceIncomeId = ReceivingData.Reference_Id;
               tempReferenceLoanId = null;
            } else {
               tempReferenceIncomeId = null;
               tempReferenceLoanId = ReceivingData.Reference_Id;
            }
            console.log(tempBalance);
            var Create_CashRegister = new AccountsModel.CashRegisterSchema({
               Reference_Key: ReceivingData.Reference_Key,
               Income_Reference_Id: mongoose.Types.ObjectId(tempReferenceIncomeId),
               Loan_Reference_Id: mongoose.Types.ObjectId(tempReferenceLoanId),
               Type: tempType,
               Date: new Date(),
               Credit: DataInput.Amount,
               Debit: null,
               Balance: tempBalance,
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
               Active_Status: true,
               If_Deleted: false,
            });
            Create_CashRegister.save(function(cash_err_2, cash_result_2) {
               if (cash_err_2) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cash Register Creation Query Error', 'Register.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Cash Register!."});
               } else {
                  if(ReceivingData.Type === 'Income') {
                     AccountsModel.IncomeSchema
                     .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {$set: {Income_Status: 'Credited', Status: 'Credited'}}, {})
                     .exec(function(updateIncomeErr, updateIncomeResult) {
                        if (updateIncomeErr) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Income status update Query Error', 'Register.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while update the Loan Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: "Successfully Cash Register Created" });
                        }
                     });
                  } else {
                     AccountsModel.LoanSchema
                     .updateMany({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, _id: mongoose.Types.ObjectId(ReceivingData.Reference_Id)}, {$set: {Loan_Status: 'Credited', Status: 'Credited'}}, {})
                     .exec(function(updateBankErr, updateResult) {
                        if (updateBankErr) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Loan status update Query Error', 'Register.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while update the Loan Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: "Successfully Cash Register Created" });
                        }
                     });
                  }
               }
            });
         }
      });
      
   }
}

// Bank Register List
exports.BankRegister_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.Bank_Id || ReceivingData.Bank_Id === '') {
      res.status(400).send({Status: false, Message: 'Bank Details Cannot be empty'});
   } else {
      AccountsModel.BankRegisterSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true, Bank: mongoose.Types.ObjectId(ReceivingData.Bank_Id)}, {}, {sort: {createdAt: -1}})
      .populate({path: 'Income_Reference_Id', select: ['Income_Type'], populate: {path: 'Income_Type', select: ['Income_Type']}})
      .populate({path: 'Loan_Reference_Id', select: ['Lender_Name', 'Lender_Account_Number']})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank register find Query Error', 'Register.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while finding the Bank register!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// cash Register List
exports.CashRegister_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else {
      AccountsModel.CashRegisterSchema
      .find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), If_Deleted: false, Active_Status: true}, {}, {sort: {createdAt: -1}})
      .populate({path: 'Income_Reference_Id', select: ['Income_Type'], populate: {path: 'Income_Type', select: ['Income_Type']}})
      .populate({path: 'Loan_Reference_Id', select: ['Lender_Name', 'Lender_Account_Number']})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cash register find Query Error', 'Register.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while finding the Cash register!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}