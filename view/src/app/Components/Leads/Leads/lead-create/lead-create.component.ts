import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { CallScheduleLeadComponent } from '../../../../models/Leads/call-schedule-lead/call-schedule-lead.component';
import { LogPhoneCallLeadComponent } from '../../../../models/Leads/log-phone-call-lead/log-phone-call-lead.component';

import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LeadsService } from './../../../../services/Leads/leads.service';
import { ProductService } from './../../../../services/Product/product.service';
import { LeadsSettingsService } from './../../../../services/settings/leadsSettings/leads-settings.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {
   Active_Tab = 'Log_Phone_Call';
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;

   AllCountry: any[];
   AllStateOfCountry: any[];
   AllCityOfState:  any[];

   _Product: any[] =  [];
   _LeadSource: any[] =  [];
   _Priority: any[] =  ['High', 'Medium', 'Low'];
   _Employee: any[] =  ['employee-1', 'employee-2', ' employee-3', 'employee-4'];
   Loader: Boolean = true;
   bsModalRef: BsModalRef;
   Form: FormGroup;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public form_builder: FormBuilder,
      public Leads_Service: LeadsService,
      private Product_Service: ProductService,
      private Lead_Setting_Service: LeadsSettingsService,
      private Login_Service: LoginService,
      public Admin_Service: AdminService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // SubModule Permissions
      const Permissions = this.PermissionCheck.SubModulePermissionValidate('Settings_Product_Settings');
      if (Permissions['Status']) {
         this._Create = Permissions['Create_Permission'];
         this._View = Permissions['View_Permission'];
         this._Edit = Permissions['Edit_Permission'];
         this._Delete = Permissions['Delete_Permission'];
      }

      // Get Product List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Product_Service.Product_Simple_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Product = DecryptedData;
            this.Loader = (this._Product) ? false : true;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get Lead Source
      this.Lead_Setting_Service.Lead_Source_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._LeadSource = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
       // Get country List
       this.Admin_Service.Country_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.AllCountry = DecryptedData;
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
         Email: new FormControl(null),
         Phone: new FormControl(null, {
            validators: Validators.required,
            asyncValidators: [this.Phone_AsyncValidators.bind(this) ],
            updateOn: 'blur'
         }),
         Lead_Source: new FormControl(null),
         Priority: new FormControl(null),
         Product: new FormControl(null, Validators.required),
         Assign_To: new FormControl(null),
         Street: new FormControl('', Validators.required),
         Area: new FormControl('', Validators.required),
         Country: new FormControl(null, Validators.required),
         State: new FormControl(null, Validators.required),
         City: new FormControl(null, Validators.required),
         ZipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   // validate phone number exits
   Phone_AsyncValidators(control: AbstractControl) {
      const Data = { Phone : control.value, Company_Id : this.Company_Id, User_Id : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Leads_Service.Phone_AsyncValidators({'Info' : Info}).pipe(map(response => {
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
      this.Form.controls['City'].setValue(null);
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name ;
   }

   CreateCallSchedule() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(CallScheduleLeadComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   CreateLogPhoneCall() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(LogPhoneCallLeadComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }

   CreateNewLeadSource = (Lead_Value) => {
      console.log(Lead_Value);
      // const tempArr = this._LeadSource.map(obj => obj);
      console.log(this._LeadSource);

      return new Promise( (resolve) => {
         setTimeout(() => {
            alert('123');
            resolve({_id: '123', Lead_Source: Lead_Value, valid: true});
         }, 1000);
      });
   }
   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Leads_Service.Leads_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.router.navigate(['/List_leads']);
               this.Loader = false;
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Loader = false;
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Loader = false;
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Loader = false;
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
         });
      }
   }


}
