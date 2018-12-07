var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Product Group
var ProductGroupsSchema = mongoose.Schema({
   Product_Name: { type : String , required : true, unique: true},
   Can_Be_Sold: { type: Boolean, required: true},
   Can_Be_Purchased: { type: Boolean, required: true},
   Item_Code: { type : String},
   HSN_Code: { type : String},
   Price: { type : String, required: true},
   Product_Type: { type : String, required: true },
   UOM: { type : Schema.Types.ObjectId, ref: 'UOM' },
   Description: { type : String },
   Variants: [{
      Attribute: { type : String },
      Attribute_Values: { type : Array },
   }],
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required: true},
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Create_At: { type : Date},
   Update_At: { type : Date},
   Active_Status: { type : Boolean , required : true },
   If_Deleted: { type : Boolean , required : true },
},
{ timestamps: true }
);
var VarProductGroups = mongoose.model('ProductGroups', ProductGroupsSchema, 'Product_Groups');

// Product with variant
var ProductSchema = mongoose.Schema({
   ProductGroup_Id: { type : Schema.Types.ObjectId, ref: 'ProductGroups' },
   Can_Be_Sold: { type: Boolean, required: true},
   Can_Be_Purchased: { type: Boolean, required: true},
   Product_Name: { type : String , required : true},
   Product_Name_withAttribute: { type : String , required : true},
   Price: { type : String, required: true},
   Product_Type: { type : String, required: true },
   Item_Code: { type : String },
   HSN_Code: { type : String },
   Bar_Code: { type : String },
   UOM: { type : Schema.Types.ObjectId, ref: 'UOM' },
   Description: { type : String },
   Variants: [{
      Attribute: { type : String },
      Attribute_Value: { type : String}
   }],
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required: true},
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Create_At: { type : Date},
   Update_At: { type : Date},
   Active_Status: { type : Boolean , required : true },
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }

);

var VarProductSchema = mongoose.model('Product', ProductSchema, 'Product_List');

module.exports = {
   ProductGroupsSchema : VarProductGroups,
   ProductSchema : VarProductSchema
};
