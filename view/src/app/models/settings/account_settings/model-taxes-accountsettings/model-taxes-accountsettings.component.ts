import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AccountSettingsService } from './../../../../services/settings/AccountSettings/account-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-taxes-accountsettings',
  templateUrl: './model-taxes-accountsettings.component.html',
  styleUrls: ['./model-taxes-accountsettings.component.css']
})
export class ModelTaxesAccountsettingsComponent implements OnInit {

      _Data: Object;
      _Tax_Scope: any[] = ['Sales', 'Purchase'];
      _Tax_Computation: any[] = [{ Type : 'Type_1', Value : 'Fixed'}, { Type : 'Type_2', Value : 'Percent Of Price'}, { Type : 'Type_3' , Value : 'Percentage Of Tax Included Price'}];
      _Taxes_Info: Object;

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
        Tax_Name: new FormControl('', Validators.required),
        Tax_Scope: new FormControl(null, Validators.required),
        Tax_Computation: new FormControl(null, Validators.required),
        Amount: new FormControl('', Validators.required),
        Notes: new FormControl(''),
        Company_Id: new FormControl(this.Company_Id),
        User_Id: new FormControl(this.User_Id),
     });
  }
  if (this._Data['Type'] === 'View') {
    this._Taxes_Info = this._Data['Taxes_Info'];
    console.log(this._Taxes_Info);
 }
  }

  onSubmit() {
    if (this._Data['Type'] === 'Create') {
       this.Submit();
    }
    if (this._Data['Type'] === 'Edit') {
       this.update();
    }
 }

  Submit() {
    if (this.Form.valid && !this.Uploading) {
       this.Uploading = true;
       let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
       Info = Info.toString();
       this.Service.Taxes_Create({ 'Info': Info }).subscribe( response => {
          this.Uploading = false;
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Taxes Successfully Created' });
             this.onClose.next({Status: true, Response: DecryptedData});
             this.bsModalRef.hide();
          } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
             this.onClose.next({Status: false});
             this.bsModalRef.hide();
          } else if (response['status'] === 401 && !ResponseData['Status']) {
             this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
             this.onClose.next({Status: false});
             this.bsModalRef.hide();
          } else {
             this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Taxes Getting Error!, But not Identify!' });
             this.onClose.next({Status: false});
             this.bsModalRef.hide();
          }
       });
}
  }

  update() {
    if (this.Form.valid) {
     this.Uploading = true;
       const Data = this.Form.value;
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       this.Service.Taxes_Update({'Info': Info}).subscribe( response => {
         this.Uploading = false;
          const ReceivingData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ReceivingData.Status) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Taxes Update Successfully Updated'} );
             this.onClose.next({Status: true, Response: DecryptedData});
             this.bsModalRef.hide();
          } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
           this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
           this.onClose.next({Status: false});
             this.bsModalRef.hide();
          } else if (response['status'] === 401 && !ReceivingData['Status']) {
           this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
        }  else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Taxes Update!' });
         this.onClose.next({Status: false, Message: 'UnExpected Error!'});
             this.bsModalRef.hide();
             console.log(ReceivingData);
          }
       });
    }
 }

}
