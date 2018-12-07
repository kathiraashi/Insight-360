var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var NotificationModel = require('../../models/Notification/Notification.model.js');
var UserManagementModel = require('../../models/Admin/AdminManagement.model.js');


// **************************** CRM Customer *********************************
// Phone Async Validate
exports.Mobile_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Mobile || ReceivingData.Mobile === '' ) {
      res.status(400).send({Status: false, Message: "Mobile number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      CrmModel.CrmContactSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Mobile': { $regex : new RegExp("^" + ReceivingData.Mobile + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Mobile NumberFind Query Error', 'Contact.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Mobile Number!."});
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
// Contact Name Async validate
exports.Name_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: "Phone number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      CrmModel.CrmContactSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Name': { $regex : new RegExp("^" + ReceivingData.Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Name Find Query Error', 'Contact.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Name!."});
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

// create crm contact
exports.CrmContact_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.Name || ReceivingData.Name === '') {
      res.status(400).send({Status: false, Message: 'Name Details cannot be empty'});
   } else  if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === '') {
      res.status(400).send({Status: false, Message: 'Contact Role Details cannot be empty'});
   } else  if(!ReceivingData.Title || ReceivingData.Title === '') {
      res.status(400).send({Status: false, Message: 'Title Details cannot be empty'});
   } else  if(!ReceivingData.Mobile || ReceivingData.Mobile === '') {
      res.status(400).send({Status: false, Message: 'Mobile Details cannot be empty'});
   } else  {
      var Create_CrmContact = new CrmModel.CrmContactSchema({
         Title: ReceivingData.Title,
         Name: ReceivingData.Name,
         Contact_Role: ReceivingData.Contact_Role,
         Email: ReceivingData.Email,
         Mobile: ReceivingData.Mobile,
         Job_Position: ReceivingData.Job_Position,
         crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id),
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmContact.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
         } else {
            CrmModel.CrmContactSchema
            .findOne({ Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), _id: mongoose.Types.ObjectId(result._id)}, 
            {}, {$sort: {createdAt: -1}})
            .populate({ path: 'Contact_Role', select: ['Contact_Role'] })
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Contact.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
                  async function notification() {
                     const output = await notificationCreate('CrmContact', result._id, 'Contact', 'Create', result.Company_Id, result.Created_By, ReceivingData.User_Type);
                  }
                  notification();
               }
            });   

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
// crm contact list
exports.CrmContact_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'Crm Customer Details cannot be empty'});
   } else {
      CrmModel.CrmContactSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id)}, 
      {}, {$sort: {createdAt: -1}})
      .populate({ path: 'Contact_Role', select: ['Contact_Role'] })
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}

// crm contact simple list
exports.CrmContact_SimpleList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'Crm Customer Details cannot be empty'});
   } else {
      CrmModel.CrmContactSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id)}, 
      {_id: 1, Name: 1}, {})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact Creat Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}

// crm contact view Note*: currently not used in any section
exports.CrmContact_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'Crm Customer Details cannot be empty'});
   } else if(!ReceivingData.crm_contact_id || ReceivingData.crm_contact_id === '') {
      res.status(400).send({Status: false, Message: 'Crm contact Details cannot be empty'});
   } else {
      CrmModel.CrmContactSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), _id: mongoose.Types.ObjectId(ReceivingData.crm_contact_id)}, {})
      .populate({ path: 'Contact_Role', select: ['Contact_Role'] })
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Contact view Query Error', 'Contact.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while view the Crm Contact!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}