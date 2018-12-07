var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var UserManagementModel = require('../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var NotificationModel = require('../../models/Notification/Notification.model.js');

// **************************** CRM Customer *********************************
// Phone Async Validate
exports.Phone_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Phone_Number || ReceivingData.Phone_Number === '' ) {
      res.status(400).send({Status: false, Message: "Phone number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      CrmModel.CrmCustomerSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Phone_Number': { $regex : new RegExp("^" + ReceivingData.Phone_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Phone NumberFind Query Error', 'Leads.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Phone Number!."});
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
// Crm Customer Create
exports.CrmCustomer_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Company_Name || ReceivingData.Company_Name === '') {
      res.status(400).send({Status: false, Message: 'Company Name cannot be empty'});
   } else if(!ReceivingData.Phone_Number || ReceivingData.Phone_Number === '') {
      res.status(400).send({Status: false, Message: 'Phone Number Cannot be empty'});
   } else if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '') {
      res.status(400).send({Status: false, Message: 'Industry Type Details Cannot be empty'});
   } else if(!ReceivingData.No_Of_Employee || ReceivingData.No_Of_Employee === '') {
      res.status(400).send({Status: false, Message: 'No Of Employee Details Cannot be empty'});
   } else if(!ReceivingData.Account_Type || ReceivingData.Account_Type === '') {
      res.status(400).send({Status: false, Message: 'Account Type Details Cannot be empty'});
   } else if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '') {
      res.status(400).send({Status: false, Message: 'Ownership Type Details Cannot be empty'});
   } else {
      if (ReceivingData.BillingCountry && typeof ReceivingData.BillingCountry === 'object' && Object.keys(ReceivingData.BillingCountry).length > 0 ) {
         ReceivingData.BillingCountry._id = mongoose.Types.ObjectId(ReceivingData.BillingCountry._id);
      }
      if (ReceivingData.BillingState && typeof ReceivingData.BillingState === 'object' && Object.keys(ReceivingData.BillingState).length > 0 ) {
         ReceivingData.BillingState._id = mongoose.Types.ObjectId(ReceivingData.BillingState._id);
      }
      if (ReceivingData.BillingCity && typeof ReceivingData.BillingCity === 'object' && Object.keys(ReceivingData.BillingCity).length > 0 ) {
         ReceivingData.BillingCity._id = mongoose.Types.ObjectId(ReceivingData.BillingCity._id);
      }
      if (ReceivingData.ShopFloorCountry && typeof ReceivingData.ShopFloorCountry === 'object' && Object.keys(ReceivingData.ShopFloorCountry).length > 0 ) {
         ReceivingData.ShopFloorCountry._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCountry._id);
      }
      if (ReceivingData.ShopFloorState && typeof ReceivingData.ShopFloorState === 'object' && Object.keys(ReceivingData.ShopFloorState).length > 0 ) {
         ReceivingData.ShopFloorState._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorState._id);
      }
      if (ReceivingData.ShopFloorCity && typeof ReceivingData.ShopFloorCity === 'object' && Object.keys(ReceivingData.ShopFloorCity).length > 0 ) {
         ReceivingData.ShopFloorCity._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCity._id);
      }
      var Create_CrmCustomer = new CrmModel.CrmCustomerSchema({
         Company_Name: ReceivingData.Company_Name,
         Phone_Number: ReceivingData.Phone_Number,
         Email: ReceivingData.Email,
         Website: ReceivingData.Website,
         Industry_Type: mongoose.Types.ObjectId(ReceivingData.Industry_Type),
         No_Of_Employee: ReceivingData.No_Of_Employee,
         Account_Type: mongoose.Types.ObjectId(ReceivingData.Ownership_Type),
         Ownership_Type: mongoose.Types.ObjectId(ReceivingData.Ownership_Type),
         Notes: ReceivingData.Notes,
         "BillingAddress.Street": ReceivingData.BillingStreet,
         "BillingAddress.Area": ReceivingData.BillingArea,
         "BillingAddress.ZipCode": ReceivingData.BillingZipCode,
         "BillingAddress.Country": ReceivingData.BillingCountry,
         "BillingAddress.State": ReceivingData.BillingState,
         "BillingAddress.City": ReceivingData.BillingCity,
         SameAddresses: ReceivingData.SameAddresses,
         "ShopFloorAddress.Street": ReceivingData.ShopFloorStreet,
         "ShopFloorAddress.Area": ReceivingData.ShopFloorArea,
         "ShopFloorAddress.ZipCode": ReceivingData.ShopFloorZipCode,
         "ShopFloorAddress.Country": ReceivingData.ShopFloorCountry,
         "ShopFloorAddress.State": ReceivingData.ShopFloorState,
         "ShopFloorAddress.City": ReceivingData.ShopFloorCity,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmCustomer.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Creat Query Error', 'Customer.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result._id), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New CRM Customer Successfully Created', Response: ReturnData });
            async function notification() {
               const output = await notificationCreate('CrmCustomer', result._id, 'Customer', 'Create', result.Company_Id, result.Created_By, ReceivingData.User_Type);
            }
            notification();
         }
      });
   }
}
// notification create
function notificationCreate(ReferenceModel, ReferenceId, ReferenceKey, NotificationKey, CompanyId, UserId, UserType) {
   let level = 0;
   var reports_id = UserId;
   level = (UserType === 'User')? 5 : ((UserType === 'Co-ordinator')? 4 : ((UserType === 'Senior Executive')? 3: ((UserType === 'Manager')? 2: ((UserType === 'Sub Admin')? 1: 0))));
   var Create_Notification = new NotificationModel.NotificationSchema({
      Reference_Model: ReferenceModel,
      Reference_Id: mongoose.Types.ObjectId(ReferenceId),
      Reference_Key: ReferenceKey,
      Notification_Key: NotificationKey,
      Message: null,
      Company_Id: mongoose.Types.ObjectId(CompanyId),
      User_Id: mongoose.Types.ObjectId(UserId),
   });
   return new Promise(resolve => {
      Create_Notification.save(function(err, result) {
         if(err) {
            resolve(false);
         } else {
            if(level > 1) {
               var status = 'OnGoing';
               async function processArray(level) {
                  for (let index = 0; index < level; index++) {
                     const ReturnData = await saveNotify(index);
                     if (ReturnData === 'Error') {
                        status= 'Break'; 
                        break;
                     } 
                     if (ReturnData === 'Completed') {
                        status= 'Completed'; 
                        break;
                     }
                     console.log(ReturnData);
                  }
                  if (status !== 'Break') { 
                     resolve(true); 
                  } else { 
                     resolve(false); 
                  }
                  
               }
               processArray(level);
               function saveNotify(index) {
                  return new Promise(resolveNotify => {
                     UserManagementModel.User_Management.findOne({_id: mongoose.Types.ObjectId(reports_id)}, {})
                     .exec(function(err_1, result_1) {
                        if(err_1) {
                           resolveNotify('Error');
                        } else {
                           if(result_1.Reports_To !== null) {
                              reports_id = result_1.Reports_To;
                              console.log(reports_id, '123');
                              new NotificationModel.NotifySchema({
                                 Notification_Id: mongoose.Types.ObjectId(result._id),
                                 Company_Id: mongoose.Types.ObjectId(result.Company_Id),
                                 User_Id: mongoose.Types.ObjectId(reports_id),
                                 If_Read: false,
                                 If_Notify: false,
                                 Read_Date: null,
                                 Notify_Date: null
                              }).save(function(err_2, result_2) {
                                 if(err_2) {
                                    resolveNotify('Error');
                                 } else {
                                    if( index === level-1) { 
                                       resolveNotify('Completed'); 
                                    } else {
                                       resolveNotify('OnGoing');
                                    }
                                 }
                              });
                           } else {
                              if (result_1.User_Type.User_Type && result_1.User_Type.User_Type === 'Sub Admin') {
                                 resolveNotify('Completed');
                              } else {
                                 resolveNotify('Error');
                              }
                           }
                        }
                     });
                  });
               }
             
            } else {
               resolve(true);
            }
         }
      });
   });
}
// CRM Customer List
exports.CrmCustomer_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else {
      CrmModel.CrmCustomerSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {Company_Name: 1, Phone_Number: 1, Email: 1, Website: 1 }, {$sort: { createdAt: -1}})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer List Query Error', 'Customer.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while List the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();            
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }

}

// CRM Customer Simple List
exports.CrmCustomer_SimpleList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else {
      CrmModel.CrmCustomerSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: ReceivingData.Company_Id}, {_id: 1, Company_Name: 1}, {$sort: { createdAt: -1}})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer List Query Error', 'Customer.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while List the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();            
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }

}

// CRM Customer view 
exports.CrmCustomer_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: 400, Message: 'Company Details Cannot be empty'});
   } else {
      CrmModel.CrmCustomerSchema.findOne({_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {}, {})
      .populate({ path: 'Industry_Type', select: ['Industry_Type'] })
      .populate({ path: 'Account_Type', select: ['Account_Type'] })
      .populate({ path: 'Ownership_Type', select: ['Ownership_Type'] })
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer View Query Error', 'Customer.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while View the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}