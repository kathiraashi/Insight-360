var CryptoJS = require("crypto-js");
var ProductModel = require('../../models/Product/Product.model.js');
var InventoryModel = require('./../../models/Inventory/Inventory.model.js');
var WareHouseModel = require('./../../models/settings/Inventory_Settings.model')
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// -------------------------------------------------- Product Name Async Validate -----------------------------------------------
exports.Product_Name_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Product_Name || ReceivingData.Product_Name === '' ) {
      res.status(400).send({Status: false, Message: "Product name cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details cannot be empty" });
   }else {
      ProductModel.ProductSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Product_Name': { $regex : new RegExp("^" + ReceivingData.Product_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Name Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Product Name!."});
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

// -------------------------------------------------- Product Name Async Validate -----------------------------------------------
exports.Product_Name_withAttribute_AsyncValidators = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Product_Name_withAttribute || ReceivingData.Product_Name_withAttribute === '' ) {
      res.status(400).send({Status: false, Message: "Product name cannot be empty" });
   } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Company Details cannot be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details cannot be empty" });
   }else {
      ProductModel.ProductSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Product_Name_withAttribute': { $regex : new RegExp("^" + ReceivingData.Product_Name_withAttribute + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Name Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Product Name!."});
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

// -------------------------------------------------- Product Create -----------------------------------------------
exports.Product_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
      res.status(400).send({Status: false, Message: 'User Details cannot be empty'});
   } else if(!ReceivingData.Product_Name || ReceivingData.Product_Name === '' ) {
      res.status(400).send({Status: false, Message: "Product name cannot be empty" });
   } else if(!ReceivingData.UOM && typeof ReceivingData.UOM !== 'object' && Object.keys(ReceivingData.UOM).length <= 0 ) {
      res.status(400).send({Status: false, Message: "Unit Of Measure not be empty" });
   } else {

      if (ReceivingData.UOM && typeof ReceivingData.UOM === 'object' && Object.keys(ReceivingData.UOM).length > 0 ) {
         ReceivingData.UOM = mongoose.Types.ObjectId(ReceivingData.UOM._id);
      }
      if (ReceivingData.Variants_List.length > 0) {
         ReceivingData.Variants_List.map(Obj => {
            Obj.Attribute = mongoose.Types.ObjectId(Obj.Attribute._id);
            return Obj;
         });
      }
      
      var ProductGroup = new ProductModel.ProductGroupsSchema({
         Product_Name: ReceivingData.Product_Name,
         Can_Be_Sold: ReceivingData.Can_Be_Sold,
         Can_Be_Purchased: ReceivingData.Can_Be_Purchased,
         Item_Code: ReceivingData.Item_Code,
         HSN_Code: ReceivingData.HSN_Code,
         Price: ReceivingData.Price,
         Product_Type: ReceivingData.Product_Type,
         UOM: ReceivingData.UOM,
         Description: ReceivingData.Description,
         Variants: ReceivingData.Variants_List,
         Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Create_At: new Date,
         Update_At: new Date,
         Active_Status: true,
         If_Deleted: false
      });
      
      ProductGroup.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Group Creation Query Error', 'Product.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});            
         } else {
            const output = [];
            if (result.Variants.length <= 0) {
               const Obj = {  ProductGroup_Id: mongoose.Types.ObjectId(result._id),
                              Product_Name: result.Product_Name,
                              Product_Name_withAttribute: result.Product_Name,
                              Can_Be_Sold: result.Can_Be_Sold,
                              Can_Be_Purchased: result.Can_Be_Purchased,
                              Price: result.Price,
                              Product_Type: result.Product_Type,
                              Item_Code: result.Item_Code,
                              HSN_Code: result.HSN_Code,
                              Bar_Code: result.Item_Code,
                              UOM: mongoose.Types.ObjectId(result.UOM),
                              Description: result.Description,
                              Variants: [],
                              Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                              Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                              Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                              Create_At: new Date,
                              Update_At: new Date,
                              Active_Status: true,
                              If_Deleted: false
               };
               output.push(Obj);
            } else {
               function* cartesian(head, ...tail) {
                  const remainder = tail.length > 0 ? cartesian(...tail) : [[]];
                  for (let r of remainder) for (let h of head) yield [h, ...r];
               }
               for (let product of cartesian(...result.Variants.map(i => i.Attribute_Values))) {
                  const part = { ProductGroup_Id: mongoose.Types.ObjectId(result._id),
                                 Product_Name: result.Product_Name,
                                 Product_Name_withAttribute: result.Product_Name,
                                 Can_Be_Sold: result.Can_Be_Sold,
                                 Can_Be_Purchased: result.Can_Be_Purchased,
                                 Price: result.Price,
                                 Product_Type: result.Product_Type,
                                 Item_Code: result.Item_Code,
                                 HSN_Code: result.HSN_Code,
                                 Bar_Code: result.Item_Code,
                                 UOM: mongoose.Types.ObjectId(result.UOM),
                                 Description: result.Description,
                                 Variants: [],
                                 Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
                                 Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                                 Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                                 Create_At: new Date,
                                 Update_At: new Date,
                                 Active_Status: true,
                                 If_Deleted: false
                  };
                  let i = 0;
                  for (i = 0; i < product.length; i++) {
                     part.Product_Name_withAttribute = part.Product_Name_withAttribute + ' ' + product[i];
                     const Obj = { Attribute: mongoose.Types.ObjectId(result.Variants[i].Attribute),
                                    Attribute_Value: product[i],
                                 };
                        part.Variants.push(Obj);
                  }
                  output.push(part);
               }
            }
            ProductModel.ProductSchema.collection.insert(output, function(err_1, result_1){
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Creation Query Error', 'Product.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});
               } else {
                  if(result.Product_Type === 'Type_2') {
                     WareHouseModel.WareHouseSchema.find({Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id)}, {_id: 1})
                     .exec(function(WHErr, WHResult) {
                        if(WHErr) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Creation Query Error', 'Product.controller.js', err_1);
                           res.status(400).send({Status: false, Message: "Some error occurred while finding the warehouse!."});
                        } else {
                           const stockArray = [];
                           result_1.ops.map(obj => {
                              WHResult.map(x => {
                                const newObj = {
                                 Product_Id : mongoose.Types.ObjectId(obj._id),
                                 WareHouse_Id : mongoose.Types.ObjectId(x._id),
                                 End_Quantity : 0,
                                 Reference_Key : 'Product Create',
                                 Company_Id : mongoose.Types.ObjectId(obj.Company_Id),
                                 Created_By : mongoose.Types.ObjectId(obj.Created_By),
                                 Last_Modified_By : mongoose.Types.ObjectId(obj.Created_By),
                                 Active_Status : true,
                                 If_Deleted : false
                                }
                                stockArray.push(newObj);
                              });
                           });
                           console.log(stockArray);
                           InventoryModel.Inventory_StockDetailsSchema.collection.insert(stockArray, function(StockErr, StockResult) {
                              if(StockErr) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Inventory Stock Creation Query Error', 'Product.controller.js');
                                 res.status(417).send({Status: false, Message: "Some error occurred while creating the Inventory Stock!."});
                              } else {
                                 res.status(200).send({Status: true, Message: 'New Product Successfully Created'});
                              }
                           });
                        }
                     });
                  } else {
                     res.status(200).send({Status: true, Message: 'New Product Successfully Created'});
                  }
               }
            });

         }
      });
   }
};

// -------------------------------------------------- Product List -----------------------------------------------
exports.Product_List = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      ProductModel.ProductSchema
         .find({ If_Deleted: false, Company_Id: ReceivingData.Company_Id }, {}, {sort: { ProductGroup_Id: -1 }}) 
         .populate({ path: 'UOM', select: ['UOM'] })
         .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product List Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// -------------------------------------------------- Product List filter 'sold' -----------------------------------------------
exports.Product_List_Sold = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      ProductModel.ProductSchema
         .find({ If_Deleted: false, Company_Id: ReceivingData.Company_Id, Can_Be_Sold: true }, {}, {sort: { ProductGroup_Id: -1 }}) 
         .populate({ path: 'UOM', select: ['UOM'] })
         .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product List Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
// -------------------------------------------------- Product List filter 'Purchase' -----------------------------------------------
exports.Product_List_Purchase = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      ProductModel.ProductSchema
         .find({ If_Deleted: false, Company_Id: ReceivingData.Company_Id, Can_Be_Purchased: true }, {}, {sort: { ProductGroup_Id: -1 }}) 
         .populate({ path: 'UOM', select: ['UOM'] })
         .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product List Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// -------------------------------------------------- Product Simple List -----------------------------------------------
exports.Product_Simple_List = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      ProductModel.ProductSchema
         .find({ If_Deleted: false, Company_Id: ReceivingData.Company_Id }, {_id: 1, Product_Name_withAttribute: 1}, {sort: { ProductGroup_Id: -1 }}) 
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product List Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// --------------------------------------------- Product View ------------------------------------------------------
exports.Product_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
      res.status(400).send({Status: false, Message: "Product Details can not be empty" });
   } else {
      ProductModel.ProductSchema
      .findOne({'_id': ReceivingData.Product_Id, 'Company_Id': ReceivingData.Company_Id, If_Deleted: false }, {}, {})
      .populate({ path: 'UOM', select: ['UOM'] })
      .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product View Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product View!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
}

// ------------------------------------- Product update -----------------------------------------------
exports.Product_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
      res.status(400).send({Status: false, Message: 'Company Details cannot be empty'});
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
      res.status(400).send({Status: false, Message: "Product Details can not be empty" });
   } else { 
      ProductModel.ProductSchema
      .findOne({'_id': ReceivingData.Product_Id, 'Company_Id': ReceivingData.Company_Id, If_Deleted: false }, {}, {})
      .populate({ path: 'UOM', select: ['UOM'] })
      .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product View Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Product View!."});
         } else {
            result.Product_Name = ReceivingData.Product_Name;
            result.Product_Name_withAttribute = ReceivingData.Product_Name_withAttribute;
            result.Can_Be_Sold = ReceivingData.Can_Be_Sold;
            result.Can_Be_Purchased = ReceivingData.Can_Be_Purchased;
            result.Price = ReceivingData.Price;
            result.Product_Type = ReceivingData.Product_Type;
            result.Item_Code = ReceivingData.Item_Code;
            result.HSN_Code = ReceivingData.HSN_Code;
            result.Bar_Code = ReceivingData.Item_Code;
            result.UOM =  mongoose.Types.ObjectId(ReceivingData.UOM),
            result.Description = ReceivingData.Description;
            result.Company_Id = mongoose.Types.ObjectId(ReceivingData.Company_Id);
            result.Created_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
            result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
            result.Create_At = new Date;
            result.Update_At = new Date;
            result.Active_Status = true;
            result.If_Deleted = false
            result.save(function(err_1, result_1) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Update Query Error', 'Product.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while Updated the Product Details!."});
               } else {
                  res.status(200).send({Status: true, Message: 'Product Successfully Updated' });
               }
            });
         }

      });

   }

}