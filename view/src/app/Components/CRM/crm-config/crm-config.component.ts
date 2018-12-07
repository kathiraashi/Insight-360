import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-config',
  templateUrl: './crm-config.component.html',
  styleUrls: ['./crm-config.component.css'],
})
export class CrmConfigComponent implements OnInit {

   Loader: Boolean = true;
   _List: any[] = [];
   _Create: Boolean = false;
   _Update: Boolean = false;
   showButton: Boolean = true;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;

   _BasedOn: any[] = ['Fiscal', 'Custom'];
   _Date: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
   _Month: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   Form: FormGroup;
   Invoice_Type: string;
   Quote_Type: string;
   Sale_Type: string;
   Invoice_Based_Type: string;
   Quote_Based_Type: string;
   Sale_Based_Type: string;
   updateButton: Boolean = false;
   constructor(
      private Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Configuration List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.Service.CrmConfig_List({'Info': Info}).subscribe(response => {
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
         Add_Name_in_Quote: new FormControl('No', Validators.required),
         Tax: new FormControl('Global', Validators.required),
         Discount: new FormControl('Global', Validators.required),
         Discount_Value: new FormControl('Percent', Validators.required),
         Quote_Ref_Number: new FormControl('Manual', Validators.required),
         Quote_Ref_Number_Prefix: new FormControl(null),
         Quote_Ref_Number_Suffix: new FormControl(null),
         Quote_Ref_Number_Starting: new FormControl(null),
         Quote_Ref_Number_Based: new FormControl(null),
         Quote_Ref_Number_Custom_Date: new FormControl(null),
         Quote_Ref_Number_Custom_Month: new FormControl(null),
         Invoice_Ref_Number: new FormControl('Manual', Validators.required),
         Invoice_Ref_Number_Prefix: new FormControl(null),
         Invoice_Ref_Number_Suffix: new FormControl(null),
         Invoice_Ref_Number_Starting: new FormControl(null),
         Invoice_Ref_Number_Based: new FormControl(null),
         Invoice_Ref_Number_Custom_Date: new FormControl(null),
         Invoice_Ref_Number_Custom_Month: new FormControl(null),
         Customer: new FormControl(false, Validators.required),
         Sale_Ref_Number: new FormControl('Manual', Validators.required),
         Sale_Ref_Number_Prefix: new FormControl(null),
         Sale_Ref_Number_Suffix: new FormControl(null),
         Sale_Ref_Number_Starting: new FormControl(null),
         Sale_Ref_Number_Based: new FormControl(null),
         Sale_Ref_Number_Custom_Date: new FormControl(null),
         Sale_Ref_Number_Custom_Month: new FormControl(null),
         AMC_Invoice: new FormControl('No', Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Last_Modified_By: new FormControl(this.User_Id, Validators.required)
      });
   }
   If_Form_Change() {
      if (this.Form.touched) {
         this.updateButton = true;
      } else {
         this.updateButton = false;
      }
      console.log(this.updateButton);
   }
   If_Update() {
      this.Form.addControl('CrmConfig_Id', new FormControl(this._List['_id'], Validators.required));
      this.Form.controls['Add_Name_in_Quote'].setValue(this._List['Add_Name_in_Quote']);
      this.Form.controls['Tax'].setValue(this._List['Tax']);
      this.Form.controls['Discount'].setValue(this._List['Discount']);
      this.Form.controls['Discount_Value'].setValue(this._List['Discount_Value']);
      this.Form.controls['Quote_Ref_Number'].setValue(this._List['Quote_Ref_Number']);
      this.Form.controls['Invoice_Ref_Number'].setValue(this._List['Invoice_Ref_Number']);
      this.Form.controls['Sale_Ref_Number'].setValue(this._List['Sale_Ref_Number']);
      this.Form.controls['Customer'].setValue(this._List['Customer']);
      this.Form.controls['AMC_Invoice'].setValue(this._List['AMC_Invoice']);

      if (this.Form.controls['Invoice_Ref_Number'].value === 'Auto') {
         this.Invoice_Type = 'Auto';
         this.Form.controls['Invoice_Ref_Number_Prefix'].setValue(this._List['Invoice_Ref_Number_Prefix']);
         this.Form.controls['Invoice_Ref_Number_Suffix'].setValue(this._List['Invoice_Ref_Number_Prefix']);
         this.Form.controls['Invoice_Ref_Number_Starting'].setValue(this._List['Invoice_Ref_Number_Prefix']);
         this.Form.controls['Invoice_Ref_Number_Based'].setValue(this._List['Invoice_Ref_Number_Based']);
         if (this.Form.controls['Invoice_Ref_Number_Based'].value === 'Custom') {
            this.Invoice_Based_Type = 'Custom';
            this.Form.controls['Invoice_Ref_Number_Custom_Date'].setValue(this._List['Invoice_Ref_Number_Custom_Date']);
            this.Form.controls['Invoice_Ref_Number_Custom_Month'].setValue(this._List['Invoice_Ref_Number_Custom_Month']);
         } else {
            this.Invoice_Based_Type = 'Fiscal';
         }
      } else {
         this.Invoice_Type = 'Manual';
      }
      if (this.Form.controls['Quote_Ref_Number'].value === 'Auto') {
         this.Quote_Type = 'Auto';
         this.Form.controls['Quote_Ref_Number_Prefix'].setValue(this._List['Quote_Ref_Number_Prefix']);
         this.Form.controls['Quote_Ref_Number_Suffix'].setValue(this._List['Quote_Ref_Number_Suffix']);
         this.Form.controls['Quote_Ref_Number_Starting'].setValue(this._List['Quote_Ref_Number_Starting']);
         this.Form.controls['Quote_Ref_Number_Based'].setValue(this._List['Quote_Ref_Number_Based']);
         if (this.Form.controls['Quote_Ref_Number_Based'].value === 'Custom') {
            this.Quote_Based_Type = 'Custom';
            this.Form.controls['Quote_Ref_Number_Custom_Date'].setValue(this._List['Quote_Ref_Number_Custom_Date']);
            this.Form.controls['Quote_Ref_Number_Custom_Month'].setValue(this._List['Quote_Ref_Number_Custom_Month']);
         } else {
            this.Quote_Based_Type = 'Fiscal';
         }
      } else {
         this.Quote_Type = 'Manual';
      }
      if (this.Form.controls['Sale_Ref_Number'].value === 'Auto') {
         this.Sale_Type = 'Auto';
         this.Form.controls['Sale_Ref_Number_Prefix'].setValue(this._List['Sale_Ref_Number_Prefix']);
         this.Form.controls['Sale_Ref_Number_Suffix'].setValue(this._List['Sale_Ref_Number_Suffix']);
         this.Form.controls['Sale_Ref_Number_Starting'].setValue(this._List['Sale_Ref_Number_Starting']);
         this.Form.controls['Sale_Ref_Number_Based'].setValue(this._List['Sale_Ref_Number_Based']);
         if (this.Form.controls['Sale_Ref_Number_Based'].value === 'Custom') {
            this.Sale_Based_Type = 'Custom';
            this.Form.controls['Sale_Ref_Number_Custom_Date'].setValue(this._List['Sale_Ref_Number_Custom_Date']);
            this.Form.controls['Sale_Ref_Number_Custom_Month'].setValue(this._List['Sale_Ref_Number_Custom_Month']);
         } else {
            this.Sale_Based_Type = 'Fiscal';
         }
      } else {
         this.Sale_Type = 'Manual';
      }
   }
   QuoteChange(value) {
      if (value === 'Auto') {
         this.Quote_Type = 'Auto';
         this.Form.controls['Quote_Ref_Number_Starting'].setValidators(Validators.required);
         this.Form.controls['Quote_Ref_Number_Based'].setValidators(Validators.required);
      } else {
         this.Quote_Type = 'Manual';
         this.Form.controls['Quote_Ref_Number_Starting'].clearValidators();
         this.Form.controls['Quote_Ref_Number_Based'].clearValidators();
         this.Form.controls['Quote_Ref_Number_Prefix'].setValue(null);
         this.Form.controls['Quote_Ref_Number_Suffix'].setValue(null);
         this.Form.controls['Quote_Ref_Number_Starting'].setValue(null);
         this.Form.controls['Quote_Ref_Number_Based'].setValue(null);
      }
   }
   QuoteChange_Custom(value) {
      if (value === 'Custom') {
         this.Quote_Based_Type = 'Custom';
         this.Form.controls['Quote_Ref_Number_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Quote_Ref_Number_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Quote_Based_Type = 'Fiscal';
         this.Form.controls['Quote_Ref_Number_Custom_Date'].clearValidators();
         this.Form.controls['Quote_Ref_Number_Custom_Month'].clearValidators();
         this.Form.controls['Quote_Ref_Number_Custom_Date'].setValue(null);
         this.Form.controls['Quote_Ref_Number_Custom_Month'].setValue(null);
      }
   }
   InvoiceChange(value) {
      if (value === 'Auto') {
         this.Invoice_Type = 'Auto';
         this.Form.controls['Invoice_Ref_Number_Starting'].setValidators(Validators.required);
         this.Form.controls['Invoice_Ref_Number_Based'].setValidators(Validators.required);
      } else {
         this.Invoice_Type = 'Manual';
         this.Form.controls['Invoice_Ref_Number_Starting'].clearValidators();
         this.Form.controls['Invoice_Ref_Number_Based'].clearValidators();
         this.Form.controls['Invoice_Ref_Number_Prefix'].setValue(null);
         this.Form.controls['Invoice_Ref_Number_Suffix'].setValue(null);
         this.Form.controls['Invoice_Ref_Number_Starting'].setValue(null);
         this.Form.controls['Invoice_Ref_Number_Based'].setValue(null);
      }
   }
   InvoiceChange_Custom(value) {
      if (value === 'Custom') {
         this.Invoice_Based_Type = 'Custom';
         this.Form.controls['Invoice_Ref_Number_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Invoice_Ref_Number_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Invoice_Based_Type = 'Fiscal';
         this.Form.controls['Invoice_Ref_Number_Custom_Date'].clearValidators();
         this.Form.controls['Invoice_Ref_Number_Custom_Month'].clearValidators();
         this.Form.controls['Invoice_Ref_Number_Custom_Date'].setValue(null);
         this.Form.controls['Invoice_Ref_Number_Custom_Month'].setValue(null);
      }
   }
   SaleChange(value) {
      if (value === 'Auto') {
         this.Sale_Type = 'Auto';
         this.Form.controls['Sale_Ref_Number_Starting'].setValidators(Validators.required);
         this.Form.controls['Sale_Ref_Number_Based'].setValidators(Validators.required);
      } else {
         this.Sale_Type = 'Manual';
         this.Form.controls['Sale_Ref_Number_Starting'].clearValidators();
         this.Form.controls['Sale_Ref_Number_Based'].clearValidators();
         this.Form.controls['Sale_Ref_Number_Prefix'].setValue(null);
         this.Form.controls['Sale_Ref_Number_Suffix'].setValue(null);
         this.Form.controls['Sale_Ref_Number_Starting'].setValue(null);
         this.Form.controls['Sale_Ref_Number_Based'].setValue(null);
      }
   }
   SaleChange_Custom(value) {
      if (value === 'Custom') {
         this.Sale_Based_Type = 'Custom';
         this.Form.controls['Sale_Ref_Number_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Sale_Ref_Number_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Sale_Based_Type = 'Fiscal';
         this.Form.controls['Sale_Ref_Number_Custom_Date'].clearValidators();
         this.Form.controls['Sale_Ref_Number_Custom_Month'].clearValidators();
         this.Form.controls['Sale_Ref_Number_Custom_Date'].setValue(null);
         this.Form.controls['Sale_Ref_Number_Custom_Month'].setValue(null);
      }
   }
   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Loader = true;
         this.Service.CrmConfig_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Loader = false;
               this._Create = false;
               this._Update = true;
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Product Config Successfully Created' });
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
         this.updateButton = false;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Loader = true;
         this.Service.CrmConfig_Update({ 'Info': Info }).subscribe( response => {
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
