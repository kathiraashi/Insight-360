import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';

import { CrmService } from './../../../../services/Crm/crm.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
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
  selector: 'app-model-activities-customers-view',
  templateUrl: './model-activities-customers-view.component.html',
  styleUrls: ['./model-activities-customers-view.component.css']
})
export class ModelActivitiesCustomersViewComponent implements OnInit {
   maxDate = new Date();
   _ContactPerson: any[] =  [];
   _ActivityType: any[] =  [];
   _Status: any[] =  [];
   _Priority: any[] =  ['High', 'Medium', 'Low'];

   Type: string;
   Data;
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
   }

   ngOnInit() {
      this.onClose = new Subject();
      // If Create New activities
      if (this.Type === 'Create') {
         this.Form = new FormGroup({
            Date: new FormControl(null, Validators.required ),
            Subject: new FormControl(null, Validators.required ),
            Contact_Person: new FormControl(null, Validators.required ),
            Activity_Type: new FormControl(null, Validators.required ),
            Status: new FormControl(null, Validators.required ),
            Priority: new FormControl(null),
            Description: new FormControl(null, Validators.required),
            crm_customer_id: new FormControl(this.Data, Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
            User_Type: new FormControl(this.User_Type, Validators.required)
         });
       // Get Contact Activities list
       const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       this.CrmSetting_Service.Activity_Type_List({'Info': Info}).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this._ActivityType = DecryptedData;
          } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({  Type: 'Error', Message: response['Message']});
          } else if (response['status'] === 401 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
          } else {
             this.Toastr.NewToastrMessage({Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
          }
       });
       // Get Status list
       this.CrmSetting_Service.Activity_Status_List({'Info': Info}).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this._Status = DecryptedData;
          } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({  Type: 'Error', Message: response['Message']});
          } else if (response['status'] === 401 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
          } else {
             this.Toastr.NewToastrMessage({Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
          }
       });
      // Get Contact Person list
      const CPData = { 'Company_Id' : this.Company_Id, 'crm_customer_id' : this.Data };
      let CPInfo = CryptoJS.AES.encrypt(JSON.stringify(CPData), 'SecretKeyIn@123');
      CPInfo = CPInfo.toString();
      this.Service.CrmContact_SimpleList({'Info': CPInfo}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._ContactPerson = DecryptedData;
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
        }
     });
   }
}
   Submit() {
      if (this.Form.valid && this.Type !== 'View') {
         const Data = this.Form.getRawValue();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.CrmActivities_Create({'Info': Info}).subscribe( response => {
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
