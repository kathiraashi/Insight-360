var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Crm Customer schema
var CrmCustomerSchema = mongoose.Schema({
   Company_Name: { type: String , required: true },
   Phone_Number: { type: String, required: true, unique: true },
   Email: { type: String },
   Website: { type: String },
   Industry_Type: { type: Schema.Types.ObjectId, ref: 'IndustryType', required: true },
   No_Of_Employee: { type: Number, required: true },
   Account_Type: { type: Schema.Types.ObjectId, ref: 'AccountType', required: true },
   Ownership_Type: { type: Schema.Types.ObjectId, ref: 'OwnershipType', required: true },
   Notes: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   BillingAddress: { Street: { type : String },
                     Area: { type : String },
                     ZipCode: { type : String },
                     Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                 Country_Name: { type : String } },
                     State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                              State_Name: { type : String } },
                     City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                              City_Name: { type : String } } },
   SameAddresses: { type : Boolean },
   ShopFloorAddress: {  Street: { type : String },
                        Area: { type : String },
                        ZipCode: { type : String },
                        Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                    Country_Name: { type : String } },
                        State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                 State_Name: { type : String } },
                        City: { _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
});

var VarCrmCustomerSchema = mongoose.model('CrmCustomer', CrmCustomerSchema, 'Crm_Customer_List');

// Crm Contact
var CrmContactSchema = mongoose.Schema({
   Title: { type: String, required: true },
   Name: { type: String, require: true, unique: true },
   Contact_Role: { type: Schema.Types.ObjectId, ref: 'ContactRole', required: true },
   Email: { type: String },
   Mobile: { type: String, required: true, unique: true },
   Job_Position: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   crm_customer_id:  { type : Schema.Types.ObjectId, ref: 'CrmCustomer' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarCrmContactSchema = mongoose.model('CrmContact', CrmContactSchema, 'Crm_Contact_List');

// Crm Activities
var CrmActivitiesSchema = mongoose.Schema({
   Date: { type: Date, required: true },
   Subject: { type: String, required: true },
   Contact_Person: { type: Schema.Types.ObjectId, ref: 'CrmContact', required: true},
   Activity_Type: { type: Schema.Types.ObjectId, ref: 'ActivityType', required: true },
   Status: { type: Schema.Types.ObjectId, ref: 'ActivityStatus', required: true },
   Priority: { type: String },
   Description: { type: String, required: true },
   crm_customer_id:  { type : Schema.Types.ObjectId, ref: 'CrmCustomer' , required : true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarCrmActivitiesSchema = mongoose.model('CrmActivities', CrmActivitiesSchema, 'Crm_Activities_List');

// Crm Reminders
var VarCrmRemindersSchema = mongoose.Schema({
   Date: { type: Date, required: true },
   Subject: { type: String, required: true },
   Contact_Person: { type: Schema.Types.ObjectId, ref: 'CrmContact', required: true},
   Activity_Type: { type: Schema.Types.ObjectId, ref: 'ActivityType', required: true },
   Status: { type: Schema.Types.ObjectId, ref: 'ActivityStatus', required: true },
   Priority: { type: String },
   Description: { type: String, required: true },
   crm_customer_id:  { type : Schema.Types.ObjectId, ref: 'CrmCustomer' , required : true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarCrmRemindersSchema = mongoose.model('CrmReminders', VarCrmRemindersSchema, 'Crm_Reminders_List');


// Crm Others
var CrmOthersSchema = mongoose.Schema({
   Registration_Type: { type: Schema.Types.ObjectId, ref: 'RegistrationType', required: true },
   Number: { type: String, required: true },
   crm_customer_id:  { type : Schema.Types.ObjectId, ref: 'CrmCustomer' , required : true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);

var VarCrmOthersSchema = mongoose.model('CrmOthers', CrmOthersSchema, 'Crm_Others_List');

// Crm Quote
var CrmQuoteSchema = mongoose.Schema({
   Company_Name: { type: Schema.Types.ObjectId, ref: 'CrmCustomer', required: true},
   Contact_Person: { type: Schema.Types.ObjectId, ref: 'CrmContact', required: true},
   Previous_QuoteOrRevise_Id: [{ type: Schema.Types.ObjectId, ref: 'CrmQuote'}],
   Quote_Date: { type: Date, required: true },
   Valid_Date: { type: Date, required: true },
   Quote_Ref_Number: { type: String, required: true },
   Employee_Name: { type: String, required: true },
   Sub_Total_WithOut_GlobalDiscount: { type: String },
   Sub_Total: { type: String, required: true },
   Global_Discount: { type: String},
   Global_Product_Tax: [{ type: Schema.Types.ObjectId, ref: 'Taxes'}],
   Overall_Global_Tax: {type: String},
   Tax: { type: String, required: true },
   Total: { type: String, required: true },
   Auto_Quote_Number_Length: { type: Number },
   Quote_Config: { type: Schema.Types.ObjectId, ref: 'CrmConfig', required: true},
   Quote_Status: { type: String },
   Status: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   If_Revised: { type: Boolean, required: true },
   If_Nested: { type: Boolean, required: true }
   },
   { timestamps: true }
);
var VarCrmQuoteSchema = mongoose.model('CrmQuote', CrmQuoteSchema, 'Crm_Quote_List');

var CrmQuote_ProductSchema = mongoose.Schema({
   Crm_Quote_Id: { type: Schema.Types.ObjectId, ref: 'CrmQuote', required: true },
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   Price: { type: String, required: true},
   Quantity: { type: String, required: true },
   Product_Tax: [{ type: Schema.Types.ObjectId, ref: 'Taxes'}],
   Taxable_Amount: { type: String },
   Product_Discount: { type: String },
   Overall_Inline_Tax: { type: String },
   Tax_Amount: { type: String },
   Product_Total:{ type: String },
   },
   { timestamps: true }
);
var VarCrmQuote_ProductSchema = mongoose.model('CrmQuote_Product', CrmQuote_ProductSchema, 'Crm_Quote_Product_List')

var CrmSaleOrderSchema = mongoose.Schema({
   Date: { type: Date, required: true},
   PO_Number: { type: String},
   Order_ConfirmBy: { type: String },
   SaleOrder_Ref_Number: { type: String, required: true},
   Auto_SaleOrder_Number_Length: { type: Number },
   Quote_Id: { type: Schema.Types.ObjectId, ref: 'CrmQuote', require: true },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   If_DeliverOrder: { type : Boolean },
   SaleOrder_Status: { type: String, required: true },
   Status: { type: String, required: true},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarCrmSaleOrderSchema = mongoose.model('CrmSaleOrder', CrmSaleOrderSchema, 'Crm_SaleOrder_List')
module.exports = {
   CrmCustomerSchema : VarCrmCustomerSchema,
   CrmContactSchema: VarCrmContactSchema,
   CrmOthersSchema: VarCrmOthersSchema,
   CrmActivitiesSchema: VarCrmActivitiesSchema,
   CrmRemindersSchema: VarCrmRemindersSchema,
   CrmQuoteSchema: VarCrmQuoteSchema,
   CrmQuote_ProductSchema: VarCrmQuote_ProductSchema,
   CrmSaleOrderSchema: VarCrmSaleOrderSchema
}