import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { AccountSettingsService } from './../../../../services/settings/AccountSettings/account-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-incometype-accountsettings',
  templateUrl: './model-incometype-accountsettings.component.html',
  styleUrls: ['./model-incometype-accountsettings.component.css']
})
export class ModelIncometypeAccountsettingsComponent implements OnInit {

  onClose: Subject<any>;

  Type: String;
  Data;
  Uploading: Boolean = false;
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';
  Form: FormGroup;
  constructor  (  public bsModalRef: BsModalRef,
                  public Service: AccountSettingsService,
                  public Toastr: ToastrService
               ) {}

   ngOnInit() {
      this.onClose = new Subject();

      // If Create Income Type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Income_Type: new FormControl('', {
                                                validators: Validators.required,
                                                asyncValidators: [ this.IncomeType_AsyncValidate.bind(this) ],
                                                updateOn: 'blur' } ),
               Company_Id: new FormControl(this.Company_Id, Validators.required),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit New Income Type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Income_Type: new FormControl(this.Data.Income_Type, {validators: Validators.required,
                                                                    asyncValidators: [ this.IncomeType_AsyncValidate.bind(this) ],
                                                                    updateOn: 'blur' } ),
               Income_Type_Id: new FormControl(this.Data._id, Validators.required),
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

  IncomeType_AsyncValidate( control: AbstractControl ) {
    const Data = { Income_Type: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Service.IncomeType_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { IncomeType_NotAvailable: true };
       }
    }));
 }

   // Submit New Income Type
      submit() {
         if (this.Form.valid && !this.Uploading) {
          this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Income_Type_Create({'Info': Info}).subscribe( response => {
              this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Income Type Type Successfully Created' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417  && !ReceivingData.Status) {
                this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
                this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
           } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Income Type!'} );
            this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update New Income Type
      update() {
         if (this.Form.valid) {
          this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Income_Type_Update({'Info': Info}).subscribe( response => {
              this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Income Type Successfully Updated'} );
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
                this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
              this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Income Type!' });
              this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData);
               }
            });
         }
      }


}
