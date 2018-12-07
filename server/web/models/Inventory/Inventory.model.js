var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ************************* Inventory ***************************************
// Stock Details
var Inventory_StockDetailsSchema = mongoose.Schema({
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   WareHouse_Id: { type: Schema.Types.ObjectId, ref: 'WareHouse', required: true},
   End_Quantity: { type: Number, required: true },
   Reference_Id: { type: Schema.Types.ObjectId },
   Reference_Key: { type: String, required: true },
   In_or_Out: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarInventory_StockDetailsSchema = mongoose.model('StockDetails', Inventory_StockDetailsSchema, 'Inventory_Stock_Details_List');

var Inventory_StockDetails_History_Schema = mongoose.Schema({
   History_StockDetails_Id: { type: Schema.Types.ObjectId, ref: 'StockDetails'},
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   WareHouse_Id: { type: Schema.Types.ObjectId, ref: 'WareHouse', required: true},
   Start_Quantity: { type: Number, required: true },
   Processed_Quantity: { type: Number, required: true },
   End_Quantity: { type: Number, required: true },
   Reference_Id: { type: Schema.Types.ObjectId },
   Reference_Key: { type: String, required: true },
   In_or_Out: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarInventory_StockDetails_History_Schema = mongoose.model('StockDetails_History', Inventory_StockDetails_History_Schema, 'Inventory_Stock_Details_History_List');

// Inventory To Receive
var Inventory_ToReceiveSchema = mongoose.Schema({
   Reference_Model: { type: String },
   Reference_Id: { type: Schema.Types.ObjectId, refPath: 'Reference_Model'},
   Purchase_Order_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseQuote'},
   ToReceive_Ref_Number: { type: String, required: true },
   ToReceive_Number_Length: { type: Number },
   Vendor_Name: { type: Schema.Types.ObjectId, ref: 'Vendor'},
   Contact: { type: Schema.Types.ObjectId, ref: 'VendorContact'},
   Quote_Ref_Number: { type: String, required: true},
   Order_Ref_Number: { type: String },
   Purchase_Request_Number: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest'},
   Quote_Date: { type: Date, required: true },
   Valid_Date: { type: Date },
   Subject: { type: String },
   ToReceive_Status: { type: String },
   Status: { type: String },
   If_ToReceive: { type: Boolean },
   Company_Id: { type : Schema.Types.ObjectId, ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarInventory_ToReceiveSchema = mongoose.model('Inventory_ToReceive', Inventory_ToReceiveSchema, 'Inventory_ToReceive_List')

var Inventory_ToReceive_ProductSchema = mongoose.Schema({
   Inventory_ToReceive_Id: { type: Schema.Types.ObjectId, ref: 'Inventory_ToReceive', required: true},
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   Description: { type: String },
   Quantity: { type: String, required: true },
   Approved_Quantity: { type: String, required: true},
   },
   { timestamps: true }
);
var VarInventory_ToReceive_ProductSchema = mongoose.model('Inventory_ToReceive_Product', Inventory_ToReceive_ProductSchema, 'Inventory_ToReceive_Product_List')

var Inventory_DeliverOrderSchema = mongoose.Schema({
   Reference_Model: { type: String },
   Reference_Id: { type: Schema.Types.ObjectId, refPath: 'Reference_Model'},
   SaleOrder_Id: { type: Schema.Types.ObjectId, ref: 'CrmSaleOrder' },
   Order_Ref_Number: { type: String },
   Company_Name: { type: String },
   DeliverOrder_Ref_Number: { type: String },
   DeliverOrder_Number_Length: { type: Number },
   DeliverOrder_Status: { type: String },
   Status: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarInventory_DeliverOrderSchema = mongoose.model('Inventory_Deliver', Inventory_DeliverOrderSchema, 'Inventory_Deliver_List')

var Inventory_Deliver_ProductSchema = mongoose.Schema({
   Inventory_Deliver_Id: { type: Schema.Types.ObjectId, ref: 'Inventory_Deliver', required: true},
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   Description: { type: String},
   Quantity: { type: String, required: true },
   Approved_Quantity: { type: String, required: true},
   },
   { timestamps: true }
);
var VarInventory_Deliver_ProductSchema = mongoose.model('Inventory_Deliver_Product', Inventory_Deliver_ProductSchema, 'Inventory_Deliver_Product_List')

module.exports = {
   Inventory_StockDetailsSchema : VarInventory_StockDetailsSchema,
   Inventory_StockDetails_History_Schema : VarInventory_StockDetails_History_Schema,
   Inventory_ToReceiveSchema: VarInventory_ToReceiveSchema,
   Inventory_ToReceive_ProductSchema: VarInventory_ToReceive_ProductSchema,
   Inventory_DeliverOrderSchema: VarInventory_DeliverOrderSchema,
   Inventory_Deliver_ProductSchema: VarInventory_Deliver_ProductSchema
}