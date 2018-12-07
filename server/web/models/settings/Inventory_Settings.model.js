var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Ware House Schema
var WareHouseSchema = mongoose.Schema({
      Ware_House_Name: { type : String , required : true},
      Ware_House_Code: { type : String , required : true},
      Address: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true },
      Default_WareHouse: { type: Boolean, required: true }
   },
   { timestamps: true }
);
var VarWareHouse = mongoose.model('WareHouse', WareHouseSchema, 'Inventory_WareHouse');


 module.exports = {
   WareHouseSchema : VarWareHouse
 }