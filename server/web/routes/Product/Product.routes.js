module.exports = function(app) {
   var Controller = require('./../../controller/Product/Product.controller.js');

   // Product routes
   app.post('/API/Product/Product_Name_AsyncValidators', Controller.Product_Name_AsyncValidators);
   app.post('/API/Product/Product_Name_withAttribute_AsyncValidators', Controller.Product_Name_withAttribute_AsyncValidators);
   app.post('/API/Product/Product_Create', Controller.Product_Create);
   app.post('/API/Product/Product_List', Controller.Product_List);
   app.post('/API/Product/Product_List_Sold', Controller.Product_List_Sold);
   app.post('/API/Product/Product_List_Purchase', Controller.Product_List_Purchase);
   app.post('/API/Product/Product_View', Controller.Product_View);
   app.post('/API/Product/Product_Update', Controller.Product_Update);
   app.post('/API/Product/Product_Simple_List', Controller.Product_Simple_List);
}