import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';

import { CrmService } from './../../../../services/Crm/crm.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-contact-customers-view',
  templateUrl: './model-contact-customers-view.component.html',
  styleUrls: ['./model-contact-customers-view.component.css']
})
export class ModelContactCustomersViewComponent implements OnInit {

   _Title: any[] =  ['Mr.', 'Miss.', 'Mrs.', 'Dr.'];
   _ContactRole: any[] =  [];

   Type: string;
   Data;
   UserType;
   Uploading: Boolean = false;
   Company_Id: any;
   User_Id: any;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   crm_customer_id: any;
   onClose: Subject<{}>;

   constructor(
     public bsModalRef: BsModalRef,
     public Service: CrmService,
     public CrmSetting_Service: CrmSettingsService,
     public Toastr: ToastrService,
     private Login_Service: LoginService,

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Contact role list
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.CrmSetting_Service.Contact_Role_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ContactRole = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({  Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
      });
   }

  ngOnInit() {
   this.onClose = new Subject();
   // If Create New Contact Role
   if (this.Type === 'Create') {
      this.Form = new FormGroup({
         Title: new FormControl(null, Validators.required ),
         Name: new FormControl(null,  {
                                       validators: Validators.required,
                                       asyncValidators: [ this.Name_AsyncValidate.bind(this) ],
                                       updateOn: 'blur' } ),
         Mobile: new FormControl(null,  {
                                       validators: Validators.required,
                                       asyncValidators: [ this.Mobile_AsyncValidate.bind(this) ],
                                       updateOn: 'blur' } ),
         Contact_Role: new FormControl(null, Validators.required ),
         Email: new FormControl(null),
         Job_Position: new FormControl(null),
         crm_customer_id: new FormControl(this.Data, Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         User_Type: new FormControl(this.UserType)
      });
   }
  }
   Name_AsyncValidate( control: AbstractControl ) {
      const Data = { Name: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Name_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Name_NotAvailable: true };
         }
      }));
   }
   Mobile_AsyncValidate( control: AbstractControl ) {
      const Data = { Mobile: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Mobile_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Mobile_NotAvailable: true };
         }
      }));
   }

   Submit() {
      if (this.Form.valid) {
         const Data = this.Form.getRawValue();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.CrmContact_Create({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'Contact Successfully Created'});
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417  && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error',  Message: ReceivingData['Message']} );
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Contact !' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
