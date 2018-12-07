var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Uint of measure
var UOMSchema = mongoose.Schema({
   UOM: { type: String, required: true},
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required: true},
   Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   Active_Status: { type : Boolean , required : true },
   If_Deleted: { type : Boolean , required : true },
   },
   { timestamps: true }
);
var VarUOMSchema = mongoose.model('UOM', UOMSchema, 'Product_UOM_List')

module.exports = {
   UOMSchema : VarUOMSchema
}