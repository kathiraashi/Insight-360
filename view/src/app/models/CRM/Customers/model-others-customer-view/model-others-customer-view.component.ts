import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';

import { CrmService } from './../../../../services/Crm/crm.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CompanySettingsService } from './../../../../services/settings/CompanySettings/company-settings.service';

@Component({
  selector: 'app-model-others-customer-view',
  templateUrl: './model-others-customer-view.component.html',
  styleUrls: ['./model-others-customer-view.component.css']
})
export class ModelOthersCustomerViewComponent implements OnInit {

   Type: string;
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Form: FormGroup;
   crm_customer_id: any;
   onClose: Subject<{}>;
   _RegistrationTypeList: any;

   constructor(
      public bsModalRef: BsModalRef,
      public Service: CrmService,
      public CompanySettings_Service: CompanySettingsService,
      public Toastr: ToastrService
   ) {
       // Get Register Type list
       const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       this.CompanySettings_Service.Registration_Type_List({'Info': Info}).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this._RegistrationTypeList = DecryptedData;
             console.log(this._RegistrationTypeList);
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
   // If Create New others
   if (this.Type === 'Create') {
      this.Form = new FormGroup({
         Registration_Type: new FormControl(null, Validators.required ),
         Number: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-z0-9]*')]),
         crm_customer_id: new FormControl(this.Data, Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   }

   Submit() {
      const Data = this.Form.getRawValue();
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.CrmOthers_Create({'Info': Info}).subscribe( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData.Status) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'Registration Successfully Created'});
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
