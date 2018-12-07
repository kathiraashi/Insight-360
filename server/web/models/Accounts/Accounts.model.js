var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Accounts income schema
var IncomeSchema = mongoose.Schema({
   Income_Type: {type: Schema.Types.ObjectId, ref: 'IncomeType', required: true},
   Amount: {type: String, required: true},
   Date: {type: Date, required: true},
   Description: {type: String},
   Mode_Of_Pay: {type: String, required: true},
   Bank_Method: {type: String},
   Reference_No: {type: String},
   Cheque_No: {type: String},
   Expected_Date_Clearing: {type: Date},
   Issues_Bank: {type: String},
   Issues_Branch:  {type: String},
   Deposit_Bank: {type: Schema.Types.ObjectId, ref: 'Bank'},
   Income_Status: { type: String},
   Status: {type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, 
   {timestamps: true}
);
var VarIncomeSchema = mongoose.model('AccountsIncome', IncomeSchema, 'Accounts_Income_List')

// Accounts loan schema
var LoanSchema = mongoose.Schema({
   Lender_Name: { type: String, required: true },
   Lender_Account_Number: { type: String, required: true},
   Amount: {type: String, required: true},
   Date: { type: Date, required: true },
   Interest_Rate: { type: String, required: true },
   Cycle_Of_Prepayment: { type: String, required: true},
   No_Of_Week: {type: String},
   No_Of_Months: {type: String},
   Start_From: {type: Date},
   Mode_Of_Pay: {type: String, required: true},
   Bank_Method: {type: String},
   Reference_No: {type: String},
   Cheque_No: {type: String},
   Expected_Date_Clearing: {type: Date},
   Issues_Bank: {type: String},
   Issues_Branch:  {type: String},
   Deposit_Bank: {type: Schema.Types.ObjectId, ref: 'Bank'},
   Loan_Status: { type: String},
   Status: {type: String},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   {timestamps: true}

);
var VarLoanSchema = mongoose.model('AccountsLoan', LoanSchema, 'Accounts_Loan_List');

// Account loan payment list (sub table)
var LoanPaymentSchema = mongoose.Schema({
   Accounts_Loan_Id: { type: Schema.Types.ObjectId, ref: 'AccountsLoan', required: true},
   Table_Date: {type: Date, required: true },
   Table_Amount: { type: String, required: true},
   Loan_Payment_Status: { type: String },
   Status: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   {timestamps: true}
);
var VarLoanPaymentSchema = mongoose.model('AccountsLoanPayment', LoanPaymentSchema, 'Accounts_Loan_Payment_List')

// Cash registers
var CashRegisterSchema = mongoose.Schema({
   Reference_Key: {type: String, required: true},
   Income_Reference_Id: {type: Schema.Types.ObjectId, ref: 'AccountsIncome'},
   Loan_Reference_Id: {type: Schema.Types.ObjectId, ref: 'AccountsLoan'},
   Type: { type: String, required: true},
   Date: {type: Date, required: true},
   Credit: {type: String},
   Debit: {type: String },
   Balance: {type: String, required: true},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarCashRegisterSchema = mongoose.model('AccountsCashRegister', CashRegisterSchema, 'Accounts_Cash_Register_List');

// Bank register
var BankRegisterSchema = mongoose.Schema({
   Reference_Key: {type: String, required: true},
   Income_Reference_Id: {type: Schema.Types.ObjectId, ref: 'AccountsIncome'},
   Loan_Reference_Id: {type: Schema.Types.ObjectId, ref: 'AccountsLoan'},
   Type: { type: String, required: true},
   Date: {type: Date, required: true},
   Credit: {type: String},
   Debit: {type: String },
   Balance: {type: String, required: true},
   Bank: {type: Schema.Types.ObjectId, ref: 'Bank'},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   }, {timestamps: true}
);
var VarBankRegisterSchema = mongoose.model('AccountsBankRegister', BankRegisterSchema, 'Accounts_Bank_Register_List');

module.exports = {
   IncomeSchema: VarIncomeSchema,
   LoanSchema: VarLoanSchema,
   LoanPaymentSchema: VarLoanPaymentSchema,
   CashRegisterSchema: VarCashRegisterSchema,
   BankRegisterSchema: VarBankRegisterSchema
}