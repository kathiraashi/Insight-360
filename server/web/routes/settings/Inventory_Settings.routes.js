module.exports = function(app) {

   var Controller = require('../../controller/settings/Inventory_Settings.controller.js');

// ware house -----------------------------------------------
   app.post('/API/Inventory_Settings/Ware_House_AsyncValidate', Controller.Ware_House_AsyncValidate);
   app.post('/API/Inventory_Settings/Ware_House_Create', Controller.Ware_House_Create);
   app.post('/API/Inventory_Settings/Ware_House_List', Controller.Ware_House_List);
   app.post('/API/Inventory_Settings/Ware_House_Simple_List', Controller.Ware_House_Simple_List);
   app.post('/API/Inventory_Settings/Ware_House_Update', Controller.Ware_House_Update);
   app.post('/API/Inventory_Settings/Ware_House_Delete', Controller.Ware_House_Delete);
}
