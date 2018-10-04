var CryptoJS = require("crypto-js");
var CRMSettingsModel = require('./../../models/settings/CRM_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');




// ************************************************** Industry Type *****************************************************
   // -------------------------------------------------- Industry Type Async Validate -----------------------------------------------
      exports.IndustryType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Industry_Type': { $regex : new RegExp("^" + ReceivingData.Industry_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Industry Type!."});
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
   // Industry Type Create -----------------------------------------------
      exports.Industry_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_IndustryType = new CRMSettingsModel.IndustryTypeSchema({
               Industry_Type: ReceivingData.Industry_Type, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_IndustryType.save(function(err, result) { // Industry Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Industry Type!."});
               } else {
                  CRMSettingsModel.IndustryTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Industry Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Industry Types!."});
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
   // Industry Type List -----------------------------------------------
      exports.Industry_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type Simple List -----------------------------------------------
      exports.Industry_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type Update -----------------------------------------------
      exports.Industry_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         }else if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.Industry_Type = ReceivingData.Industry_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Industry Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Industry Type!."});
                        } else {
                           CRMSettingsModel.IndustryTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Industry Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Industry Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Industry Type Delete -----------------------------------------------
      exports.Industry_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Industry Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Industry Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Ownership Type *****************************************************
   // Ownership Type Async Validate -----------------------------------------------
      exports.OwnershipType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Ownership_Type': { $regex : new RegExp("^" + ReceivingData.Ownership_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Ownership Type!."});
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
   // Ownership Type Create -----------------------------------------------
      exports.Ownership_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_OwnershipType = new CRMSettingsModel.OwnershipTypeSchema({
               Ownership_Type: ReceivingData.Ownership_Type, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_OwnershipType.save(function(err, result) { // Ownership Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Ownership Type!."});
               } else {
                  CRMSettingsModel.OwnershipTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Ownership Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Ownership Types!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Ownership Type List -----------------------------------------------
      exports.Ownership_Type_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: "Ownership Type Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.OwnershipTypeSchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ownership Type Simple List -----------------------------------------------
      exports.Ownership_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Ownership_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ownership Type Update -----------------------------------------------
      exports.Ownership_Type_Update = function(req,res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info ,'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type_Id || ReceivingData.Ownership_Type_Id === '') {
            res.Status(400).send({status: false, Message: "Ownership Type Id can not be empty"});
         } else if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '') {
            res.status(400).send({status: false, Message: "Ownership Type Cannot be Empty"});
         } else if(!ReceivingData.Modified_By || ReceivingData.Modified_By === '') {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({'_id': ReceivingData.Ownership_Type_Id}, {}, {}, function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Type!."});
               } else {
                  if (result !== null) {
                     result.Ownership_Type = ReceivingData.Ownership_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Ownership Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Ownership Type!."});
                        } else {
                           CRMSettingsModel.OwnershipTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Ownership Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Ownership Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Ownership Type Id can not be valid!" });
                  }
               }
            });
         }

      };
   // Ownership Type Delete -----------------------------------------------
      exports.Ownership_Type_Delete = function(req, res) {
            var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
            var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

            if(!ReceivingData.Ownership_Type_Id || ReceivingData.Ownership_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type Id can not be empty" });
            } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
            }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({'_id': ReceivingData.Ownership_Type_Id}, {}, {}, function(err, result) { // Ownership Type FindOne Query
                  if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Type!."});
                  } else {
                  if (result !== null) {
                        result.If_Deleted = true;
                        result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                        result.save(function(err_1, result_1) { // Ownership Type Delete Query
                        if(err_1) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Delete Query Error', 'CRM_Settings.controller.js');
                              res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Ownership Type!."});
                        } else {
                              res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                        });
                  } else {
                        res.status(400).send({Status: false, Message: "Ownership Type Id can not be valid!" });
                  }
                  }
            });
            }

      };


// ************************************************** Account Type *****************************************************
// Account Type Async Validate ------------------------------------
   exports.AccountType_AsyncValidate = function(req, res){
      var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Account_Type || ReceivingData.Account_Type === ''){
         res.status(400).send({ Status: false, Message: "Account Type Cannot be empty"});
      } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
         res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
         res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
      } else{
         CRMSettingsModel.AccountTypeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Account_Type': {$regex : new RegExp("^" + ReceivingData.Account_Type + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Type Find Query Error', 'CRM_Settings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Account Type!."});
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

   // Account Type Create -----------------------------------------------
      exports.Account_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               
         if(!ReceivingData.Account_Type || ReceivingData.Account_Type === '' ) {
               res.status(400).send({Status: false, Message: "Account Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
               res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
               res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         } else {
            var Create_AccountType = new CRMSettingsModel.AccountTypeSchema({
               Account_Type: ReceivingData.Account_Type, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_AccountType.save(function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Account Type!."});
               } else {
                  CRMSettingsModel.AccountTypeSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1){
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Account Types!."});
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
   // Account Type List -----------------------------------------------
      exports.Account_Type_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({status: false ,Message: "Account Type Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.AccountTypeSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Account Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Account Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
		};	
	// Account Type Simple List -----------------------------------------------
      exports.Account_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Account Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.AccountTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Account_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Account Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
		};
	
   // Account Type Update -----------------------------------------------
      exports.Account_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Account_Type_Id || ReceivingData.Account_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Account Type Id can not be empty" });
         }else if(!ReceivingData.Account_Type || ReceivingData.Account_Type === '' ) {
            res.status(400).send({Status: false, Message: "Account Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.AccountTypeSchema.findOne({'_id': ReceivingData.Account_Type_Id}, {}, {}, function(err, result) { // Account Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Account Type!."});
               } else {
                  if (result !== null) {
                     result.Account_Type = ReceivingData.Account_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Account Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Account Type!."});
                        } else {
                           CRMSettingsModel.AccountTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Account Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Account Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Account Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Account Type Delete -----------------------------------------------
      exports.Account_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Account_Type_Id || ReceivingData.Account_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Account Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.AccountTypeSchema.findOne({'_id': ReceivingData.Account_Type_Id}, {}, {}, function(err, result) { // Account Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Account Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Account Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Account Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Account Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Account Type Id can not be valid!" });
                  }
               }
            });
         }
      };



// ************************************************** Activity Type *****************************************************
   // Activity Type Async Validate ------------------------------------
      exports.ActivityType_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === ''){
            res.status(400).send({ Status: false, Message: "Activity Type Cannot be empty"});
         } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityTypeSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Activity_Type': {$regex : new RegExp("^" + ReceivingData.Activity_Type + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Type!."});
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
   // Activity Type Create -----------------------------------------------
      exports.Activity_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityType = new CRMSettingsModel.ActivityTypeSchema({
               Activity_Type: ReceivingData.Activity_Type, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityType.save(function(err, result) { // Activity Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Type!."});
               } else {
                  CRMSettingsModel.ActivityTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Types!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Type List -----------------------------------------------
      exports.Activity_Type_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: "Activity Type Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityTypeSchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Type Simple List -----------------------------------------------
      exports.Activity_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Activity_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Type Update -----------------------------------------------
      exports.Activity_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type_Id || ReceivingData.Activity_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type Id can not be empty" });
         }else if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.findOne({'_id': ReceivingData.Activity_Type_Id}, {}, {}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Type!."});
               } else {
                  if (result !== null) {
                     result.Activity_Type = ReceivingData.Activity_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Type!."});
                        } else {
                           CRMSettingsModel.ActivityTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Type Delete -----------------------------------------------
      exports.Activity_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type_Id || ReceivingData.Activity_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.findOne({'_id': ReceivingData.Activity_Type_Id}, {}, {}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Type Id can not be valid!" });
                  }
               }
            });
         }
      };


 
      

// ************************************************** Activity Status *****************************************************
   // Activity Status Async Validate --------------------------------------
      exports.ActivityStatus_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === ''){
            res.status(400).send({ Status: false, Message: "Activity Status Cannot be empty"});
         } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityStatusSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Activity_Status': {$regex : new RegExp("^" + ReceivingData.Activity_Status + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Status!."});
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
   // Activity Status Create -----------------------------------------------
      exports.Activity_Status_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityStatus = new CRMSettingsModel.ActivityStatusSchema({
               Activity_Status: ReceivingData.Activity_Status, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityStatus.save(function(err, result) { // Activity Status Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Status!."});
               } else {
                  CRMSettingsModel.ActivityStatusSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Status FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Status!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Status List -----------------------------------------------
      exports.Activity_Status_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: "Activity Status Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityStatusSchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Status Simple List -----------------------------------------------
      exports.Activity_Status_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Activity_Status : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Status Update -----------------------------------------------
      exports.Activity_Status_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status_Id || ReceivingData.Activity_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status Id can not be empty" });
         }else if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.findOne({'_id': ReceivingData.Activity_Status_Id}, {}, {}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  if (result !== null) {
                     result.Activity_Status = ReceivingData.Activity_Status;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Status Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Status!."});
                        } else {
                           CRMSettingsModel.ActivityStatusSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Status FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Status!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Status Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Status Delete -----------------------------------------------
      exports.Activity_Status_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status_Id || ReceivingData.Activity_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.findOne({'_id': ReceivingData.Activity_Status_Id}, {}, {}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Status Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Status Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Activity Priority *****************************************************
   // Activity Priority Async Validate ---------------------------------------------
      exports.ActivityPriority_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === ''){
            res.status(400).send({ Status: false, Message: "Activity Priority Cannot be empty"});
         } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityPrioritySchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Activity_Priority': {$regex : new RegExp("^" + ReceivingData.Activity_Priority + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Priority!."});
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
   // Activity Priority Create -----------------------------------------------
      exports.Activity_Priority_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityPriority  = new CRMSettingsModel.ActivityPrioritySchema({
               Activity_Priority: ReceivingData.Activity_Priority, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityPriority.save(function(err, result) { // Activity Priority Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Priority!."});
               } else {
                  CRMSettingsModel.ActivityPrioritySchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Priority FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Priority!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Priority List -----------------------------------------------
      exports.Activity_Priority_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: "Activity Priority Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityPrioritySchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Priority Simple List -----------------------------------------------
      exports.Activity_Priority_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Activity_Priority : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Priority Update -----------------------------------------------
      exports.Activity_Priority_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority_Id || ReceivingData.Activity_Priority_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority Id can not be empty" });
         }else if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.findOne({'_id': ReceivingData.Activity_Priority_Id}, {}, {}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  if (result !== null) {
                     result.Activity_Priority = ReceivingData.Activity_Priority;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Priority Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Priority!."});
                        } else {
                           CRMSettingsModel.ActivityPrioritySchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Priority FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Priority!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Priority Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Priority Delete -----------------------------------------------
      exports.Activity_Priority_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority_Id || ReceivingData.Activity_Priority_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.findOne({'_id': ReceivingData.Activity_Priority_Id}, {}, {}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Priority Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Priority!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Priority Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Contact Role *****************************************************
   // Contact Role Async Validate -------------------------------------
      exports.ContactRole_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === ''){
            res.status(400).send({ Status: false, Message: "Contact Role Cannot be empty"});
         } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ContactRoleSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Contact_Role': {$regex : new RegExp("^" + ReceivingData.Contact_Role + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Contact Role!."});
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
   // Contact Role Create -----------------------------------------------
      exports.Contact_Role_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ContactRole = new CRMSettingsModel.ContactRoleSchema({
               Contact_Role: ReceivingData.Contact_Role, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ContactRole.save(function(err, result) { // Contact Role Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Contact Role!."});
               } else {
                  CRMSettingsModel.ContactRoleSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Contact Role FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact RoleFind Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Role!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Contact Role List -----------------------------------------------
      exports.Contact_Role_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: "Contact Role Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ContactRoleSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { }, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Contact Role FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
         }
      };
   // Contact Role Simple List -----------------------------------------------
      exports.Contact_Role_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Contact_Role : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Contact Role Update -----------------------------------------------
      exports.Contact_Role_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role_Id || ReceivingData.Contact_Role_Id === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role Id can not be empty" });
         }else if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.findOne({'_id': ReceivingData.Contact_Role_Id}, {}, {}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  if (result !== null) {
                     result.Contact_Role = ReceivingData.Contact_Role;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Contact Role Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Contact Role!."});
                        } else {
                           CRMSettingsModel.ContactRoleSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Contact Role FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Role!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Contact Role Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Contact Role Delete -----------------------------------------------
      exports.Contact_Role_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role_Id || ReceivingData.Contact_Role_Id === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.findOne({'_id': ReceivingData.Contact_Role_Id}, {}, {}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Contact Role Id Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Id Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Contact_Role_Id!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Contact Role Id Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Pipeline Status *****************************************************
   // Pipeline Status Async Validate
      exports.PipelineStatus_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Pipeline_Status || ReceivingData.Pipeline_Status === ''){
            res.status(400).send({ Status: false, Message: "Pipeline Status Cannot be empty"});
         } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"}); 
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.PipelineStatusSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Pipeline_Status': {$regex : new RegExp("^" + ReceivingData.Pipeline_Status + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Pipeline Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Pipeline Status!."});
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
   // Pipeline Status Create -----------------------------------------------
      exports.Pipeline_Status_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Pipeline_Status || ReceivingData.Pipeline_Status === '' ) {
            res.status(400).send({Status: false, Message: "Pipeline Status can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_PipelineStatus = new CRMSettingsModel.PipelineStatusSchema({
               Pipeline_Status: ReceivingData.Pipeline_Status, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_PipelineStatus.save(function(err, result) { // Pipeline Status Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline StatusCreation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Pipeline Status!."});
               } else {
                  CRMSettingsModel.PipelineStatusSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Pipeline Status FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Pipeline Status!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Pipeline Status List -----------------------------------------------
      exports.Pipeline_Status_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
               res.status(400).send({status: false ,Message: " Pipeline Status Id can not be empty" });
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.PipelineStatusSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Pipeline Status FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Find Query Error', 'CRM_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pipeline Status!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
         }
      };
   // Pipeline Status Simple List -----------------------------------------------
      exports.Pipeline_Status_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Pipeline Status can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.PipelineStatusSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Pipeline_Status : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Pipeline Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pipeline Status!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Pipeline Status Update -----------------------------------------------
      exports.Pipeline_Status_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Pipeline_Status_Id || ReceivingData.Pipeline_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Pipeline Status Id can not be empty" });
         }else if(!ReceivingData.Pipeline_Status || ReceivingData.Pipeline_Status === '' ) {
            res.status(400).send({Status: false, Message: "Pipeline Status can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.PipelineStatusSchema.findOne({'_id': ReceivingData.Pipeline_Status_Id}, {}, {}, function(err, result) { // Pipeline Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pipeline Status!."});
               } else {
                  if (result !== null) {
                     result.Pipeline_Status = ReceivingData.Pipeline_Status;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Pipeline Status Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Pipeline Status!."});
                        } else {
                           CRMSettingsModel.PipelineStatusSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Pipeline Status FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Pipeline Status!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Pipeline Status Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Pipeline Status Delete -----------------------------------------------
      exports.Pipeline_Status_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Pipeline_Status_Id || ReceivingData.Pipeline_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Pipeline Status Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.PipelineStatusSchema.findOne({'_id': ReceivingData.Pipeline_Status_Id}, {}, {}, function(err, result) { // Pipeline Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Pipeline Status!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Pipeline Status Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Pipeline Status Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Pipeline Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Pipeline Status Id can not be valid!" });
                  }
               }
            });
         }
      };