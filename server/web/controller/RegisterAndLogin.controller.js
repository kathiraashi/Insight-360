var CryptoJS = require("crypto-js");
var AdminUsersModel = require('./../models/AdminUsers.model.js');
var ErrorManagement = require('./../../handling/ErrorHandling.js');
var axios = require("axios");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// -------------------------------------------------- User Validate -----------------------------------------------
exports.User_Validate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
      res.status(400).send({Status: false, Message: "User_Name can not be empty" });
   } else if (!ReceivingData.User_Password || ReceivingData.User_Password === ''  ) {
      res.status(400).send({Status: false, Message: "User Password can not be empty" });
   }else {
      AdminUsersModel.AdminUsers.findOne({'User_Name': ReceivingData.User_Name, 'User_Password': ReceivingData.User_Password}, { User_Password: 0 }, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Details Validate Query Error', 'RegisterAndLogin.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Validate The User Details!."});
         } else {
            if(result === null){
               AdminUsersModel.AdminUsers.findOne({'User_Name': ReceivingData.User_Name }, function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Name Validate Query Error', 'RegisterAndLogin.controller.js', err_1);
                     res.status(417).send({Status: false, Error:err_1, Message: "Some error occurred while Validate the User Name!"});           
                  } else {
                     if (result_1 === null) {
                        res.status(200).send({ Status: false, Message: "Invalid account details!" });
                     }else{
                        res.status(200).send({ Status: false, Message: "User Name and password do not match!" });
                     }
                  }
              });
            }else{
               res.status(200).send({ Status: true,  Response: result });
            } 
         }
      });
   }
};

// -------------------------------------------------- User Register -----------------------------------------------
exports.User_Register = function(req, res) {

   var ReceivingData = req.body;
   
   if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
      res.status(400).send({Status: false, Message: "User_Name can not be empty" });
   } else if (!ReceivingData.User_Password || ReceivingData.User_Password === ''  ) {
         res.status(400).send({Status: false, Message: "User Password can not be empty" });
   } else if (!ReceivingData.User_Blocked_Status || ReceivingData.User_Blocked_Status === ''  ) {
         res.status(400).send({Status: false, Message: "User Blocked Status can not be empty" });
   } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.Company_Response_Id || ReceivingData.Company_Response_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Response Details can not be empty" });
   } else {

      var CreateAdminUsers = new AdminUsersModel.AdminUsers({
         User_Name: ReceivingData.User_Name, 
         User_Password: ReceivingData.User_Password,
         User_Blocked_Status: ReceivingData.User_Blocked_Status,
         Company_Id: ReceivingData.Company_Id,
         Company_Response_Id: ReceivingData.Company_Response_Id
      });

      CreateAdminUsers.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Admin User Creation Query Error', 'RegisterAndLogin.controller.js');
            res.status(400).send({Status: false, Error: err, Message: "Some error occurred while creating the Admin User!."});
         } else {
            res.status(200).send({Status: true, Response: result } );
         }
      });
  }

};
