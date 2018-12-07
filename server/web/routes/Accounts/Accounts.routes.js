module.exports = function(app) {
   var AccountIncomeController = require('./../../controller/Accounts/Income.controller.js');
   var AccountLoanController = require('./../../controller/Accounts/Loan.controller.js');
   var AccountRegisterController = require('./../../controller/Accounts/Register.controller.js');

   // Accounts Income
   app.post('/API/Accounts/Income_Create', AccountIncomeController.Income_Create);
   app.post('/API/Accounts/Income_List', AccountIncomeController.Income_List);
   app.post('/API/Accounts/Income_View', AccountIncomeController.Income_View);

   // Accounts Loan
   app.post('/API/Accounts/Loan_Create', AccountLoanController.Loan_Create);
   app.post('/API/Accounts/Loan_List', AccountLoanController.Loan_List);
   app.post('/API/Accounts/Loan_View', AccountLoanController.Loan_View);

   // Accounts Register
   app.post('/API/Accounts/Register_Create', AccountRegisterController.Register_Create);
   app.post('/API/Accounts/Register_Bank_List', AccountRegisterController.BankRegister_List);
   app.post('/API/Accounts/Register_Cash_List', AccountRegisterController.CashRegister_List);

}