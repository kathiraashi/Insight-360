import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';

import { HrmsSettingsService } from './../../../../services/settings/HrmsSettings/hrms-settings.service';


@Component({
  selector: 'app-model-expensestype-hrmssettings',
  templateUrl: './model-expensestype-hrmssettings.component.html',
  styleUrls: ['./model-expensestype-hrmssettings.component.css']
})
export class ModelExpensestypeHrmssettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;

   Form: FormGroup;
   constructor  (  public bsModalRef: BsModalRef,
                     public Service: HrmsSettingsService
                  ) {}

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Expenses type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Expenses_Type: new FormControl('', Validators.required),
               Company_Id: new FormControl('1', Validators.required),
               Created_By: new FormControl('2', Validators.required),
            });
         }
      // If Edit New Expenses type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Expenses_Type: new FormControl(this.Data.Expenses_Type, Validators.required),
               Expenses_Type_Id: new FormControl(this.Data._id, Validators.required),
               Modified_By: new FormControl('2', Validators.required)
            });
         }
   }

   // onSubmit Function
      onSubmit() {
         if (this.Type === 'Create') {
            this.submit();
         }
         if (this.Type === 'Edit') {
            this.update();
         }
      }

   // Submit New Expenses Type
      submit() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Expenses_Type_Create({'Info': Info}).subscribe( response => {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Bad Request Error!'});
                  this.bsModalRef.hide();
               } else if (response['status'] === 417 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Expenses Type Query Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData.Message, ReceivingData.Error);
               } else {
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData);
               }
            });
         }
      }

   // Update New Expenses Type
      update() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Expenses_Type_Update({'Info': Info}).subscribe( response => {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Bad Request Error!'});
                  this.bsModalRef.hide();
               } else if (response['status'] === 417 && !ReceivingData.Status) {
                  this.onClose.next({Status: false, Message: 'Expenses Type Query Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData.Message, ReceivingData.Error);
               } else {
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData);
               }
            });
         }
      }

}
