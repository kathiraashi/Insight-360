import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
   Loader: Boolean = true;
   _List: any[] = [];
   _Create: Boolean = false;
   _Update: Boolean = false;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _BasedOn: any[] = ['Fiscal', 'Custom'];
   _Date: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
   _Month: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   Form: FormGroup;
   Quotation_Type: string;
   Quotation_Based_Type: string;
   Order_Type: string;
   Order_Based_Type: string;
   updateButton: Boolean = true;

   constructor(
      private Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private Login_Service: LoginService,
   ) {
       // get user login info
       this.User_Info = this.Login_Service.LoggedUserInfo();
       this.Company_Id = this.User_Info.Company_Id;
       this.User_Id = this.User_Info._id;
       this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Purchase Configuration List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.PurchaseConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            this.Loader = false;
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
         Purchase_Quotation: new FormControl('Manual', Validators.required),
         Purchase_Quotation_Prefix: new FormControl(null),
         Purchase_Quotation_Suffix: new FormControl(null),
         Purchase_Quotation_Starting: new FormControl(null),
         Purchase_Quotation_Based: new FormControl(null),
         Purchase_Quotation_Custom_Date: new FormControl(null),
         Purchase_Quotation_Custom_Month: new FormControl(null),
         Purchase_Order: new FormControl('Manual', Validators.required),
         Purchase_Order_Prefix: new FormControl(null),
         Purchase_Order_Suffix: new FormControl(null),
         Purchase_Order_Starting: new FormControl(null),
         Purchase_Order_Based: new FormControl(null),
         Purchase_Order_Custom_Date: new FormControl(null),
         Purchase_Order_Custom_Month: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Last_Modified_By: new FormControl(this.User_Id, Validators.required)

      });
   }

   If_Update() {
      this.Form.addControl('PurchaseConfig_Id', new FormControl(this._List['_id'], Validators.required));
      this.Form.controls['Purchase_Quotation'].setValue(this._List['Purchase_Quotation']);
      this.Form.controls['Purchase_Order'].setValue(this._List['Purchase_Order']);

      if (this.Form.controls['Purchase_Quotation'].value === 'Auto') {
         this.Quotation_Type = 'Auto';
         this.Form.controls['Purchase_Quotation_Prefix'].setValue(this._List['Purchase_Quotation_Prefix']);
         this.Form.controls['Purchase_Quotation_Suffix'].setValue(this._List['Purchase_Quotation_Suffix']);
         this.Form.controls['Purchase_Quotation_Starting'].setValue(this._List['Purchase_Quotation_Starting']);
         this.Form.controls['Purchase_Quotation_Based'].setValue(this._List['Purchase_Quotation_Based']);
         if (this.Form.controls['Purchase_Quotation_Based'].value === 'Custom') {
            this.Quotation_Based_Type = 'Custom';
            this.Form.controls['Purchase_Quotation_Custom_Date'].setValue(this._List['Purchase_Quotation_Custom_Date']);
            this.Form.controls['Purchase_Quotation_Custom_Month'].setValue(this._List['Purchase_Quotation_Custom_Month']);
         } else {
            this.Quotation_Based_Type = 'Fiscal';
         }
      } else {
         this.Quotation_Type = 'Manual';
      }
      if (this.Form.controls['Purchase_Order'].value === 'Auto') {
         this.Order_Type = 'Auto';
         this.Form.controls['Purchase_Order_Prefix'].setValue(this._List['Purchase_Order_Prefix']);
         this.Form.controls['Purchase_Order_Suffix'].setValue(this._List['Purchase_Order_Suffix']);
         this.Form.controls['Purchase_Order_Starting'].setValue(this._List['Purchase_Order_Starting']);
         this.Form.controls['Purchase_Order_Based'].setValue(this._List['Purchase_Order_Based']);
         if (this.Form.controls['Purchase_Order_Based'].value === 'Custom') {
            this.Order_Based_Type = 'Custom';
            this.Form.controls['Purchase_Order_Custom_Date'].setValue(this._List['Purchase_Order_Custom_Date']);
            this.Form.controls['Purchase_Order_Custom_Month'].setValue(this._List['Purchase_Order_Custom_Month']);
         } else {
            this.Order_Based_Type = 'Fiscal';
         }
      } else {
         this.Order_Type = 'Manual';
      }
   }

   QuotationChange(value) {
      if (value === 'Auto') {
         this.Quotation_Type = 'Auto';
         this.Form.controls['Purchase_Quotation_Starting'].setValidators(Validators.required);
         this.Form.controls['Purchase_Quotation_Based'].setValidators(Validators.required);
      } else {
         this.Quotation_Type = 'Manual';
         this.Form.controls['Purchase_Quotation_Starting'].clearValidators();
         this.Form.controls['Purchase_Quotation_Based'].clearValidators();
         this.Form.controls['Purchase_Quotation_Prefix'].setValue(null);
         this.Form.controls['Purchase_Quotation_Suffix'].setValue(null);
         this.Form.controls['Purchase_Quotation_Starting'].setValue(null);
         this.Form.controls['Purchase_Quotation_Based'].setValue(null);
      }
   }
   QuotationChange_Custom(value) {
      if (value === 'Custom') {
         this.Quotation_Based_Type = 'Custom';
         this.Form.controls['Purchase_Quotation_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Purchase_Quotation_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Quotation_Based_Type = 'Fiscal';
         this.Form.controls['Purchase_Quotation_Custom_Date'].clearValidators();
         this.Form.controls['Purchase_Quotation_Custom_Month'].clearValidators();
         this.Form.controls['Purchase_Quotation_Custom_Date'].setValue(null);
         this.Form.controls['Purchase_Quotation_Custom_Month'].setValue(null);
      }
   }
   OrderChange(value) {
      if (value === 'Auto') {
         this.Order_Type = 'Auto';
         this.Form.controls['Purchase_Order_Starting'].setValidators(Validators.required);
         this.Form.controls['Purchase_Order_Based'].setValidators(Validators.required);
      } else {
         this.Order_Type = 'Manual';
         this.Form.controls['Purchase_Order_Starting'].clearValidators();
         this.Form.controls['Purchase_Order_Based'].clearValidators();
         this.Form.controls['Purchase_Order_Prefix'].setValue(null);
         this.Form.controls['Purchase_Order_Suffix'].setValue(null);
         this.Form.controls['Purchase_Order_Starting'].setValue(null);
         this.Form.controls['Purchase_Order_Based'].setValue(null);
      }
   }
   OrderChange_Custom(value) {
      if (value === 'Custom') {
         this.Order_Based_Type = 'Custom';
         this.Form.controls['Purchase_Order_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Purchase_Order_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Order_Based_Type = 'Fiscal';
         this.Form.controls['Purchase_Order_Custom_Date'].clearValidators();
         this.Form.controls['Purchase_Order_Custom_Month'].clearValidators();
         this.Form.controls['Purchase_Order_Custom_Date'].setValue(null);
         this.Form.controls['Purchase_Order_Custom_Month'].setValue(null);
      }
   }
   anyChange() {
      if (this.Form.touched) {
         this.updateButton = true;
      }
   }

   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.PurchaseConfig_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Loader = false;
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
         this.Loader = true;
         this.updateButton = false;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.PurchaseConfig_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Loader = false;
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
