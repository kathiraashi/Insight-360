import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';

@Component({
  selector: 'app-model-bank-accountsettings',
  templateUrl: './model-bank-accountsettings.component.html',
  styleUrls: ['./model-bank-accountsettings.component.css']
})
export class ModelBankAccountsettingsComponent implements OnInit {
  onClose: Subject<any>;
  Type: String;
  Data;
  Form: FormGroup;
  constructor(  public bsModalRef: BsModalRef,
                public Service: AccountSettingsService
              ) {}


  ngOnInit() {
    this.onClose = new Subject();
    if (this.Type === 'Create') {
    this.Form = new FormGroup({
      Bank_Name: new FormControl('', Validators.required),
      Account_Name: new FormControl('', Validators.required),
      Account_No: new FormControl('', Validators.required),
      IFSC_Code: new FormControl('', Validators.required),
      Address: new FormControl(''),
      Company_Id: new FormControl('1', Validators.required),
      Created_By: new FormControl('2', Validators.required)
    });
  }
  if (this.Type === 'Edit') {
    this.Form = new FormGroup({
      Bank_Name: new FormControl('', Validators.required),
      Bank_Id: new FormControl(this.Data._id, Validators.required),
      Account_Name: new FormControl('', Validators.required),
      Account_No: new FormControl('', Validators.required),
      IFSC_Code: new FormControl('', Validators.required),
      Address: new FormControl(''),
      Modified_By: new FormControl('2', Validators.required)
    });
  }
  }
// onsubmit
  onSubmit() {
    if (this.Type === 'Create') {
       this.submit();
    }
    if (this.Type === 'Edit') {
       this.update();
    }
 }

 // submit
  submit() {
      if (this.Form.valid) {
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Bank_Create({'Info': Info}).subscribe(response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 && !ReceivingData.Status) {
               this.onClose.next({ Status: false, Message: 'Bad Request Error'});
               this.bsModalRef.hide();
            } else if (response['status'] === 417 && !ReceivingData.Status) {
               this.onClose.next({ Status: false, Message: 'Query Error'});
               this.bsModalRef.hide();
            } else {
               this.onClose.next({Status: false, Message: 'UnExpected Error'});
               this.bsModalRef.hide();
               console.log(ReceivingData);

           }
         });
      }
   }
// update
   update() {
      if (this.Form.valid) {
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Bank_Update({'Info': Info}).subscribe(response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 && !ReceivingData.Status) {
               this.onClose.next({ Status: false, Message: 'Bad Request Error'});
               this.bsModalRef.hide();
            } else if (response['status'] === 417 && !ReceivingData.Status) {
               this.onClose.next({ Status: false, Message: 'Query Error'});
               this.bsModalRef.hide();
            } else {
               this.onClose.next({Status: false, Message: 'UnExpected Error'});
               this.bsModalRef.hide();
               console.log(ReceivingData);

            }
         });
      }
     }

}

