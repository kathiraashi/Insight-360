module.exports = function(app) {

   var Controller = require('../../controller/settings/CRM_Settings.controller.js');

   // Industry Type -----------------------------------------------
      app.post('/API/CRM_Settings/Industry_Type_Create', Controller.Industry_Type_Create);
      app.post('/API/CRM_Settings/Industry_Type_List', Controller.Industry_Type_List);
      app.post('/API/CRM_Settings/Industry_Type_SimpleList', Controller.Industry_Type_SimpleList);
      app.post('/API/CRM_Settings/Industry_Type_Update', Controller.Industry_Type_Update);
      app.post('/API/CRM_Settings/Industry_Type_Delete', Controller.Industry_Type_Delete);

      
   // Ownership Type -----------------------------------------------
      app.post('/API/CRM_Settings/Ownership_Type_Create', Controller.Ownership_Type_Create);
      app.post('/API/CRM_Settings/Ownership_Type_List', Controller.Ownership_Type_List);
      app.post('/API/CRM_Settings/Ownership_Type_SimpleList', Controller.Ownership_Type_SimpleList);
      app.post('/API/CRM_Settings/Ownership_Type_Update', Controller.Ownership_Type_Update);
      app.post('/API/CRM_Settings/Ownership_Type_Delete', Controller.Ownership_Type_Delete);

};