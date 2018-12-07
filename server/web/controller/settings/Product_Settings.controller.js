var CryptoJS = require("crypto-js");
var ProductSettingsModel = require('./../../models/settings/Product_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************************** Unit Of Measure *****************************************************
// -------------------------------------------------- Unit Of Measure Async Validate -----------------------------------------------
exports.UOM_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.UOM || ReceivingData.UOM === '' ) {
      res.status(400).send({Status: false, Message: "UOM can not be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      ProductSettingsModel.UOMSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'UOM': { $regex : new RegExp("^" + ReceivingData.UOM + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'UOM Find Query Error', 'Product_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find UOM!."});
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

// UOM Create -----------------------------------------------
exports.UOM_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.UOM || ReceivingData.UOM === '' ) {
      res.status(400).send({Status: false, Message: "UOM can not be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
      var Create_UOM = new ProductSettingsModel.UOMSchema({
         UOM: ReceivingData.UOM, 
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Active_Status: true,
         If_Deleted: false
      });
      Create_UOM.save(function(err, result) { // UOM  Save Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM Creation Query Error', 'Product_Settings.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the UOM!."});
         } else {
            ProductSettingsModel.UOMSchema
               .findOne({'_id': result._id})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) { // UOM FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM Find Query Error', 'Product_Settings.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The UOM!."});
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

    
// UOM List -----------------------------------------------
   exports.UOM_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ProductSettingsModel.UOMSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // UOM Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM Find Query Error', 'Product_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The UOM!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   

// UOM Update -----------------------------------------------
   exports.UOM_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.UOM_Id || ReceivingData.UOM_Id === '' ) {
         res.status(400).send({Status: false, Message: "UOM Id can not be empty" });
      }else if(!ReceivingData.UOM || ReceivingData.UOM === '' ) {
         res.status(400).send({Status: false, Message: "UOM can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         ProductSettingsModel.UOMSchema.findOne({'_id': ReceivingData.UOM_Id}, {}, {}, function(err, result) { // UOM FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM FindOne Query Error', 'Product_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The UOM!."});
            } else {
               if (result !== null) {
                  result.UOM = ReceivingData.UOM;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { // UOM Type  Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM Update Query Error', 'Product_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the UOM !."});
                     } else {
                        ProductSettingsModel.UOMSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { // Expenses Type  FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Settings UOM Find Query Error', 'Product_Settings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Update the UOM !."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                              ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "UOM Id can not be valid!" });
               }
            }
         });
      }
   };

// UOM Delete -----------------------------------------------
    exports.UOM_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.UOM_Id || ReceivingData.UOM_Id === '' ) {
         res.status(400).send({Status: false, Message: "UOM Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         ProductSettingsModel.UOMSchema.findOne({'_id': ReceivingData.UOM_Id}, {}, {}, function(err, result) { // UOM FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product settings UOM  FindOne Query Error', 'Products_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The UOM !."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = ReceivingData.Modified_By;
                  result.save(function(err_1, result_1) { // UOM Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UOM Delete Query Error', 'Product_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the UOM!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "UOM Id can not be valid!" });
               }
            }
         });
      }
   };