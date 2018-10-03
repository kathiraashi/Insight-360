var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Registration Type Schema
   var RegistrationTypeSchema = mongoose.Schema({
      Registration_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarRegistrationType = mongoose.model('RegistrationType', RegistrationTypeSchema, 'Company_Registration_Type');

   
// Registration Info Schema
var RegistrationInfoSchema = mongoose.Schema({
    Registration_Type: { type : Schema.Types.ObjectId , ref : 'RegistrationType', required : true},
    Incorporate_Date: { type : String , required : true},
    Number: { type : String , required : true},
    Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
    Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps: true }
 );
 var VarRegistrationInfo = mongoose.model('RegistrationInfo', RegistrationInfoSchema, 'Company_Registration_Info');

 // Departments Schema
 var DepartmentsSchema = mongoose.Schema({
  Department_Name: { type : String , required : true},
  Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
  Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Active_Status: { type : Boolean , required : true},
  If_Deleted: { type : Boolean , required : true }
  },
  { timestamps: true }
);
var VarDepartments= mongoose.model('Departments', DepartmentsSchema, 'Company_Departments');

// PFinfo Schema
var PfinfoSchema = mongoose.Schema({
  Pf_No: { type : String , required : true},
  Registration_Date: { type : String , required : true},
  Signatory_Name: { type : String , required : true},
  Signatory_Designation: { type : String , required : true},
  Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
  Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Active_Status: { type : Boolean , required : true},
  If_Deleted: { type : Boolean , required : true }
  },
  { timestamps: true }
);
var VarPfInfo= mongoose.model('PfInfo', PfinfoSchema, 'Company_PfInfo');

// Esiinfo Schema
var EsiinfoSchema = mongoose.Schema({
  Esi_No: { type : String , required : true},
  Registration_Date: { type : String , required : true},
  Signatory_Name: { type : String , required : true},
  Signatory_Designation: { type : String , required : true},
  Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
  Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Active_Status: { type : Boolean , required : true},
  If_Deleted: { type : Boolean , required : true }
  },
  { timestamps: true }
);
var VarEsiInfo= mongoose.model('Esiinfo', EsiinfoSchema, 'Company_Esiinfo');

// Ptinfo Schema
var PtinfoSchema = mongoose.Schema({
  Pt_No: { type : String , required : true},
  Registration_Date: { type : String , required : true},
  Signatory_Name: { type : String , required : true},
  Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
  Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Active_Status: { type : Boolean , required : true},
  If_Deleted: { type : Boolean , required : true }
  },
  { timestamps: true }
);
var VarPtInfo= mongoose.model('Ptinfo', PtinfoSchema, 'Company_Ptinfo');

// Itinfo Schema
var ItinfoSchema = mongoose.Schema({
  Pan_No: { type : String , required : true},
  Tan_No: { type : String , required : true},
  Tan_Circle_No: { type : String , required : true},
  TDS_Details: { type : String },
  Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
  Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
  Active_Status: { type : Boolean , required : true},
  If_Deleted: { type : Boolean , required : true }
  },
  { timestamps: true }
);
var VarItInfo= mongoose.model('Itinfo', ItinfoSchema, 'Company_Itinfo');

// Branch Schema
   var BranchSchema = mongoose.Schema({
   Branch_Name: { type : String , required : true},
   Branch_Head: { type : String , required : true},
   Departments: { type : Schema.Types.ObjectId , ref : 'Departments', required : true},
   AllAddress: { Street: { type : String },
                        Area: { type : String },
                        ZipCode: { type : String },
                        Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                    Country_Name: { type : String } },
                        State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                 State_Name: { type : String } },
                        City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
   );
   var VarBranch = mongoose.model('Branches', BranchSchema, 'Company_Branch');


   // Contact Info Schema
   var ContactInfoSchema = mongoose.Schema({
      Contact_Person_Name: { type : String , required : true},
      Branches: { type : Schema.Types.ObjectId , ref : 'Branches', required : true},
      Departments: { type : Schema.Types.ObjectId , ref : 'Departments', required : true},
      Phone: { type : String , required : true},
      Email: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
      );
      var VarContactInfo = mongoose.model('ContactInfo', ContactInfoSchema, 'Company_Contact_Info');
   


   module.exports = {
      RegistrationTypeSchema : VarRegistrationType,
      RegistrationInfoSchema : VarRegistrationInfo,
      DepartmentsSchema : VarDepartments,
      PfinfoSchema : VarPfInfo,
      EsiinfoSchema : VarEsiInfo,
      PtinfoSchema : VarPtInfo,
      ItinfoSchema : VarItInfo,
      BranchSchema : VarBranch,
      ContactInfoSchema : VarContactInfo
   }