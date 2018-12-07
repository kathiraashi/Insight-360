import { Component, OnInit } from '@angular/core';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';

import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LeadsService } from './../../../../services/Leads/leads.service';
import { ProductService } from './../../../../services/Product/product.service';
import { LoginService } from './../../../../services/LoginService/login.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-create-log-phone-call',
  templateUrl: './create-log-phone-call.component.html',
  styleUrls: ['./create-log-phone-call.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateLogPhoneCallComponent implements OnInit {
   maxDate = new Date();

   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;

   _Product: any[] =  [];
   _Company: any[] =  [];

   Form: FormGroup;
   toWhom: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Activate_Route: ActivatedRoute,
      public Leads_Service: LeadsService,
      private Product_Service: ProductService,
      private Login_Service: LoginService,

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      this.toWhom = this.Activate_Route.snapshot.paramMap.get('to');
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
      // Get Lead List
      this.Leads_Service.Leads_Simple_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            if (this.toWhom !== null) {
               this._Company = DecryptedData.find(company => company._id === this.toWhom );
            } else {
               this._Company = DecryptedData;

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
         Company_Name: new FormControl(null, Validators.required),
         Date: new FormControl(null, Validators.required),
         Product: new FormControl(null, Validators.required),
         Contact_Person: new FormControl(null, Validators.required),
         Phone: new FormControl(null, Validators.required),
         Email: new FormControl(null),
         Description: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
      if (this.toWhom !== null) {
         this.Form.controls['Company_Name'].setValue(this.toWhom);
      }
   }

   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Leads_Service.LogPhoneCall_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               if (this.toWhom === null) {
                  this.router.navigate(['/List_Log_Phone_call']);
               } else {
                  this.router.navigate(['/View_leads', this.toWhom]);
               }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Log Phone Call Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }

}
