import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-bank-accountsettings',
  templateUrl: './model-bank-accountsettings.component.html',
  styleUrls: ['./model-bank-accountsettings.component.css']
})
export class ModelBankAccountsettingsComponent implements OnInit {
   _Data: Object;
   _Account_Type: any[] = ['Savings', 'Current', 'Fixed Deposite'];
  _Accounts_Info: Object;

   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   constructor( public bsModalRef: BsModalRef,
      private Toastr: ToastrService,
      public Service: AccountSettingsService,
   ) {}


  ngOnInit() {
   this.onClose = new Subject();

   if (this._Data['Type'] === 'Create' || 'Edit') {

      this.Form = new FormGroup({
         Bank_Name: new FormControl('', Validators.required),
         Account_Name: new FormControl('', Validators.required),
         Account_Type: new FormControl(null, Validators.required),
         Account_No: new FormControl('', Validators.required),
         IFSC_Code: new FormControl('', Validators.required),
         Address: new FormControl(''),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
      });
   }
   if (this._Data['Type'] === 'View') {
      this._Accounts_Info = this._Data['Accounts_Info'];
   }
}
onSubmit() {
   if (this._Data['Type'] === 'Create') {
      this.submit();
   }
   if (this._Data['Type'] === 'Edit') {
      this.update();
   }
}

 Bank_AsyncValidate( control: AbstractControl ) {
  const Data = { Account_No: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
  Info = Info.toString();
  return this.Service.Bank_AsyncValidate({'Info': Info}).pipe(map( response => {
     const ReceivingData = JSON.parse(response['_body']);
     if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
        return null;
     } else {
        return { Bank_NotAvailable: true };
     }
  }));
}

 // submit Bank
  submit() {
      if (this.Form.valid && !this.Uploading ) {
        this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Bank_Create({'Info': Info}).subscribe(response => {
          this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Bank Details Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
              this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
              this.onClose.next({ Status: false, Message: 'Bad Request Error'});
              this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
              this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
         } else {
              this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Bank!'} );
               this.onClose.next({Status: false, Message: 'UnExpected Error'});
               this.bsModalRef.hide();

           }
         });
      }
   }
// update
   update() {
      if (this.Form.valid) {
        this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Bank_Update({'Info': Info}).subscribe(response => {
          this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Bank Details Successfully Updated'} );
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
              this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
              this.onClose.next({ Status: false, Message: 'Bad Request Error'});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
              this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
           }  else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Bank!' });
               this.onClose.next({Status: false, Message: 'UnExpected Error'});
               this.bsModalRef.hide();
               console.log(ReceivingData);

            }
         });
      }
     }

}

