import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css']
})
export class ProductConfigComponent implements OnInit {
   Loader: Boolean = true;
   _List: any[] = [];
   _Create: Boolean = false;
   _Update: Boolean = false;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   constructor(
      private Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,

   ) {// get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Product Configuration List
         const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.ProductConfig_List({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._List = DecryptedData;
               this.Loader = (this._List) ? false : true;
               if (this._List === null) {
                  this._Create = true;
               } else {
                  this._Update = true;
                  this.If_Update();
               }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         Product_Variants: new FormControl('No_ProductVariants', Validators.required),
         Bar_Code: new FormControl('No_BarCode', Validators.required),
         Item_Code: new FormControl('No_ItemCode', Validators.required),
         HSN_Code: new FormControl('No_HSNCode', Validators.required),
         Price_List: new FormControl('No_PriceList', Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Last_Modified_By: new FormControl(this.User_Id, Validators.required)
      });
   }
   BarCodeAndItemCodeDynamic(value) {
      if (value === 'Yes_BarCode') {
         this.Form.controls['Item_Code'].setValue('Yes_ItemCode');
      }
   }
   If_Update() {
      this.Form.addControl('ProductConfig_Id', new FormControl(this._List['_id'], Validators.required));
      this.Form.controls['Product_Variants'].setValue(this._List['Product_Variants']);
      this.Form.controls['Bar_Code'].setValue(this._List['Bar_Code']);
      this.Form.controls['Item_Code'].setValue(this._List['Item_Code']);
      this.Form.controls['HSN_Code'].setValue(this._List['HSN_Code']);
      this.Form.controls['Price_List'].setValue(this._List['Price_List']);
   }
   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.ProductConfig_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Product Config Successfully Created' });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Product Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }

   Update() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.ProductConfig_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Product Config Successfully Update' });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Product Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }

}
