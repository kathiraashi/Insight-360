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

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-model-reminders-customers-view',
  templateUrl: './model-reminders-customers-view.component.html',
  styleUrls: ['./model-reminders-customers-view.component.css']
})
export class ModelRemindersCustomersViewComponent implements OnInit {
   minDate = new Date();
   _ContactPerson: any[] =  [];
   _ActivityType: any[] =  [];
   _Status: any[] =  [];
   _Priority: any[] =  ['High', 'Medium', 'Low'];

   Type: string;
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Form: FormGroup;
   crm_customer_id: any;
   onClose: Subject<{}>;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: CrmService,
      public CrmSetting_Service: CrmSettingsService,
      public Toastr: ToastrService
   ) { }

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
         this.Service.CrmReminders_Create({'Info': Info}).subscribe( response => {
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
