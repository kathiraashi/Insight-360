import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-inventory-config',
  templateUrl: './inventory-config.component.html',
  styleUrls: ['./inventory-config.component.css']
})
export class InventoryConfigComponent implements OnInit {

   Loader: Boolean = true;
   _List: any[] = [];
   _Create: Boolean = false;
   _Update: Boolean = false;
   User_Info: any;
   Company_Id;
   User_Id;
   User_Type: any;
   Form: FormGroup;
   constructor(
      private Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public Login_Service: LoginService,
   ) {
      // get user login info
     this.User_Info = this.Login_Service.LoggedUserInfo();
     this.Company_Id = this.User_Info.Company_Id;
     this.User_Id = this.User_Info._id;
     this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Inventory Configuration Configuration
      // Get Purchase Configuration List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.InventoryConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
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
         Multiple_Warehouse: new FormControl('No', Validators.required),
         Sales_Update_Stock_by: new FormControl('Delivery_Order', Validators.required),
         Sales_Create_Back_Order: new FormControl('No', Validators.required),
         Purchase_Update_Stock_by: new FormControl('To_Receive', Validators.required),
         Purchase_Create_Back_Order: new FormControl('No', Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Last_Modified_By: new FormControl(this.User_Id, Validators.required)
      });
   }
   If_Update() {
      this.Form.addControl('InventoryConfig_Id', new FormControl(this._List['_id'], Validators.required));
      this.Form.controls['Multiple_Warehouse'].setValue(this._List['Multiple_Warehouse']);
      this.Form.controls['Sales_Update_Stock_by'].setValue(this._List['Sales_Update_Stock_by']);
      this.Form.controls['Sales_Create_Back_Order'].setValue(this._List['Sales_Create_Back_Order']);
      this.Form.controls['Purchase_Update_Stock_by'].setValue(this._List['Purchase_Update_Stock_by']);
      this.Form.controls['Purchase_Create_Back_Order'].setValue(this._List['Purchase_Create_Back_Order']);
   }
   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.InventoryConfig_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Crm Getting Error!, But not Identify!' });
            }
         });
      }
   }
   Update() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.InventoryConfig_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Crm Getting Error!, But not Identify!' });
            }
         });
      }
   }


}
