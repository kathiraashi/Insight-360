module.exports = function(app){

   var Controller = require('../../controller/settings/Hr_Settings.controller.js');

   // Employee Category
       app.post('/API/Hr_Settings/Employeecategory_AsyncValidate', Controller.Employeecategory_AsyncValidate);
      app.post('/API/Hr_Settings/Employee_category_Create', Controller.Employee_category_Create);
      app.post('/API/Hr_Settings/Employee_category_List', Controller.Employee_category_List);
      app.post('/API/Hr_Settings/Employee_category_SimpleList', Controller.Employee_category_SimpleList);
      app.post('/API/Hr_Settings/Employee_category_Update', Controller.Employee_category_Update);
      app.post('/API/Hr_Settings/Employee_category_Delete', Controller.Employee_category_Delete);

}