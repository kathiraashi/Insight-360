module.exports = function(app) {
   var PurchaseVendorController = require('../../controller/Purchase/Vendor.controller.js');
   var PurchaseVendorContactController = require('../../controller/Purchase/Contact.controller.js');
   var PurchaseRequestController = require('../../controller/Purchase/PurchaseRequest.controller.js');
   var PurchaseQuoteController = require('../../controller/Purchase/Quote.controller.js');

   // Purchase Vendor
   app.post('/API/Purchase/Phone_AsyncValidators', PurchaseVendorController.Phone_AsyncValidators);
   app.post('/API/Purchase/Purchase_Vendor_Create', PurchaseVendorController.PurchaseVendor_Create);
   app.post('/API/Purchase/Purchase_Vendor_List', PurchaseVendorController.PurchaseVendor_List);
   app.post('/API/Purchase/Purchase_Vendor_SimpleList', PurchaseVendorController.PurchaseVendor_SimpleList);
   app.post('/API/Purchase/Purchase_Vendor_View', PurchaseVendorController.PurchaseVendor_View);
   // Vendor Contact
   app.post('/API/Purchase/Vendor_Contact_Mobile_AsyncValidators', PurchaseVendorContactController.Mobile_AsyncValidators);
   app.post('/API/Purchase/Vendor_Contact_Name_AsyncValidators', PurchaseVendorContactController.Name_AsyncValidators);
   app.post('/API/Purchase/Vendor_Contact_Create', PurchaseVendorContactController.VendorContact_Create);
   app.post('/API/Purchase/Vendor_Contact_List', PurchaseVendorContactController.VendorContact_List);
   app.post('/API/Purchase/Vendor_Contact_SimpleList', PurchaseVendorContactController.VendorContact_SimpleList);
   app.post('/API/Purchase/Vendor_Contact_View', PurchaseVendorContactController.VendorContact_View);
   // Purchase Request
   app.post('/API/Purchase/Purchase_Request_Number_AsyncValidators',PurchaseRequestController.RequestedNumber_AsyncValidators);
   app.post('/API/Purchase/Purchase_Request_Create',PurchaseRequestController.PurchaseRequest_Create);
   app.post('/API/Purchase/Purchase_Request_List',PurchaseRequestController.PurchaseRequest_List);
   app.post('/API/Purchase/Purchase_Request_ApprovedList',PurchaseRequestController.PurchaseRequest_ApprovedList);
   app.post('/API/Purchase/Purchase_Request_View',PurchaseRequestController.PurchaseRequest_View);
   app.post('/API/Purchase/Purchase_Request_Edit',PurchaseRequestController.PurchaseRequest_Edit);
   app.post('/API/Purchase/Purchase_Request_Approve',PurchaseRequestController.PurchaseRequest_Approve);
   app.post('/API/Purchase/Purchase_Request_RequestApprove',PurchaseRequestController.PurchaseRequest_RequestApprove);
   app.post('/API/Purchase/Purchase_Request_Modification',PurchaseRequestController.PurchaseRequest_Modification);
   app.post('/API/Purchase/Purchase_Request_Cancel',PurchaseRequestController.PurchaseRequest_Cancel);
   app.post('/API/Purchase/Purchase_Request_Reject',PurchaseRequestController.PurchaseRequest_Reject);
   app.post('/API/Purchase/Purchase_Request_Cancel_Approval',PurchaseRequestController.PurchaseRequest_CancelApproval);
   // Purchase Quote
   app.post('/API/Purchase/Purchase_Quote_Number_AsyncValidators',PurchaseQuoteController.QuoteNumber_AsyncValidators);
   app.post('/API/Purchase/Purchase_Order_Number_AsyncValidators',PurchaseQuoteController.OrderNumber_AsyncValidators);
   app.post('/API/Purchase/Purchase_Quote_Create',PurchaseQuoteController.PurchaseQuote_Create);
   app.post('/API/Purchase/Purchase_Quote_List',PurchaseQuoteController.PurchaseQuote_List);
   app.post('/API/Purchase/Purchase_Quote_View',PurchaseQuoteController.PurchaseQuote_View);
   app.post('/API/Purchase/Purchase_Quote_Edit',PurchaseQuoteController.PurchaseQuote_Edit);
   app.post('/API/Purchase/Purchase_Quote_Confirm_Order',PurchaseQuoteController.PurchaseQuote_ConfirmOrder);
   app.post('/API/Purchase/Purchase_Quote_Order_List',PurchaseQuoteController.PurchaseQuote_OrderList);
   app.post('/API/Purchase/Purchase_Quote_Order_CreateToReceive',PurchaseQuoteController.PurchaseQuote_Order_CreateToReceive);
}