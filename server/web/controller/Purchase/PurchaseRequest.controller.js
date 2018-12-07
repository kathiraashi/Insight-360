var CryptoJS = require("crypto-js");
var PurchaseModel = require('../../models/Purchase/Purchase.model.js');
var ErrorManagement = require('../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************** Purchase Request **********************************
// Request Number Async Validate
exports.RequestedNumber_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Requested_Number || ReceivingData.Requested_Number === '' ) {
      res.status(400).send({Status: false, Message: "Requested Number cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else {
      PurchaseModel.PurchaseRequestSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Requested_Number': { $regex : new RegExp("^" + ReceivingData.Requested_Number + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Requested Number find Query Error', 'PurchaseRequested.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find 'Requested Number!."});
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
// Request Create
exports.PurchaseRequest_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      var Create_PurchaseRequest = new PurchaseModel.PurchaseRequestSchema({
         Requested_Number: ReceivingData.Requested_Number,
         Requested_Date: ReceivingData.Requested_Date,
         Request_Status: 'Draft',
         Status: 'Draft',
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false,
      });
      Create_PurchaseRequest.save(function(err, result) {
         if(err) {
            console.log(err);
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request!."});
         } else { 
            const itemArray = ReceivingData.items.map(obj => {
               const newObj = {
                  PurchaseRequest_Id: mongoose.Types.ObjectId(result._id),
                  Product_Id: mongoose.Types.ObjectId(obj.Product),
                  Description: obj.Description,
                  Required_Quantity: obj.Required_Quantity,
                  Approved_Quantity: null,
                  Required_Date: obj.Required_Date
               };
               return newObj;
            });
            PurchaseModel.PurchaseRequest_ProductSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
               } else {
                  res.status(200).send({Status: true, Message: "Purchase Request Created Successfully"});
               }
            });
         }
      });
   }
}
// Purchase Request contact list
exports.PurchaseRequest_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, 
      {}, {sort: {createdAt: -1, updatedAt: -1}})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request List Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}
// Purchase Request Approved list
exports.PurchaseRequest_ApprovedList = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema
      .find({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), Status: 'Approved'}, 
      {Requested_Number: 1}, {sort: {createdAt: -1, updatedAt: -1}})
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request List Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });

   }
}
// Purchase Request view 
exports.PurchaseRequest_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.PurchaseRequest_Id || ReceivingData.PurchaseRequest_Id === '') {
      res.status(400).send({Status: false, Message: 'Purchase Request Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema
      .findOne({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {})
      .populate({ path: 'Product_Id'})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request view Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while view the Purchase Request!."});
         } else {
            PurchaseModel.PurchaseRequest_ProductSchema
            .find({PurchaseRequest_Id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)})
            .populate({ path: 'Product_Id', select: ['Product_Name_withAttribute', 'Description']})
            .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request List Query Error', 'PurchaseRequest.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while Listing the Purchase Request!."});
               } else {
                  const Data = {'Purchase_Request_Details': result, 'Product_Details': result_1};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
}
// Request Edit
exports.PurchaseRequest_Edit = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequest_ProductSchema.remove({PurchaseRequest_Id: ReceivingData.PurchaseRequest_Id})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Requested Number find Query Error', 'PurchaseRequested.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find 'Requested Number!."});
         } else {
            const itemArray = ReceivingData.items.map(obj => {
               const newObj = {
                  PurchaseRequest_Id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id),
                  Product_Id: mongoose.Types.ObjectId(obj.Product),
                  Description: obj.Description,
                  Required_Quantity: obj.Required_Quantity,
                  Approved_Quantity: null,
                  Required_Date: obj.Required_Date
               };
               return newObj;
            });
            PurchaseModel.PurchaseRequest_ProductSchema.collection.insert(itemArray, function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
               } else {
                  res.status(200).send({Status: true, Message: "Purchase Request updated Successfully"});
               }
            });
         }
      });
   }
}
// Purchase Request-Approve
exports.PurchaseRequest_RequestApprove = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Waiting for approval', Status: 'Waiting for approval'}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Purchase Request Send to Approval Successfully"});
         }
      });
   }
}
// Purchase Modify
exports.PurchaseRequest_Modification = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Modification', Status: 'Modification'}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Purchase Request Send to Modify Successfully"});
         }
      });
   }
}
// Purchase Cancel
exports.PurchaseRequest_Cancel = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Cancel', Status: 'Cancel', If_Deleted: true}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Purchase Request Cancel Successfully"});
         }
      });
   }
}
// Purchase Reject
exports.PurchaseRequest_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Rejected', Status: 'Rejected'}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Purchase Request Rejected Successfully"});
         }
      });
   }
}
// Purchase Cancel Approval
exports.PurchaseRequest_CancelApproval = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Approval Canceled', Status: 'Approval Canceled'}})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
         } else {
            res.status(200).send({Status: true, Message: "Purchase Request Canceled Successfully"});
         }
      });
   }
}
// Purchase Approve
exports.PurchaseRequest_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '') {
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else  if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else {
      PurchaseModel.PurchaseRequest_ProductSchema.remove({PurchaseRequest_Id: ReceivingData.PurchaseRequest_Id})
      .exec(function(err, result) {
         if (err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Requested Number find Query Error', 'PurchaseRequested.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find 'Requested Number!."});
         } else {
            PurchaseModel.PurchaseRequestSchema.update({If_Deleted: false, Active_Status: true, Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id), _id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, {$set: {Request_Status: 'Approved', Status: 'Approved'}})
            .exec(function(err_1, result_1) {
               if (err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
               } else {
                  const itemArray = ReceivingData.items.map(obj => {
                     const newObj = {
                        PurchaseRequest_Id: mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id),
                        Product_Id: mongoose.Types.ObjectId(obj.Product),
                        Description: obj.Description,
                        Required_Quantity: obj.Required_Quantity,
                        Approved_Quantity: obj.Approved_Quantity,
                        Required_Date: obj.Required_Date
                     };
                     return newObj;
                  });
                  PurchaseModel.PurchaseRequest_ProductSchema.collection.insert(itemArray, function(err_2, result_2) {
                     if(err_2) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Product Creation Query Error', 'PurchaseRequest.controller.js');
                        res.status(417).send({Status: false, Message: "Some error occurred while creating the Purchase Request Product!."});
                     } else {
                        res.status(200).send({Status: true, Message: "Purchase Request Approved Successfully"});
                     }
                  });
               }
            });
         }
      });
   }
}
