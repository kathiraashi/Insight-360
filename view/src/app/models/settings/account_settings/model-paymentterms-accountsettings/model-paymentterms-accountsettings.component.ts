import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap';

import * as CryptoJS from 'crypto-js';

import { AccountSettingsService } from './../../../../services/settings/AccountSettings/account-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';



@Component({
  selector: 'app-model-paymentterms-accountsettings',
  templateUrl: './model-paymentterms-accountsettings.component.html',
  styleUrls: ['./model-paymentterms-accountsettings.component.css']
})
export class ModelPaymenttermsAccountsettingsComponent implements OnInit {

   onClose: Subject<any>;

  Type: string;
  Data;
  Uploading: Boolean = false;
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';
  Form: FormGroup;
   constructor  (
      public bsModalRef: BsModalRef,
      public Service: AccountSettingsService,
      public Toastr: ToastrService
   ) {}

   ngOnInit() {
      this.onClose = new Subject();

      // If Create Payment Terms
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Payment_Terms: new FormControl('', Validators.required),
               Company_Id: new FormControl(this.Company_Id, Validators.required),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit New Payment Terms
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Payment_Terms: new FormControl(this.Data.Payment_Terms, Validators.required),
               Payment_Terms_Id: new FormControl(this.Data._id, Validators.required),
               Modified_By: new FormControl(this.User_Id, Validators.required)
            });
         }

   }
   // Onsubmit fuction
      onSubmit() {
         if (this.Type === 'Create') {
            this.submit();
         }
         if (this.Type === 'Edit') {
            this.update();
         }
      }

   // Submit New Payment Terms
      submit() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            console.log(Data);
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Payment_Terms_Create({'Info': Info}).subscribe( response => {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Payment Term Successfully Created' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Bad Request Error!'});
                  this.bsModalRef.hide();
               } else if (response['status'] === 417 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Payment Terms Query Error!'});
                  this.bsModalRef.hide();
               } else {
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update New Payment Terms
      update() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Payment_Terms_Update({'Info': Info}).subscribe( response => {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Payment Term Successfully Updated' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Bad Request Error!'});
                  this.bsModalRef.hide();
               } else if (response['status'] === 417 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Payment Terms Query Error!'});
                  this.bsModalRef.hide();
               } else {
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
