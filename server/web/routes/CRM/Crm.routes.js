module.exports = function(app) {
   var CrmCustomerController = require('./../../controller/CRM/Customer.controller.js');
   var CrmContactController = require('./../../controller/CRM/Contact.controller.js');
   var CrmActivitiesController = require('./../../controller/CRM/Activities.controller.js');
   var CrmOthersController = require('./../../controller/CRM/Other.controller.js');
   var CrmRemindersController = require('./../../controller/CRM/Reminders.controller.js');
   var CrmQuoteController = require('./../../controller/CRM/Quote.controller.js');
   var CrmReviseController = require('./../../controller/CRM/Revise.controller.js');
   var CrmSaleOrderController = require('./../../controller/CRM/SaleOrder.controller.js');

   // CRM Customer
   app.post('/API/Crm/Phone_AsyncValidators', CrmCustomerController.Phone_AsyncValidators);
   app.post('/API/Crm/Crm_Customer_Create', CrmCustomerController.CrmCustomer_Create);
   app.post('/API/Crm/Crm_Customer_List', CrmCustomerController.CrmCustomer_List);
   app.post('/API/Crm/Crm_Customer_SimpleList', CrmCustomerController.CrmCustomer_SimpleList);
   app.post('/API/Crm/Crm_Customer_View', CrmCustomerController.CrmCustomer_View);
   // Crm Contact
   app.post('/API/Crm/Crm_Contact_Mobile_AsyncValidators', CrmContactController.Mobile_AsyncValidators);
   app.post('/API/Crm/Crm_Contact_Name_AsyncValidators', CrmContactController.Name_AsyncValidators);
   app.post('/API/Crm/Crm_Contact_Create', CrmContactController.CrmContact_Create);
   app.post('/API/Crm/Crm_Contact_List', CrmContactController.CrmContact_List);
   app.post('/API/Crm/Crm_Contact_Simple_List', CrmContactController.CrmContact_SimpleList);
   app.post('/API/Crm/Crm_Contact_View', CrmContactController.CrmContact_View);
   // Crm Activities
   app.post('/API/Crm/Crm_Activities_Create', CrmActivitiesController.CrmActivities_Create);
   app.post('/API/Crm/Crm_Activities_List', CrmActivitiesController.CrmActivities_List);
   // Crm Reminders
   app.post('/API/Crm/Crm_Reminders_Create', CrmRemindersController.CrmReminders_Create);
   app.post('/API/Crm/Crm_Reminders_List', CrmRemindersController.CrmReminder_List);
   // Crm Others
   app.post('/API/Crm/Crm_Others_Create', CrmOthersController.CrmOthers_Create);
   app.post('/API/Crm/Crm_Others_List', CrmOthersController.CrmOthers_List);
   // Crm Quote Create
   app.post('/API/Crm/Crm_Quote_Create', CrmQuoteController.CrmQuote_Create);
   app.post('/API/Crm/Crm_Quote_List', CrmQuoteController.CrmQuote_List);
   app.post('/API/Crm/Crm_Quote_View', CrmQuoteController.CrmQuote_View);
   app.post('/API/Crm/Crm_Quote_Edit', CrmQuoteController.CrmQuote_Edit);
   app.post('/API/Crm/Crm_Quote_Approve', CrmQuoteController.CrmQuote_Approved);
   // Crm Revise Create
   app.post('/API/Crm/Crm_Revise_Create', CrmReviseController.CrmRevise_Create);
   app.post('/API/Crm/Crm_Revise_List', CrmQuoteController.CrmRevise_List);
   // Crm SaleOrder Create
   app.post('/API/Crm/SaleOrder_Ref_Number_AsyncValidators', CrmSaleOrderController.SaleOrder_AsyncValidators);
   app.post('/API/Crm/Crm_SaleOrder_Create', CrmSaleOrderController.CrmSaleOrder_Create);
   app.post('/API/Crm/Crm_SaleOrder_List', CrmSaleOrderController.CrmSaleOrder_List);
   app.post('/API/Crm/Crm_SaleOrder_View', CrmSaleOrderController.CrmSaleOrder_View);
   app.post('/API/Crm/Crm_SaleOrder_CreateDeliverOrder', CrmSaleOrderController.CrmSaleOrder_CreateDeliverOrder);

}