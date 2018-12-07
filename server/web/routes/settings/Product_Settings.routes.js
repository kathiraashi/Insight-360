module.exports = function(app){

   var Controller = require('../../controller/settings/Product_Settings.controller.js');

   // Lead Source
      app.post('/API/Product_Settings/UOM_AsyncValidate', Controller.UOM_AsyncValidate);
      app.post('/API/Product_Settings/UOM_Create', Controller.UOM_Create);
      app.post('/API/Product_Settings/UOM_List', Controller.UOM_List);
      app.post('/API/Product_Settings/UOM_Update', Controller.UOM_Update);
      app.post('/API/Product_Settings/UOM_Delete', Controller.UOM_Delete);


};