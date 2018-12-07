var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Inventory Configuration
var InventoryConfigSchema = mongoose.Schema({
      Multiple_Warehouse: { type: String, required: true },
      Sales_Update_Stock_by: { type: String, required: true },
      Sales_Create_Back_Order: { type: String, required: true },
      Purchase_Update_Stock_by: { type: String, required: true },
      Purchase_Create_Back_Order: { type: String, required: true },
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarInventoryConfigSchema = mongoose.model('InventoryConfig', InventoryConfigSchema, 'Inventory_Configuration_List');

// Crm Configuration
var CrmConfigurationSchema = mongoose.Schema({
   Add_Name_in_Quote: { type: String, required: true },
   Tax: { type: String, required: true },
   Discount: { type: String, required: true },
   Discount_Value: { type: String, required: true },
   Quote_Ref_Number: { type: String, required: true },
   Quote_Ref_Number_Prefix: { type: String },
   Quote_Ref_Number_Suffix: { type: String },
   Quote_Ref_Number_Starting: { type: Number },
   Quote_Ref_Number_Based: { type: String },
   Quote_Ref_Number_Custom_Date: { type: Number },
   Quote_Ref_Number_Custom_Month: { type: String },
   Invoice_Ref_Number: { type: String, required: true },
   Invoice_Ref_Number_Prefix: { type: String },
   Invoice_Ref_Number_Suffix: { type: String },
   Invoice_Ref_Number_Starting: { type: Number },
   Invoice_Ref_Number_Based: { type: String },
   Invoice_Ref_Number_Custom_Date: { type: Number },
   Invoice_Ref_Number_Custom_Month: { type: String },
   Customer: { type: Boolean, required: true },
   Sale_Ref_Number: { type: String, required: true },
   Sale_Ref_Number_Prefix: { type: String },
   Sale_Ref_Number_Suffix: { type: String },
   Sale_Ref_Number_Starting: { type: Number },
   Sale_Ref_Number_Based: { type: String },
   Sale_Ref_Number_Custom_Date: { type: Number },
   Sale_Ref_Number_Custom_Month: { type: String },
   AMC_Invoice: { type: String, required: true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarCrmConfigurationSchema = mongoose.model('CrmConfig', CrmConfigurationSchema, 'Crm_Configuration_List');

// Purchase Configuration
var PurchaseConfigurationSchema = mongoose.Schema({
   Purchase_Quotation: { type: String, required: true },
   Purchase_Quotation_Prefix: { type: String },
   Purchase_Quotation_Suffix: { type: String },
   Purchase_Quotation_Starting: { type: Number },
   Purchase_Quotation_Based: { type: String },
   Purchase_Quotation_Custom_Date: { type: Number },
   Purchase_Quotation_Custom_Month: { type: String },
   Purchase_Order: { type: String, required: true },
   Purchase_Order_Prefix: { type: String },
   Purchase_Order_Suffix: { type: String },
   Purchase_Order_Starting: { type: Number },
   Purchase_Order_Based: { type: String },
   Purchase_Order_Custom_Date: { type: Number },
   Purchase_Order_Custom_Month: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarPurchaseConfigurationSchema = mongoose.model('PurchaseConfig', PurchaseConfigurationSchema, 'Purchase_Configuration_List');

// Accounts Configuration
var AccountsConfigurationSchema = mongoose.Schema({
   Date: { type: Number, required: true },
   Month: { type: String, required: true }, 
   Currency: { type: String, required: true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarAccountsConfigurationSchema = mongoose.model('AccountsConfig', AccountsConfigurationSchema, 'Accounts_Configuration_List' );

// Product Configuration
var ProductConfigSchema = mongoose.Schema({
   Product_Variants: { type: String, required: true },
   Bar_Code: { type: String, required: true },
   Item_Code: { type: String, required: true },
   HSN_Code: { type: String, required: true },
   Price_List: { type: String, required: true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarProductConfigSchema = mongoose.model('ProductConfig', ProductConfigSchema, 'Product_Configuration_List');

// Hr Configuration
var HrConfigurationSchema = mongoose.Schema({
   Employee: { type: String, required: true },
   Employee_Prefix: { type: String },
   Employee_Suffix: { type: String },
   Employee_Starting: { type: Number },
   Employee_Based: { type: String },
   Employee_Custom_Date: { type: Number},
   Employee_Custom_Month: {type: String },
   Code: { type: String, required: true },
   Code_Prefix: { type: String },
   Code_Suffix: { type: String },
   Code_Starting: { type: Number },
   Code_Based: { type: String },
   Code_Custom_Date: { type: Number },
   Code_Custom_Month: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarHrConfigurationSchema = mongoose.model('HrConfig', HrConfigurationSchema, 'Hr_Configuration_List');

module.exports = {
   InventoryConfigSchema : VarInventoryConfigSchema,
   ProductConfigSchema : VarProductConfigSchema,
   AccountsConfigurationSchema: VarAccountsConfigurationSchema,
   CrmConfigurationSchema :VarCrmConfigurationSchema,
   PurchaseConfigurationSchema: VarPurchaseConfigurationSchema,
   HrConfigurationSchema: VarHrConfigurationSchema
}