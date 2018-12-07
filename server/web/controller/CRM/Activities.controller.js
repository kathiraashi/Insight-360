var CryptoJS = require("crypto-js");
var CrmModel = require('../../models/CRM/Crm.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var NotificationModel = require('../../models/Notification/Notification.model.js');
var UserManagementModel = require('../../models/Admin/AdminManagement.model.js');

// ************************************ Crm Activities ********************************************
// Crm Activities Create
exports.CrmActivities_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else if(!ReceivingData.Date || ReceivingData.Date === '') {
      res.status(400).send({Status: false, Message: 'Date Details Cannot be empty'});
   } else if(!ReceivingData.Subject || ReceivingData.Subject === '') {
      res.status(400).send({Status: false, Message: 'Subject Details Cannot be empty'});
   } else if(!ReceivingData.Contact_Person || ReceivingData.Contact_Person === '') {
      res.status(400).send({Status: false, Message: 'Contact Person Details Cannot be empty'});
   } else if(!ReceivingData.Description || ReceivingData.Description === '') {
      res.status(400).send({Status: false, Message: 'Description Details Cannot be empty'});
   } else if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '') {
      res.status(400).send({Status: false, Message: 'Activity Type Details Cannot be empty'});
   } else if(!ReceivingData.Status || ReceivingData.Status === '') {
      res.status(400).send({Status: false, Message: 'Status Details Cannot be empty'});
   } else {
      var Create_CrmActivities = new CrmModel.CrmActivitiesSchema({
         Date: ReceivingData.Date,
         Subject: ReceivingData.Subject,
         Contact_Person: mongoose.Types.ObjectId(ReceivingData.Contact_Person),
         Activity_Type: mongoose.Types.ObjectId(ReceivingData.Activity_Type),
         Status: mongoose.Types.ObjectId(ReceivingData.Status),
         Priority: ReceivingData.Priority,
         Description: ReceivingData.Description,
         crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id),
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_CrmActivities.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activities Creation Query Error', 'Activities.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Activities!."});
         } else {
            CrmModel.CrmActivitiesSchema.findOne({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id), _id: mongoose.Types.ObjectId(result._id)},
            {},{})
            .populate({ path: 'Contact_Person', select: ['Name']})
            .populate({ path: 'Activity_Type', select: ['Activity_Type']})
            .populate({ path: 'Status', select: ['Activity_Status']})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Activities Find Query Error', 'Activities.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Activities!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
                  async function notification() {
                     const output = await notificationCreate('CrmActivities', result._id, 'Activity', 'Create', result.Company_Id, result.Created_By, ReceivingData.User_Type);
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
// Crm Activities List
exports.CrmActivities_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details Cannot be empty'});
   } else if(!ReceivingData.crm_customer_id || ReceivingData.crm_customer_id === '') {
      res.status(400).send({Status: false, Message: 'crm customer Details Cannot be empty'});
   } else {
         CrmModel.CrmActivitiesSchema
         .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), crm_customer_id: mongoose.Types.ObjectId(ReceivingData.crm_customer_id)},
         {},{$sort: {createdAt: -1}})
         .populate({ path: 'Contact_Person', select: ['Name']})
         .populate({ path: 'Activity_Type', select: ['Activity_Type']})
         .populate({ path: 'Status', select: ['Activity_Status']})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err_1, result_1) {
            if(err_1) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Activities Find Query Error', 'Activities.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Crm Activities!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
   }
}