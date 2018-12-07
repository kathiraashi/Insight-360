import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-customers-create',
  templateUrl: './crm-customers-create.component.html',
  styleUrls: ['./crm-customers-create.component.css']
})
export class CrmCustomersCreateComponent implements OnInit {

   Loader: Boolean = true;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Company_Id;
   User_Id;

   _IndustryType: any[] =  [];
   _AccountType: any[] =  [];
   _OwnershipType: any[] =  [];

   AllCountry: any[];
   AllStateOfCountry: any[];
   AllCityOfState:  any[];

   ShopFloorAllCountry: any[];
   ShopFloorAllStateOfCountry: any[];
   ShopFloorAllCityOfState:  any[];

   ShopFloor_State;

   Form: FormGroup;
   User_Info: any;
   User_Type: any;

   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Admin_Service: AdminService,
      public form_builder: FormBuilder,
      private Crm_Service: CrmService,
      private Crm_Setting_Service: CrmSettingsService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // SubModule Permissions
      const Permissions = this.PermissionCheck.SubModulePermissionValidate('Settings_Crm_Settings');
      if (Permissions['Status']) {
         this._Create = Permissions['Create_Permission'];
         this._View = Permissions['View_Permission'];
         this._Edit = Permissions['Edit_Permission'];
         this._Delete = Permissions['Delete_Permission'];
      }

      const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // Get Industry Type List
      this.Crm_Setting_Service.Industry_Type_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._IndustryType = DecryptedData;
            this.Loader = (this._IndustryType) ? false : true;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Industry Type List Getting Error!, But not Identify!' });
         }
      });
      // Get Account Type
      this.Crm_Setting_Service.Account_Type_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._AccountType = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'} );
         }
      });
      // Get Ownership Type List
      this.Crm_Setting_Service.Ownership_Type_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._OwnershipType = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message'] } );
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'});
         }
      });
      // Get country List
      this.Admin_Service.Country_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.AllCountry = DecryptedData;
            this.ShopFloorAllCountry = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Simple List Getting Error!, But not Identify!' });
         }
      });
    }

   ngOnInit() {
      this.Form = new FormGroup({
         Company_Name: new FormControl(null, Validators.required),
         Phone_Number: new FormControl(null,  { validators: Validators.required,
                                                asyncValidators: [this.Phone_AsyncValidators.bind(this)],
                                                updateOn: 'blur' } ),
         Email: new FormControl(null),
         Website: new FormControl(null),
         Industry_Type: new FormControl(null, Validators.required),
         No_Of_Employee: new FormControl(null, Validators.required),
         Account_Type: new FormControl(null, Validators.required),
         Ownership_Type: new FormControl(null, Validators.required),
         Notes: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         User_Type: new FormControl(this.User_Type),
         BillingStreet: new FormControl('', Validators.required),
         BillingArea: new FormControl('', Validators.required),
         BillingCountry: new FormControl(null, Validators.required),
         BillingState: new FormControl(null, Validators.required),
         BillingCity: new FormControl(null, Validators.required),
         BillingZipCode: new FormControl('', Validators.required),
         SameAddresses: new FormControl(false),
         ShopFloorStreet: new FormControl('', Validators.required),
         ShopFloorArea: new FormControl('', Validators.required),
         ShopFloorCountry: new FormControl(null, Validators.required),
         ShopFloorState: new FormControl(null, Validators.required),
         ShopFloorCity: new FormControl(null, Validators.required),
         ShopFloorZipCode: new FormControl('', Validators.required),
      });
   }

   // validate phone number exits
   Phone_AsyncValidators(control: AbstractControl) {
      const Data = { Phone_Number : control.value, Company_Id : this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Crm_Service.Phone_AsyncValidators({'Info' : Info}).pipe(map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Phone_NotAvailable: true };
         }
      }));
   }
   // Billing Address
   BillingCountry_Change() {
      const SelectedCountry = this.Form.controls['BillingCountry'].value;
      if (SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
         const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id, Company_Id : this.Company_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
         this.Admin_Service.State_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.AllStateOfCountry = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
            }
         });
      }
      this.Form.controls['BillingState'].setValue(null);
      this.Form.controls['BillingCity'].setValue(null);
   }

   BillingState_Change() {
      const SelectedState = this.Form.controls['BillingState'].value;
      if ( SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
         const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id, Company_Id : this.Company_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
         this.Admin_Service.City_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.AllCityOfState = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
            }
         });
      }
      this.Form.controls['BillingCity'].setValue(null);
   }

   ShopFloorCountry_Change() {
      const SelectedCountry = this.Form.controls['ShopFloorCountry'].value;
      if (!this.Form.controls['SameAddresses'].value && SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
         const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id, Company_Id : this.Company_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
         this.Admin_Service.State_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.ShopFloorAllStateOfCountry = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
            }
         });
      }
      if (!this.Form.controls['SameAddresses'].value) {
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
      }
   }

   ShopFloorState_Change() {
      const SelectedState = this.Form.controls['ShopFloorState'].value;
      if ( !this.Form.controls['SameAddresses'].value && SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
         const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id, Company_Id : this.Company_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
         this.Admin_Service.City_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.ShopFloorAllCityOfState = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
            }
         });
      }
      if (!this.Form.controls['SameAddresses'].value) {
         this.Form.controls['ShopFloorCity'].setValue(null);
      }
   }
   SameAddresses_Change() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['ShopFloorStreet'].setValue(this.Form.controls['BillingStreet'].value);
         this.Form.controls['ShopFloorArea'].setValue(this.Form.controls['BillingArea'].value);
         this.Form.controls['ShopFloorCountry'].setValue(this.Form.controls['BillingCountry'].value);
         this.ShopFloorAllStateOfCountry = this.AllStateOfCountry;
         setTimeout(() => {
            this.Form.controls['ShopFloorState'].setValue(this.Form.controls['BillingState'].value);
         }, 100);
         this.ShopFloorAllCityOfState = this.AllCityOfState;
         setTimeout(() => {
            this.Form.controls['ShopFloorCity'].setValue(this.Form.controls['BillingCity'].value);
         }, 100);
         this.Form.controls['ShopFloorZipCode'].setValue(this.Form.controls['BillingZipCode'].value);
         setTimeout(() => {
            this.Form.controls['ShopFloorStreet'].disable();
            this.Form.controls['ShopFloorArea'].disable();
            this.Form.controls['ShopFloorCountry'].disable();
            this.Form.controls['ShopFloorState'].disable();
            this.Form.controls['ShopFloorCity'].disable();
            this.Form.controls['ShopFloorZipCode'].disable();
         }, 100);
      } else {
         this.Form.controls['ShopFloorStreet'].enable();
         this.Form.controls['ShopFloorArea'].enable();
         this.Form.controls['ShopFloorCountry'].enable();
         this.Form.controls['ShopFloorState'].enable();
         this.Form.controls['ShopFloorCity'].enable();
         this.Form.controls['ShopFloorZipCode'].enable();
         this.Form.controls['ShopFloorStreet'].setValue('');
         this.Form.controls['ShopFloorArea'].setValue('');
         this.Form.controls['ShopFloorCountry'].setValue(null);
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
         this.Form.controls['ShopFloorZipCode'].setValue('');
      }
   }

   BillingAddressAny_Changes() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['SameAddresses'].setValue(false);
         this.Form.controls['ShopFloorStreet'].enable();
         this.Form.controls['ShopFloorArea'].enable();
         this.Form.controls['ShopFloorCountry'].enable();
         this.Form.controls['ShopFloorState'].enable();
         this.Form.controls['ShopFloorCity'].enable();
         this.Form.controls['ShopFloorZipCode'].enable();
         this.Form.controls['ShopFloorStreet'].setValue('');
         this.Form.controls['ShopFloorArea'].setValue('');
         this.Form.controls['ShopFloorCountry'].setValue(null);
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
         this.Form.controls['ShopFloorZipCode'].setValue('');
      }
   }
   // Create
   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmCustomer_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Crm_Customers_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Customer Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }
}
