module.exports = function(app) {
   var InventoryStockDetailsController = require('./../../controller/Inventory/StockDetails.controller.js');
   var InventoryDeliverOrderController = require('./../../controller/Inventory/DeliveryOrder.controller.js');
   var InventoryToReceiveController = require('./../../controller/Inventory/ToReceive.controller.js');

   // Stock Details
   app.post('/API/Inventory/Stock_Details_List', InventoryStockDetailsController.InventoryStockDetails_List);
   app.post('/API/Inventory/Stock_Details_View', InventoryStockDetailsController.InventoryStockDetails_View);
   app.post('/API/Inventory/Stock_Details_Add', InventoryStockDetailsController.InventoryStockDetails_Add);
   app.post('/API/Inventory/Stock_Details_Remove', InventoryStockDetailsController.InventoryStockDetails_Remove);
   app.post('/API/Inventory/Stock_Details_Availability', InventoryStockDetailsController.InventoryStockDetails_Availability);
   // Delivery Order
   app.post('/API/Inventory/Deliver_Order_List', InventoryDeliverOrderController.DeliverOrder_List);
   app.post('/API/Inventory/Deliver_Order_Convert', InventoryDeliverOrderController.DeliverOrder_Convert);
   app.post('/API/Inventory/Deliver_Order_View', InventoryDeliverOrderController.DeliverOrder_View);
   app.post('/API/Inventory/Deliver_Order_Update', InventoryDeliverOrderController.DeliverOrder_Update);
   app.post('/API/Inventory/Deliver_Order_Create_BackOrder', InventoryDeliverOrderController.DeliverOrder_CreateBackOrder);
   app.post('/API/Inventory/Deliver_Order_Stock_Remove', InventoryDeliverOrderController.DeliverOrderStockDetails_Remove);

   // To Receive
   app.post('/API/Inventory/To_Receive_List', InventoryToReceiveController.ToReceive_List);
   app.post('/API/Inventory/To_Receive_Convert', InventoryToReceiveController.ToReceive_Convert);
   app.post('/API/Inventory/To_Receive_View', InventoryToReceiveController.ToReceive_View);
   app.post('/API/Inventory/To_Receive_Update', InventoryToReceiveController.ToReceive_Update);
   app.post('/API/Inventory/To_Receive_Create_BackOrder', InventoryToReceiveController.ToReceive_CreateBackOrder);
   app.post('/API/Inventory/To_Receive_Stock_Add', InventoryToReceiveController.ToReceiveStockDetails_Add);

}