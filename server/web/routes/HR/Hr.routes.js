module.exports = function(app) {
   var HrEmployeeController = require('./../../controller/HR/Employee.controller.js');

   // Hr Customer
   app.post('/API/Hr/Mobile_AsyncValidators', HrEmployeeController.Mobile_AsyncValidators);
   app.post('/API/Hr/Employee_Create', HrEmployeeController.HrEmployee_Create);
   app.post('/API/Hr/Employee_Code', HrEmployeeController.HrEmployee_Code);
   app.post('/API/Hr/Employee_List', HrEmployeeController.HrEmployee_List);
}