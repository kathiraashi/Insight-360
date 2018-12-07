module.exports = function(app) {
   var InventoryConfigController = require('../../controller/Configuration/Inventory_Configuration.controller.js');
   var ProductConfigController = require('./../../controller/Configuration/Product_Configuration.controller.js');
   var AccountsConfigController = require('./../../controller/Configuration/Accounts_Configuration.controller.js');
   var CrmConfigController = require('./../../controller/Configuration/Crm_Configuration.controller.js');
   var PurchaseConfigController = require('./../../controller/Configuration/Purchase_Configuration.controller.js');
   var HrConfigController = require('./../../controller/Configuration/Hr_Configuration.controller');

   // Inventory Configuration
   app.post('/API/Inventory/InventoryConfig_Create', InventoryConfigController.InventoryConfig_Create);
   app.post('/API/Inventory/InventoryConfig_List', InventoryConfigController.InventoryConfig_List);
   app.post('/API/Inventory/InventoryConfig_Update', InventoryConfigController.InventoryConfig_Update);

   // Product ConfigurationHr 
   app.post('/API/Product/ProductConfig_Create', ProductConfigController.ProductConfig_Create);
   app.post('/API/Product/ProductConfig_List', ProductConfigController.ProductConfig_List);
   app.post('/API/Product/ProductConfig_Update', ProductConfigController.ProductConfig_Update);
   
   // Accounts Configuration
   app.post('/API/Accounts/AccountsConfig_Create', AccountsConfigController.AccountsConfig_Create);
   app.post('/API/Accounts/AccountsConfig_List', AccountsConfigController.AccountsConfig_List);
   app.post('/API/Accounts/AccountsConfig_Update', AccountsConfigController.AccountsConfig_Update);

   // Purchase Configuration
   app.post('/API/Purchase/PurchaseConfig_Create', PurchaseConfigController.PurchaseConfig_Create);
   app.post('/API/Purchase/PurchaseConfig_List', PurchaseConfigController.PurchaseConfig_List);
   app.post('/API/Purchase/PurchaseConfig_Update', PurchaseConfigController.PurchaseConfig_Update);

   // Crm Configuration
   app.post('/API/Crm/CrmConfig_Create', CrmConfigController.CrmConfig_Create);
   app.post('/API/Crm/CrmConfig_List', CrmConfigController.CrmConfig_List);
   app.post('/API/Crm/CrmConfig_Update', CrmConfigController.CrmConfig_Update);

   // Hr Configuration
   app.post('/API/Hr/HrConfig_Create', HrConfigController.HrConfig_Create);
   app.post('/API/Hr/HrConfig_List', HrConfigController.HrConfig_List);
   app.post('/API/Hr/HrConfig_Update', HrConfigController.HrConfig_Update);
}