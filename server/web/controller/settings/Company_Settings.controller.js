var CryptoJS = require("crypto-js");
var CompanySettingsModel = require('./../../models/settings/Company_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************************** Registration Type *****************************************************
   // -------------------------------------------------- Registration Type Async Validate -----------------------------------------------
   exports.RegistrationType_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Registration_Type || ReceivingData.Registration_Type === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.RegistrationTypeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Registration_Type': { $regex : new RegExp("^" + ReceivingData.Registration_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Registration Type Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Registration Type!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   
// Registration Type Create -----------------------------------------------
   exports.Registration_Type_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Registration_Type || ReceivingData.Registration_Type === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_RegistrationType = new CompanySettingsModel.RegistrationTypeSchema({
            Registration_Type: ReceivingData.Registration_Type, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_RegistrationType.save(function(err, result) { // Registration Type Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Registration Type!."});
            } else {
               CompanySettingsModel.RegistrationTypeSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Registration Type FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Registration Types!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };
// Registration Type List -----------------------------------------------
   exports.Registration_Type_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.RegistrationTypeSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Registration Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Types!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Registration Type Simple List -----------------------------------------------
   exports.Registration_Type_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type Id can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.RegistrationTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Registration_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Registration Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Types!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Registration Type Update -----------------------------------------------
   exports.Registration_Type_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Registration_Type_Id || ReceivingData.Registration_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type Id can not be empty" });
      }else if(!ReceivingData.Registration_Type || ReceivingData.Registration_Type === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.RegistrationTypeSchema.findOne({'_id': ReceivingData.Registration_Type_Id}, {}, {}, function(err, result) { // Registration Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Type!."});
            } else {
               if (result !== null) {
                  result.Registration_Type = ReceivingData.Registration_Type;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Registration Type Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Registration Type!."});
                     } else {
                        CompanySettingsModel.RegistrationTypeSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { // Registration Type FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Registration Types!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Registration Type Id can not be valid!" });
               }
            }
         });
      }
   };
// Registration Type Delete -----------------------------------------------
   exports.Registration_Type_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Registration_Type_Id || ReceivingData.Registration_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Registration Type Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.RegistrationTypeSchema.findOne({'_id': ReceivingData.Registration_Type_Id}, {}, {}, function(err, result) { // Registration Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Type!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Registration Type Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Registration Type!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Registration Type Id can not be valid!" });
               }
            }
         });
      }
   };


   

// Registration Info Create -----------------------------------------------
   exports.Registration_Info_Create = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Incorporate_Date || ReceivingData.Incorporate_Date === ''  ) {
        res.status(400).send({Status: false, Message: "Incorporate Date can not be empty" });
    } else if (!ReceivingData.Number || ReceivingData.Number === ''  ) {
        res.status(400).send({Status: false, Message: "Number can not be empty" });
   } else if ( !ReceivingData.Registration_Type || typeof ReceivingData.Registration_Type !== 'object' || Object.keys(ReceivingData.Registration_Type).length < 2) {
      res.status(400).send({Status: false, Message: "Registration Type can not be empty" });
    } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
       res.status(400).send({Status: false, Message: "Company Details can not be empty" });
    } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
    }else {
        if( ReceivingData.Registration_Type && typeof ReceivingData.Registration_Type === 'object' && Object.keys(ReceivingData.Registration_Type).length > 0){
            ReceivingData.Registration_Type = mongoose.Types.ObjectId(ReceivingData.Registration_Type._id)
        }
       var Create_RegistrationInfo = new CompanySettingsModel.RegistrationInfoSchema({
          Registration_Type: ReceivingData.Registration_Type, 
          Incorporate_Date: ReceivingData.Incorporate_Date, 
          Number: ReceivingData.Number, 
          Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
          Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
          Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
          Active_Status: ReceivingData.Active_Status || true,
          If_Deleted: false
       });
       Create_RegistrationInfo.save(function(err, result) { // Registration Info Save Query
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info Creation Query Error', 'Company_Settings.model.js');
             res.status(417).send({Status: false, Message: "Some error occurred while creating the Registration Info!."});
          } else {
             CompanySettingsModel.RegistrationInfoSchema
                .findOne({'_id': result._id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
                .populate({path : 'Registration_Type', select: ['Registration_Type']})
                .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                .exec(function(err_1, result_1) { // Registration Info FindOne Query
                if(err_1) {
                   ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info Find Query Error', 'Company_Settings.model.js', err_1);
                   res.status(417).send({status: false, Message: "Some error occurred while Find The Registration Info!."});
                } else {
                   var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                      ReturnData = ReturnData.toString();
                   res.status(200).send({Status: true, Response: ReturnData });
                }
             });
          }
       });
    }
 };

// Registration Info List -----------------------------------------------
 exports.Registration_Info_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
       res.status(400).send({Status: false, Message: "Company details can not be empty" });
    } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else {
       CompanySettingsModel.RegistrationInfoSchema
          .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
          .populate({path : 'Registration_Type', select: ['Registration_Type']})
          .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
          .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
          .exec(function(err, result) { // Registration Info FindOne Query
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info Find Query Error', 'Company_Settings.model.js', err);
             res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Info!."});
          } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
             ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Response: ReturnData });
          }
       });
    }
 };

// Registration Info Update -----------------------------------------------
 exports.Registration_Info_Update = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.RegistrationInfo_Id || ReceivingData.RegistrationInfo_Id === ''  ) {
      res.status(400).send({Status: false, Message: " Registration Info Details can not be empty" });
    } else if(!ReceivingData.Incorporate_Date || ReceivingData.Incorporate_Date === ''  ) {
      res.status(400).send({Status: false, Message: "Incorporate Date can not be empty" });
   } else if (!ReceivingData.Number || ReceivingData.Number === ''  ) {
      res.status(400).send({Status: false, Message: "Number can not be empty" });
   } else if ( !ReceivingData.Registration_Type || typeof ReceivingData.Registration_Type !== 'object' || Object.keys(ReceivingData.Registration_Type).length < 2) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
       res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
    }else {
         if( ReceivingData.Registration_Type && typeof ReceivingData.Registration_Type === 'object' && Object.keys(ReceivingData.Registration_Type).length > 0){
            ReceivingData.Registration_Type = mongoose.Types.ObjectId(ReceivingData.Registration_Type._id)
         }
       CompanySettingsModel.RegistrationInfoSchema.update( 
          {'_id': mongoose.Types.ObjectId(ReceivingData.RegistrationInfo_Id)}, 
          { $set: { 
                     Registration_Type: ReceivingData.Registration_Type, 
                     Incorporate_Date: ReceivingData.Incorporate_Date, 
                     Number: ReceivingData.Number,
                     Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Modified_By)
                  } 
         }).exec( function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info FindOne Query Error', 'Company_Settings.model.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Registration Info!."});
          } else {
               CompanySettingsModel.RegistrationInfoSchema
                  .findOne({'_id': ReceivingData.RegistrationInfo_Id})
                  .populate({path : 'Registration_Type', select: ['Registration_Type']})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_2, result_2) { // Registration Info FindOne Query
                  if(err_2) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Type Find Query Error', 'Company_Settings.model.js', err_2);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Registration Types!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
          }
       });
    }
 };

// Registration Info Delete -----------------------------------------------
 exports.Registration_Info_Delete = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.RegistrationInfo_Id || ReceivingData.RegistrationInfo_Id === '' ) {
       res.status(400).send({Status: false, Message: "Registration Info Id can not be empty" });
    } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
       res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
    }else {
       CompanySettingsModel.RegistrationInfoSchema.findOne({'_id': ReceivingData.RegistrationInfo_Id}, {}, {}, function(err, result) { // Registration Info FindOne Query
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info FindOne Query Error', 'Company_Settings.model.js', err);
             res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Registration Info!."});
          } else {
             if (result !== null) {
                result.If_Deleted = true;
                result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                result.save(function(err_1, result_1) { // Registration Info Delete Query
                   if(err_1) {
                      ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Registration Info Delete Query Error', 'Company_Settings.model.js');
                      res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Registration Info!."});
                   } else {
                      res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                   }
                });
             } else {
                res.status(400).send({Status: false, Message: "Registration Type Id can not be valid!" });
             }
          }
       });
    }
 };

 // ************************************************** Departments *****************************************************
   // -------------------------------------------------- Departments Async Validate -----------------------------------------------
   exports.Departments_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Department_Name || ReceivingData.Department_Name === '' ) {
         res.status(400).send({Status: false, Message: "Department Name can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.DepartmentsSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Department_Name': { $regex : new RegExp("^" + ReceivingData.Department_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Departments Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Departments!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   

// Departments Create -----------------------------------------------
   exports.Departments_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Department_Name || ReceivingData.Department_Name === '' ) {
         res.status(400).send({Status: false, Message: "Department Name can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_Departments = new CompanySettingsModel.DepartmentsSchema({
            Department_Name: ReceivingData.Department_Name, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Departments.save(function(err, result) { // Departments Type Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Departments!."});
            } else {
               CompanySettingsModel.DepartmentsSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Departments FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Departments!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Departments List -----------------------------------------------
   exports.Departments_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.DepartmentsSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Departments FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Departments Simple List -----------------------------------------------
   exports.Departments_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.DepartmentsSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Department_Name : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Departments FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Departments Update -----------------------------------------------
   exports.Departments_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Departments_Id || ReceivingData.Departments_Id === '' ) {
         res.status(400).send({Status: false, Message: "Departments Id can not be empty" });
      }else if(!ReceivingData.Department_Name || ReceivingData.Department_Name === '' ) {
         res.status(400).send({Status: false, Message: "Department Name can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.DepartmentsSchema.findOne({'_id': ReceivingData.Departments_Id}, {}, {}, function(err, result) { // Departments FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               if (result !== null) {
                  result.Department_Name = ReceivingData.Department_Name;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Departments Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Departments!."});
                     } else {
                        CompanySettingsModel.DepartmentsSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { // Departments FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Departments!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Departments  Id can not be valid!" });
               }
            }
         });
      }
   };

// Departments Delete -----------------------------------------------
   exports.Departments_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Departments_Id || ReceivingData.Departments_Id === '' ) {
         res.status(400).send({Status: false, Message: "Departments Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.DepartmentsSchema.findOne({'_id': ReceivingData.Departments_Id}, {}, {}, function(err, result) { // Departments FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Departments Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Departments Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Departments!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Departments Id can not be valid!" });
               }
            }
         });
      }
   };

// ************************************************** PF Info *****************************************************
   // -------------------------------------------------- Pf Info Async Validate -----------------------------------------------
   exports.PfInfo_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pf_No || ReceivingData.Pf_No === '' ) {
         res.status(400).send({Status: false, Message: "Pf No can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PfinfoSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Pf_No': { $regex : new RegExp("^" + ReceivingData.Pf_No + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'PF Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find PF Info!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   

// Pf Info Create -----------------------------------------------
   exports.PfInfo_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pf_No || ReceivingData.Pf_No === '' ) {
         res.status(400).send({Status: false, Message: "Pf No can not be empty" });
      } else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if(!ReceivingData.Signatory_Designation || ReceivingData.Signatory_Designation === '' ) {
            res.status(400).send({Status: false, Message: "Signatory Designation can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_PfInfo = new CompanySettingsModel.PfinfoSchema({
            Pf_No: ReceivingData.Pf_No, 
            Registration_Date: ReceivingData.Registration_Date, 
            Signatory_Name: ReceivingData.Signatory_Name, 
            Signatory_Designation: ReceivingData.Signatory_Designation, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_PfInfo.save(function(err, result) { // Pf Info Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Pf Info!."});
            } else {
               CompanySettingsModel.PfinfoSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Pf Info FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Pf Info!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Pf Info List -----------------------------------------------
   exports.PfInfo_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PfinfoSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Pf Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pf Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Pf Info Simple List -----------------------------------------------
   exports.PfInfo_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PfinfoSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Pf_No : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Pf Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pf Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Pf Info Update -----------------------------------------------
   exports.pfInfo_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pf_Info_Id || ReceivingData.Pf_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Pf Info Id can not be empty" });
      }else if(!ReceivingData.Pf_No || ReceivingData.Pf_No === '' ) {
         res.status(400).send({Status: false, Message: "Pf No can not be empty" });
      }  else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if(!ReceivingData.Signatory_Designation || ReceivingData.Signatory_Designation === '' ) {
            res.status(400).send({Status: false, Message: "Signatory Designation can not be empty" });
      }else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.PfinfoSchema.findOne({'_id': ReceivingData.Pf_Info_Id}, {}, {}, function(err, result) { // Pf Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pf Info !."});
            } else {
               if (result !== null) {
                  result.Pf_No = ReceivingData.Pf_No;
                  result.Registration_Date = ReceivingData.Registration_Date;
                  result.Signatory_Name = ReceivingData.Signatory_Name; 
                  result.Signatory_Designation = ReceivingData.Signatory_Designation;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Pf Info Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Pf Info!."});
                     } else {
                        CompanySettingsModel.PfinfoSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //Pf Info FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Pf Info!."});
                           } else { 
                           
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Pf Info Id can not be valid!" });
               }
            }
         });
      }
   };

// Pf Info Delete -----------------------------------------------
   exports.PfInfo_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pf_Info_Id || ReceivingData.Pf_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Pf Info Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.PfinfoSchema.findOne({'_id': ReceivingData.Pf_Info_Id}, {}, {}, function(err, result) { // Pf Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Pf Info!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Pf Info Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pf Info Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Pf Info!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Pf Info Id can not be valid!" });
               }
            }
         });
      }
   };

// ************************************************** Esi Info *****************************************************
   // -------------------------------------------------- Esi Info Async Validate -----------------------------------------------
   exports.EsiInfo_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Esi_No || ReceivingData.Esi_No === '' ) {
         res.status(400).send({Status: false, Message: "Esi No can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.EsiinfoSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Esi_No': { $regex : new RegExp("^" + ReceivingData.Esi_No + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Esi Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Esi Info!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   

// Esi Info Create -----------------------------------------------
   exports.EsiInfo_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Esi_No || ReceivingData.Esi_No === '' ) {
         res.status(400).send({Status: false, Message: "Esi No can not be empty" });
      } else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if(!ReceivingData.Signatory_Designation || ReceivingData.Signatory_Designation === '' ) {
            res.status(400).send({Status: false, Message: "Signatory Designation can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_EsiInfo = new CompanySettingsModel.EsiinfoSchema({
            Esi_No: ReceivingData.Esi_No, 
            Registration_Date: ReceivingData.Registration_Date, 
            Signatory_Name: ReceivingData.Signatory_Name, 
            Signatory_Designation: ReceivingData.Signatory_Designation, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_EsiInfo.save(function(err, result) { // Esi Info Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Esi Info!."});
            } else {
               CompanySettingsModel.EsiinfoSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Esi Info FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Esi Info!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Esi Info List -----------------------------------------------
   exports.EsiInfo_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.EsiinfoSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Esi Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Esi Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Esi Info Simple List -----------------------------------------------
   exports.EsiInfo_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.EsiinfoSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Esi_No : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Esi Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Esi Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Esi Info Update -----------------------------------------------
   exports.EsiInfo_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Esi_Info_Id || ReceivingData.Esi_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Esi Info Id can not be empty" });
      }else if(!ReceivingData.Esi_No || ReceivingData.Esi_No === '' ) {
         res.status(400).send({Status: false, Message: "Esi No can not be empty" });
      }  else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if(!ReceivingData.Signatory_Designation || ReceivingData.Signatory_Designation === '' ) {
            res.status(400).send({Status: false, Message: "Signatory Designation can not be empty" });
      }else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.EsiinfoSchema.findOne({'_id': ReceivingData.Esi_Info_Id}, {}, {}, function(err, result) { // Esi Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Esi Info !."});
            } else {
               if (result !== null) {
                  result.Esi_No = ReceivingData.Esi_No;
                  result.Registration_Date = ReceivingData.Registration_Date;
                  result.Signatory_Name = ReceivingData.Signatory_Name; 
                  result.Signatory_Designation = ReceivingData.Signatory_Designation;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Esi Info Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Esi Info!."});
                     } else {
                        CompanySettingsModel.EsiinfoSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //Esi Info FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Esi Info!."});
                           } else { 
                           
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Esi Info Id can not be valid!" });
               }
            }
         });
      }
   };

// Esi Info Delete -----------------------------------------------
   exports.EsiInfo_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Esi_Info_Id || ReceivingData.Esi_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Esi Info Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.EsiinfoSchema.findOne({'_id': ReceivingData.Esi_Info_Id}, {}, {}, function(err, result) { // Esi Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Esi Info!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Esi Info Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Esi Info Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Esi Info!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Esi Info Id can not be valid!" });
               }
            }
         });
      }
   };

// ************************************************** Pt Info *****************************************************
   // -------------------------------------------------- Pt Info Async Validate -----------------------------------------------
   exports.PtInfo_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pt_No || ReceivingData.Pt_No === '' ) {
         res.status(400).send({Status: false, Message: "Pt No can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PtinfoSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Pt_No': { $regex : new RegExp("^" + ReceivingData.Pt_No + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Pt Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Pt Info!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   

// Pt Info Create -----------------------------------------------
   exports.PtInfo_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pt_No || ReceivingData.Pt_No === '' ) {
         res.status(400).send({Status: false, Message: "Pt No can not be empty" });
      } else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_PtInfo = new CompanySettingsModel.PtinfoSchema({
            Pt_No: ReceivingData.Pt_No, 
            Registration_Date: ReceivingData.Registration_Date, 
            Signatory_Name: ReceivingData.Signatory_Name, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_PtInfo.save(function(err, result) { // Pt Info Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Pt Info!."});
            } else {
               CompanySettingsModel.PtinfoSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Pt Info FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Pt Info!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Pt Info List -----------------------------------------------
   exports.PtInfo_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PtinfoSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Pt Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pt Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Pt Info Simple List -----------------------------------------------
   exports.PtInfo_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
0
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         CompanySettingsModel.PtinfoSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Pt_No : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Pt Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pt Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Pt Info Update -----------------------------------------------
   exports.PtInfo_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pt_Info_Id || ReceivingData.Pt_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Pt Info Id can not be empty" });
      }else if(!ReceivingData.Pt_No || ReceivingData.Pt_No === '' ) {
         res.status(400).send({Status: false, Message: "Pt No can not be empty" });
      }  else if(!ReceivingData.Registration_Date || ReceivingData.Registration_Date === '' ) {
         res.status(400).send({Status: false, Message: "Registration Date can not be empty" });
      } else if(!ReceivingData.Signatory_Name || ReceivingData.Signatory_Name === '' ) {
         res.status(400).send({Status: false, Message: "Signatory Name can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.PtinfoSchema.findOne({'_id': ReceivingData.Pt_Info_Id}, {}, {}, function(err, result) { // Pt Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pt Info !."});
            } else {
               if (result !== null) {
                  result.Pt_No = ReceivingData.Pt_No;
                  result.Registration_Date = ReceivingData.Registration_Date;
                  result.Signatory_Name = ReceivingData.Signatory_Name; 
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Pt Info Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Pt Info!."});
                     } else {
                        CompanySettingsModel.PtinfoSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //Pt Info FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Pt Info!."});
                           } else { 
                           
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Pt Info Id can not be valid!" });
               }
            }
         });
      }
   };

// Pt Info Delete -----------------------------------------------
   exports.PtInfo_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pt_Info_Id || ReceivingData.Pt_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "Pt Info Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         CompanySettingsModel.PtinfoSchema.findOne({'_id': ReceivingData.Pt_Info_Id}, {}, {}, function(err, result) { // Pt Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Pt Info!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // Pt Info Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Pt Info Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Pt Info!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Pt Info Id can not be valid!" });
               }
            }
         });
      }
   };

// ************************************************** It Info *****************************************************
   // -------------------------------------------------- It Info Async Validate -----------------------------------------------
   exports.ItInfo_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pan_No || ReceivingData.Pan_No === '' ) {
         res.status(400).send({Status: false, Message: "Pan No can not be emIty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be emIty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be emIty" });
      }else {
         CompanySettingsModel.ItinfoSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Pan_No': { $regex : new RegExp("^" + ReceivingData.Pan_No + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'It Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find It Info!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   

// It Info Create -----------------------------------------------
   exports.ItInfo_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Pan_No || ReceivingData.Pan_No === '' ) {
         res.status(400).send({Status: false, Message: "Pan No can not be emIty" });
      } else if(!ReceivingData.Tan_No || ReceivingData.Tan_No === '' ) {
         res.status(400).send({Status: false, Message: "Tan No can not be emIty" });
      } else if(!ReceivingData.Tan_Circle_No || ReceivingData.Tan_Circle_No === '' ) {
         res.status(400).send({Status: false, Message: "Tan Circle No can not be emIty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be emIty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be emIty" });
      }else {
         var Create_ItInfo = new CompanySettingsModel.ItinfoSchema({
            Pan_No: ReceivingData.Pan_No, 
            Tan_No: ReceivingData.Tan_No, 
            Tan_Circle_No: ReceivingData.Tan_Circle_No, 
            TDS_Details: ReceivingData.TDS_Details, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_ItInfo.save(function(err, result) { // It Info Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the It Info!."});
            } else {
               CompanySettingsModel.ItinfoSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // It Info FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The It Info!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// It Info List -----------------------------------------------
   exports.ItInfo_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be emIty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be emIty" });
      }else {
         CompanySettingsModel.ItinfoSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // It Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The It Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// It Info Simple List -----------------------------------------------
   exports.ItInfo_Simple_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be emIty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be emIty" });
      }else {
         CompanySettingsModel.ItinfoSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Pan_No : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // It Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Find Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The It Info!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// It Info Update -----------------------------------------------
   exports.ItInfo_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.It_Info_Id || ReceivingData.It_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "It Info Id can not be emIty" });
      }else if(!ReceivingData.Pan_No || ReceivingData.Pan_No === '' ) {
         res.status(400).send({Status: false, Message: "Pan No can not be emIty" });
      }  else if(!ReceivingData.Tan_No || ReceivingData.Tan_No === '' ) {
         res.status(400).send({Status: false, Message: "Tan_Nocan not be emIty" });
      } else if(!ReceivingData.Tan_Circle_No || ReceivingData.Tan_Circle_No === '' ) {
         res.status(400).send({Status: false, Message: "Tan Circle No can not be emIty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be emIty" });
      }else {
         CompanySettingsModel.ItinfoSchema.findOne({'_id': ReceivingData.It_Info_Id}, {}, {}, function(err, result) { // It Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The It Info !."});
            } else {
               if (result !== null) {
                  result.Pan_No = ReceivingData.Pan_No;
                  result.Tan_No = ReceivingData.Tan_No;
                  result.Tan_Circle_No = ReceivingData.Tan_Circle_No; 
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // It Info Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Update Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the It Info!."});
                     } else {
                        CompanySettingsModel.ItinfoSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //It Info FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Find Query Error', 'Company_Settings.model.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The It Info!."});
                           } else { 
                           
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "It Info Id can not be valid!" });
               }
            }
         });
      }
   };

// It Info Delete -----------------------------------------------
   exports.ItInfo_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.It_Info_Id || ReceivingData.It_Info_Id === '' ) {
         res.status(400).send({Status: false, Message: "It Info Id can not be emIty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be emIty" });
      }else {
         CompanySettingsModel.ItinfoSchema.findOne({'_id': ReceivingData.It_Info_Id}, {}, {}, function(err, result) { // It Info FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info FindOne Query Error', 'Company_Settings.model.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The It Info!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // It Info Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings It Info Delete Query Error', 'Company_Settings.model.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the It Info!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "It Info Id can not be valid!" });
               }
            }
         });
      }
   };

//*************************************************** Branch  ***************************************/
// Branch Create -----------------------------------------------
    exports.Branch_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
  
      if(!ReceivingData.Branch_Name || ReceivingData.Branch_Name === ''  ) {
          res.status(400).send({Status: false, Message: "Branch Name can not be empty" });
      } else if ( !ReceivingData.Departments || typeof ReceivingData.Departments !== 'object' || Object.keys(ReceivingData.Departments).length < 2) {
        res.status(400).send({Status: false, Message: "Departments can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         const tempDepartment = ReceivingData.Departments.map(x => mongoose.Types.ObjectId(x._id));
         //  if( ReceivingData.Departments && typeof ReceivingData.Departments === 'object' && Object.keys(ReceivingData.Departments).length > 0){
         //      ReceivingData.Departments = mongoose.Types.ObjectId(ReceivingData.Departments._id)
         //  }
          if( ReceivingData.AllCountry && typeof ReceivingData.AllCountry === 'object' && Object.keys(ReceivingData.AllCountry).length > 0){
              ReceivingData.AllCountry._id = mongoose.Types.ObjectId(ReceivingData.AllCountry._id)
          } 
          if( ReceivingData.AllState && typeof ReceivingData.AllState === 'object' && Object.keys(ReceivingData.AllState).length > 0){
              ReceivingData.AllState._id = mongoose.Types.ObjectId(ReceivingData.AllState._id)
          }
          if( ReceivingData.AllCity && typeof ReceivingData.AllCity === 'object' && Object.keys(ReceivingData.AllCity).length > 0){
              ReceivingData.AllCity._id = mongoose.Types.ObjectId(ReceivingData.AllCity._id)
          }
           var Create_Branch = new CompanySettingsModel.BranchSchema({
            Branch_Name: ReceivingData.Branch_Name, 
            // Branch_Head: ReceivingData.Branch_Head, 
            Departments: tempDepartment, 
              "AllAddress.Street" : ReceivingData.AllStreet,
              "AllAddress.Area" : ReceivingData.AllArea,
              "AllAddress.ZipCode" : ReceivingData.AllZipCode,
              "AllAddress.Country" : ReceivingData.AllCountry,
              "AllAddress.State" : ReceivingData.AllState,
              "AllAddress.City" : ReceivingData.AllCity,
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status: ReceivingData.Active_Status || true,
            If_Deleted: false
         });
         Create_Branch.save(function(err, result) { // Branch Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch Creation Query Error', 'Company_Settings.model.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Branch!."});
            } else {
               CompanySettingsModel.BranchSchema
                  .findOne({'_id': result._id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
                  .populate({path : 'Departments', select: ['Department_Name']})
                  .populate({path : 'Global_Country', select: ['Country_Name']})
                  .populate({path : 'Global_State', select: ['State_Name']})
                  .populate({path : 'Global_City', select: ['City_Name']})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Branch FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch Find Query Error', 'Company_Settings.model.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Branch!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };

// Branch List -----------------------------------------------
 exports.Branch_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      CompanySettingsModel.BranchSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Branch_Name : 1, Branch_Head : 1, AllAddress : 1}, {sort: { updatedAt: -1 }})
         .populate({path : 'Departments', select: ['Department_Name']})
         .populate({path : 'Global_Country', select: ['Country_Name']})
         .populate({path : 'Global_State', select: ['State_Name']})
         .populate({path : 'Global_City', select: ['City_Name']})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) { // Registration Info FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch Find Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Branch!."});
         } else {
           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Branches Simple List -----------------------------------------------
exports.Branch_Simple_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CompanySettingsModel.BranchSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Branch_Name : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Branches FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branches Find Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Branches!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Branch Update -----------------------------------------------
exports.Branch_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === ''  ) {
     res.status(400).send({Status: false, Message: " Branch Id Details can not be empty" });
   } else if(!ReceivingData.Branch_Name || ReceivingData.Branch_Name === ''  ) {
     res.status(400).send({Status: false, Message: "Branch Name can not be empty" });
  } else if (!ReceivingData.Branch_Head || ReceivingData.Branch_Head === ''  ) {
     res.status(400).send({Status: false, Message: "Branch Head can not be empty" });
  } else if ( !ReceivingData.Departments || typeof ReceivingData.Departments !== 'object' || Object.keys(ReceivingData.Departments).length < 2) {
     res.status(400).send({Status: false, Message: "Departments can not be empty" });
  } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
     res.status(400).send({Status: false, Message: "Company Details can not be empty" });
  } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
        if( ReceivingData.Departments && typeof ReceivingData.Departments === 'object' && Object.keys(ReceivingData.Departments).length > 0){
           ReceivingData.Departments = mongoose.Types.ObjectId(ReceivingData.Departments._id)
        }
        if( ReceivingData.AllCountry && typeof ReceivingData.AllCountry === 'object' && Object.keys(ReceivingData.AllCountry).length > 0){
             ReceivingData.AllCountry._id = mongoose.Types.ObjectId(ReceivingData.AllCountry._id)
         } 
         if( ReceivingData.AllState && typeof ReceivingData.AllState === 'object' && Object.keys(ReceivingData.AllState).length > 0){
             ReceivingData.AllState._id = mongoose.Types.ObjectId(ReceivingData.AllState._id)
         }
         if( ReceivingData.AllCity && typeof ReceivingData.AllCity === 'object' && Object.keys(ReceivingData.AllCity).length > 0){
             ReceivingData.AllCity._id = mongoose.Types.ObjectId(ReceivingData.AllCity._id)
         }
      CompanySettingsModel.BranchSchema.update( 
         {'_id': mongoose.Types.ObjectId(ReceivingData.Branch_Id)}, 
         { $set: { 
                    Departments: ReceivingData.Departments, 
                    Branch_Name: ReceivingData.Branch_Name, 
                    Branch_Head: ReceivingData.Branch_Head,
                          "AllAddress.Street" : ReceivingData.AllStreet,
                          "AllAddress.Area" : ReceivingData.AllArea,
                          "AllAddress.ZipCode" : ReceivingData.AllZipCode,
                          "AllAddress.Country" : ReceivingData.AllCountry,
                          "AllAddress.State" : ReceivingData.AllState,
                          "AllAddress.City" : ReceivingData.AllCity,
                    Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Modified_By)
                 } 
        }).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch FindOne Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Branch!."});
         } else {
              CompanySettingsModel.BranchSchema
                 .findOne({'_id': ReceivingData.Branch_Id})
                 .populate({path : 'Departments', select: ['Department_Name']})
                 .populate({path : 'Global_Country', select: ['Country_Name']})
                 .populate({path : 'Global_State', select: ['State_Name']})
                 .populate({path : 'Global_City', select: ['City_Name']})
                 .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                 .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                 .exec(function(err_2, result_2) { // Branch FindOne Query
                 if(err_2) {
                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch Find Query Error', 'Company_Settings.model.js', err_2);
                    res.status(417).send({status: false, Message: "Some error occurred while Find The Branch!."});
                 } else {
                    var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                       ReturnData = ReturnData.toString();
                    res.status(200).send({Status: true, Response: ReturnData });
                 }
              });
         }
      });
   }
};

// Branch Delete -----------------------------------------------
exports.Branch_Delete = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' ) {
      res.status(400).send({Status: false, Message: "Branch Id  can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      CompanySettingsModel.BranchSchema.findOne({'_id': ReceivingData.Branch_Id}, {}, {}, function(err, result) { // Branch FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch FindOne Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Branch!."});
         } else {
            if (result !== null) {
               result.If_Deleted = true;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
               result.save(function(err_1, result_1) { // Branch Delete Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Branch Delete Query Error', 'Company_Settings.model.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Branch!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Branch Id can not be valid!" });
            }
         }
      });
   }
};

//*************************************************** Contact Info  ***************************************/
// Contact Info Create -----------------------------------------------
exports.Contact_Info_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Contact_Person_Name || ReceivingData.Contact_Person_Name === ''  ) {
       res.status(400).send({Status: false, Message: "Contact Person Name can not be empty" });
   } else if ( !ReceivingData.Branches || typeof ReceivingData.Branches !== 'object' || Object.keys(ReceivingData.Branches).length < 2) {
      res.status(400).send({Status: false, Message: "Branches can not be empty" });
   } else if ( !ReceivingData.Departments || typeof ReceivingData.Departments !== 'object' || Object.keys(ReceivingData.Departments).length < 2) {
     res.status(400).send({Status: false, Message: "Departments can not be empty" });
   } if(!ReceivingData.Phone || ReceivingData.Phone === ''  ) {
      res.status(400).send({Status: false, Message: "Phone can not be empty" });
   } if(!ReceivingData.Email || ReceivingData.Email === ''  ) {
       res.status(400).send({Status: false, Message: "Email can not be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
       if( ReceivingData.Branches && typeof ReceivingData.Branches === 'object' && Object.keys(ReceivingData.Branches).length > 0){
           ReceivingData.Branches = mongoose.Types.ObjectId(ReceivingData.Branches._id)
       }
       if( ReceivingData.Departments && typeof ReceivingData.Departments === 'object' && Object.keys(ReceivingData.Departments).length > 0){
           ReceivingData.Departments._id = mongoose.Types.ObjectId(ReceivingData.Departments._id)
       } 
       var Create_Contact_Info = new CompanySettingsModel.ContactInfoSchema({
         Contact_Person_Name: ReceivingData.Contact_Person_Name, 
         Branches: ReceivingData.Branches, 
         Departments: ReceivingData.Departments, 
         Phone: ReceivingData.Phone, 
         Email: ReceivingData.Email, 
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: ReceivingData.Active_Status || true,
         If_Deleted: false
      });
      Create_Contact_Info.save(function(err, result) { // Contact Info Save Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info Creation Query Error', 'Company_Settings.model.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Contact Info!."});
         } else {
            CompanySettingsModel.ContactInfoSchema
               .findOne({'_id': result._id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({path : 'Departments', select: ['Department_Name']})
               .populate({path : 'Branches', select: ['Branch_Name']})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) { // Contact Info FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info Find Query Error', 'Company_Settings.model.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Info!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};

// Contact Info List -----------------------------------------------
exports.Contact_Info_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      CompanySettingsModel.ContactInfoSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Contact_Person_Name : 1, Branches : 1, Departments : 1}, {sort: { updatedAt: -1 }})
         .populate({path : 'Departments', select: ['Department_Name']})
         .populate({path : 'Branches', select: ['Branch_Name']})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) { // Contact Info FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info Find Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Info!."});
         } else {
           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Contact Info Update -----------------------------------------------
exports.Contact_Info_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Contact_Person_Id || ReceivingData.Contact_Person_Id === ''  ) {
     res.status(400).send({Status: false, Message: " Branch Id Details can not be empty" });
   } else if(!ReceivingData.Contact_Person_Name || ReceivingData.Contact_Person_Name === ''  ) {
     res.status(400).send({Status: false, Message: "Contact Person Name can not be empty" });
  } else if ( !ReceivingData.Branches || typeof ReceivingData.Branches !== 'object' || Object.keys(ReceivingData.Branches).length < 2) {
     res.status(400).send({Status: false, Message: "Branches can not be empty" });
  } else if ( !ReceivingData.Departments || typeof ReceivingData.Departments !== 'object' || Object.keys(ReceivingData.Departments).length < 2) {
   res.status(400).send({Status: false, Message: "Departments can not be empty" });
   } if(!ReceivingData.Phone || ReceivingData.Phone === ''  ) {
      res.status(400).send({Status: false, Message: "Phone can not be empty" });
   } if(!ReceivingData.Email || ReceivingData.Email === ''  ) {
       res.status(400).send({Status: false, Message: "Email can not be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
     res.status(400).send({Status: false, Message: "Company Details can not be empty" });
  } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
        if( ReceivingData.Branches && typeof ReceivingData.Branches === 'object' && Object.keys(ReceivingData.Branches).length > 0){
           ReceivingData.Branches = mongoose.Types.ObjectId(ReceivingData.Branches._id)
        }
        if( ReceivingData.Departments && typeof ReceivingData.Departments === 'object' && Object.keys(ReceivingData.Departments).length > 0){
             ReceivingData.Departments._id = mongoose.Types.ObjectId(ReceivingData.Departments._id)
         } 
      CompanySettingsModel.ContactInfoSchema.update( 
         {'_id': mongoose.Types.ObjectId(ReceivingData.Contact_Person_Id)}, 
         { $set: { 
                    Departments: ReceivingData.Departments, 
                    Contact_Person_Name: ReceivingData.Contact_Person_Name, 
                    Branches: ReceivingData.Branches,
                    Phone: ReceivingData.Phone,
                    Email: ReceivingData.Email,
                    Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Modified_By)
                 } 
        }).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info FindOne Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Info!."});
         } else {
              CompanySettingsModel.ContactInfoSchema
                 .findOne({'_id': ReceivingData.Contact_Person_Id})
                 .populate({path : 'Departments', select: ['Department_Name']})
                 .populate({path : 'Branches', select: ['Branch_Name']})
                 .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                 .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                 .exec(function(err_2, result_2) { // Contact Info FindOne Query
                 if(err_2) {
                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info Find Query Error', 'Company_Settings.model.js', err_2);
                    res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Info!."});
                 } else {
                    var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                       ReturnData = ReturnData.toString();
                    res.status(200).send({Status: true, Response: ReturnData });
                 }
              });
         }
      });
   }
};

// Contact Info Delete -----------------------------------------------
exports.Contact_Info_Delete = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Contact_Person_Id || ReceivingData.Contact_Person_Id === '' ) {
      res.status(400).send({Status: false, Message: "Contact_Person_Id can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      CompanySettingsModel.ContactInfoSchema.findOne({'_id': ReceivingData.Contact_Person_Id}, {}, {}, function(err, result) { // Contact Info FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info FindOne Query Error', 'Company_Settings.model.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Info!."});
         } else {
            if (result !== null) {
               result.If_Deleted = true;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
               result.save(function(err_1, result_1) { // Contact Info Delete Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Settings Contact Info Delete Query Error', 'Company_Settings.model.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Contact Info!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Contact Person Id can not be valid!" });
            }
         }
      });
   }
};
