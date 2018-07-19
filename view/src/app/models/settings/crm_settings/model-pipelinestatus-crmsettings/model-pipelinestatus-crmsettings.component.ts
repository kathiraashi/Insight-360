import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';


@Component({
  selector: 'app-model-pipelinestatus-crmsettings',
  templateUrl: './model-pipelinestatus-crmsettings.component.html',
  styleUrls: ['./model-pipelinestatus-crmsettings.component.css']
})
export class ModelPipelinestatusCrmsettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;

   Form: FormGroup;
   constructor (   public bsModalRef: BsModalRef,
                   public Service: CrmSettingsService
               ) {}

   ngOnInit() {
      this.onClose = new Subject();

         // If Create New Pipeline status
            if (this.Type === 'Create') {
               this.Form = new FormGroup({
                  Pipeline_Status: new FormControl('', Validators.required),
                  Company_Id: new FormControl('1', Validators.required),
                  Created_By: new FormControl('2', Validators.required),
               });
            }
         // If Edit New Pipeline status
            if (this.Type === 'Edit') {
               this.Form = new FormGroup({
                  Pipeline_Status: new FormControl(this.Data.Pipeline_Status, Validators.required),
                  Pipeline_Status_Id: new FormControl(this.Data._id, Validators.required),
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

   // Submit New Pipeline status
      submit() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Pipeline_Status_Create({'Info': Info}).subscribe( response => {
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
                  this.onClose.next({Status: false, Message: 'Pipeline status Query Error!'});
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

   // Update New Pipeline status
      update() {
         if (this.Form.valid) {
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Pipeline_Status_Update({'Info': Info}).subscribe( response => {
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
                  this.onClose.next({Status: false, Message: 'Pipeline status Query Error!'});
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
