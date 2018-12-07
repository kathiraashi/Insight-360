import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
   Loader: Boolean = true;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';

   VendorName: String = '';
   PhoneNumber: String = '';
   Email: String = '';
   Website: String = '';

   AllCountry: any[];
   AllStateOfCountry: any[];
   AllCityOfState:  any[];

   SubContractAllCountry: any[];
   SubContractAllStateOfCountry: any[];
   SubContractAllCityOfState:  any[];

   Form: FormGroup;
   showSubContractAddress: Boolean = false;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Admin_Service: AdminService,
      public form_builder: FormBuilder,
      private Purchase_Service: PurchaseService,
   ) {
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
         // Get country List
         this.Admin_Service.Country_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.AllCountry = DecryptedData;
               this.SubContractAllCountry = DecryptedData;
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
         Vendor_Name: new FormControl(null, Validators.required),
         Phone_Number: new FormControl(null,  { validators: Validators.required,
                                                asyncValidators: [this.Phone_AsyncValidators.bind(this)],
                                                updateOn: 'blur' } ),
         Email: new FormControl(null),
         Website: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Street: new FormControl('', Validators.required),
         Area: new FormControl('', Validators.required),
         Country: new FormControl(null, Validators.required),
         State: new FormControl(null, Validators.required),
         City: new FormControl(null, Validators.required),
         ZipCode: new FormControl('', Validators.required),
         If_Subcontract: new FormControl(false),
         SameAddresses: new FormControl(false),
         SubContractStreet: new FormControl(''),
         SubContractArea: new FormControl(''),
         SubContractCountry: new FormControl(null),
         SubContractState: new FormControl(null),
         SubContractCity: new FormControl(null),
         SubContractZipCode: new FormControl(''),
      });
   }
   // validate phone number exits
   Phone_AsyncValidators(control: AbstractControl) {
      const Data = { Phone_Number : control.value, Company_Id : this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Purchase_Service.Phone_AsyncValidators({'Info' : Info}).pipe(map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Phone_NotAvailable: true };
         }
      }));
   }
   // Address
   Country_Change() {
      const SelectedCountry = this.Form.controls['Country'].value;
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
      this.Form.controls['State'].setValue(null);
      this.Form.controls['City'].setValue(null);
   }
   State_Change() {
      const SelectedState = this.Form.controls['State'].value;
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

  SubContractCountry_Change() {
      const SelectedCountry = this.Form.controls['SubContractCountry'].value;
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
               this.SubContractAllStateOfCountry = DecryptedData;
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
         this.Form.controls['SubContractState'].setValue(null);
         this.Form.controls['SubContractCity'].setValue(null);
      }
   }

   SubContractState_Change() {
      const SelectedState = this.Form.controls['SubContractState'].value;
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
               this.SubContractAllCityOfState = DecryptedData;
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
         this.Form.controls['SubContractCity'].setValue(null);
      }
   }

   SameAddresses_Change() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['SubContractStreet'].setValue(this.Form.controls['Street'].value);
         this.Form.controls['SubContractArea'].setValue(this.Form.controls['Area'].value);
         this.Form.controls['SubContractCountry'].setValue(this.Form.controls['Country'].value);
         this.SubContractAllStateOfCountry = this.AllStateOfCountry;
         setTimeout(() => {
            this.Form.controls['SubContractState'].setValue(this.Form.controls['State'].value);
         }, 100);
         this.SubContractAllCityOfState = this.AllCityOfState;
         setTimeout(() => {
            this.Form.controls['SubContractCity'].setValue(this.Form.controls['City'].value);
         }, 100);
         this.Form.controls['SubContractZipCode'].setValue(this.Form.controls['ZipCode'].value);
         setTimeout(() => {
            this.Form.controls['SubContractStreet'].disable();
            this.Form.controls['SubContractArea'].disable();
            this.Form.controls['SubContractCountry'].disable();
            this.Form.controls['SubContractState'].disable();
            this.Form.controls['SubContractCity'].disable();
            this.Form.controls['SubContractZipCode'].disable();
         }, 100);
      } else {
         this.Form.controls['SubContractStreet'].enable();
         this.Form.controls['SubContractArea'].enable();
         this.Form.controls['SubContractCountry'].enable();
         this.Form.controls['SubContractState'].enable();
         this.Form.controls['SubContractCity'].enable();
         this.Form.controls['SubContractZipCode'].enable();
         this.Form.controls['SubContractStreet'].setValue('');
         this.Form.controls['SubContractArea'].setValue('');
         this.Form.controls['SubContractCountry'].setValue(null);
         this.Form.controls['SubContractState'].setValue(null);
         this.Form.controls['SubContractCity'].setValue(null);
         this.Form.controls['SubContractZipCode'].setValue('');
      }
   }

   AddressAny_Changes() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['SameAddresses'].setValue(false);
         this.Form.controls['SubContractStreet'].enable();
         this.Form.controls['SubContractArea'].enable();
         this.Form.controls['SubContractCountry'].enable();
         this.Form.controls['SubContractState'].enable();
         this.Form.controls['SubContractCity'].enable();
         this.Form.controls['SubContractZipCode'].enable();
         this.Form.controls['SubContractStreet'].setValue('');
         this.Form.controls['SubContractArea'].setValue('');
         this.Form.controls['SubContractCountry'].setValue(null);
         this.Form.controls['SubContractState'].setValue(null);
         this.Form.controls['SubContractCity'].setValue(null);
         this.Form.controls['SubContractZipCode'].setValue('');
      }
   }
   // subcotract check
   SubContract() {
      const Status = this.Form.controls['If_Subcontract'].value;
      if (Status) {
         this.Form.controls['SubContractStreet'].setValidators(Validators.required);
         this.Form.controls['SubContractArea'].setValidators(Validators.required);
         this.Form.controls['SubContractCountry'].setValidators(Validators.required);
         this.Form.controls['SubContractState'].setValidators(Validators.required);
         this.Form.controls['SubContractCity'].setValidators(Validators.required);
         this.Form.controls['SubContractZipCode'].setValidators(Validators.required);
         this.showSubContractAddress = true;
      } else {
         this.Form.controls['SubContractStreet'].clearValidators();
         this.Form.controls['SubContractArea'].clearValidators();
         this.Form.controls['SubContractCountry'].clearValidators();
         this.Form.controls['SubContractState'].clearValidators();
         this.Form.controls['SubContractCity'].clearValidators();
         this.Form.controls['SubContractZipCode'].clearValidators();
         this.showSubContractAddress = false;
      }
   }
   // Dynamic Vendor Details
   // DynamicVendorDetailsFill() {
   //    this.Form.controls['Vendor_Name'].setValue(this.VendorName);
   //    this.Form.controls['Phone_Number'].setValue(this.PhoneNumber);
   //    this.Form.controls['Email'].setValue(this.Email);
   //    this.Form.controls['Website'].setValue(this.Website);
   //    this.VendorName = this.Form.controls['Vendor_Name'].value;
   //    this.PhoneNumber =this.Form.controls['Phone_Number'].value;
   //    this.Email = this.Form.controls['Email'].value;
   //    this.Website = this.Form.controls['Website'].value;
   // }
   // Submit the vendor form
   Submit() {
      console.log(this.Form.getRawValue());
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseVendor_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Vendor_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
         });
      }
   }
}

