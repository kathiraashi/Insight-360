var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Vendor Schema 
var VendorSchema = mongoose.Schema({
   Vendor_Name: { type: String , required: true },
   Phone_Number: { type: String, required: true, unique: true },
   Email: { type: String },
   Website: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   Address: { Street: { type : String },
                     Area: { type : String },
                     ZipCode: { type : String },
                     Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                 Country_Name: { type : String } },
                     State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                              State_Name: { type : String } },
                     City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                              City_Name: { type : String } } },
   SameAddresses: { type : Boolean },
   If_Subcontract: { type: Boolean, required: true },
   SubContractAddress: {  Street: { type : String },
                        Area: { type : String },
                        ZipCode: { type : String },
                        Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                    Country_Name: { type : String } },
                        State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                 State_Name: { type : String } },
                        City: { _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
});
var VarVendorSchema = mongoose.model('Vendor', VendorSchema, 'Purchase_Vendor_List');

// Vendor Contact
var VendorContactSchema = mongoose.Schema({
   Title: { type: String, required: true },
   Name: { type: String, require: true, unique: true },
   Email: { type: String },
   Mobile: { type: String, required: true, unique: true },
   Job_Position: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Vendor_Id:  { type : Schema.Types.ObjectId, ref: 'Vendor' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarVendorContactSchema = mongoose.model('VendorContact', VendorContactSchema, 'Purchase_Vendor_Contact_List');

// Purchase request
var PurchaseRequestSchema = mongoose.Schema({
   Requested_Number: { type: String, required: true},
   Requested_Date: { type: Date, required: true },
   Request_Status: { type: String },
   Status: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarPurchaseRequestSchema = mongoose.model('PurchaseRequest', PurchaseRequestSchema, 'Purchase_Request_List');

// Purchase Request Product
var PurchaseRequest_ProductSchema = mongoose.Schema({
   PurchaseRequest_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest', required: true },
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   Description: { type: String },
   Required_Quantity: { type: String, required: true },
   Approved_Quantity: { type: String },
   Required_Date: [{ type: Date}],
   },
   { timestamps: true }
);
var VarPurchaseRequest_ProductSchema = mongoose.model('PurchaseRequest_Product', PurchaseRequest_ProductSchema, 'Purchase_Request_Product_List');

// Purchase Request Quote
var Purchase_QuoteSchema = mongoose.Schema({
   Vendor_Name: { type: Schema.Types.ObjectId, ref: 'Vendor'},
   Contact: { type: Schema.Types.ObjectId, ref: 'VendorContact'},
   Quote_Ref_Number: { type: String, required: true},
   Order_Ref_Number: { type: String },
   Auto_Quote_Number_Length: { type: Number },
   Auto_Order_Number_Length: {type: Number},
   Purchase_Request_Number: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest'},
   Quote_Date: { type: Date, required: true },
   Valid_Date: { type: Date },
   Subject: { type: String },
   Sub_Total: { type: String, required: true },
   Global_Product_Tax: [{ type: Schema.Types.ObjectId, ref: 'Taxes'}],
   Overall_Global_Tax: {type: String},
   Tax: { type: String, required: true },
   Total: { type: String, required: true },
   Quote_Status: { type: String },
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
var VarPurchase_QuoteSchema = mongoose.model('PurchaseQuote', Purchase_QuoteSchema, 'Purchase_Quote_List')

var Purchase_Quote_ProductSchema = mongoose.Schema({
   Purchase_Quote_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseQuote', required: true},
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   Description: { type: String},
   Price: { type: String, required: true},
   Quantity: { type: String, required: true },
   Product_Tax: [{ type: Schema.Types.ObjectId, ref: 'Taxes'}],
   Taxable_Amount: { type: String },
   Overall_Inline_Tax: { type: String },
   Tax_Amount: { type: String },
   Product_Total:{ type: String },
   },
   { timestamps: true }
);
var VarPurchase_Quote_ProductSchema = mongoose.model('PurchaseQuote_Product', Purchase_Quote_ProductSchema, 'Purchase_Quote_Product_List')

module.exports = {
   VendorSchema : VarVendorSchema,
   VendorContactSchema: VarVendorContactSchema,
   PurchaseRequestSchema: VarPurchaseRequestSchema,
   PurchaseRequest_ProductSchema: VarPurchaseRequest_ProductSchema,
   Purchase_QuoteSchema: VarPurchase_QuoteSchema,
   Purchase_Quote_ProductSchema: VarPurchase_Quote_ProductSchema
}