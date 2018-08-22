import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CompanySettingsService } from './../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-registrationinfo-companysettings',
  templateUrl: './model-registrationinfo-companysettings.component.html',
  styleUrls: ['./model-registrationinfo-companysettings.component.css']
})
export class ModelRegistrationinfoCompanysettingsComponent implements OnInit {

  _Data: Object;
  _Registration_Types: any[] = [];
  _Registration_Info: Object;

  onClose: Subject<any>;
  Form: FormGroup;

  Uploading: Boolean = false;

  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';

  constructor  (  public bsModalRef: BsModalRef,
    public Service: CompanySettingsService,
    public Toastr: ToastrService
 ) {}

  ngOnInit() {
    this.onClose = new Subject();

    if (this._Data['Type'] === 'Create' || 'Edit') {

      const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Registration_Type_SimpleList({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Registration_Types = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Registration Type Simple List Getting Error!, But not Identify!' });
         }
      });

      this.Form = new FormGroup({
        Registration_Type: new FormControl(null, Validators.required),
        Incorporate_Date: new FormControl('', Validators.required),
        Number: new FormControl('', Validators.required),
        Company_Id: new FormControl(this.Company_Id),
        User_Id: new FormControl(this.User_Id),
     });
  }
  if (this._Data['Type'] === 'View') {
    this._Registration_Info = this._Data['Registration_Info'];
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
       this.Service.Registration_Info_Create({ 'Info': Info }).subscribe( response => {
          this.Uploading = false;
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Registration Info Successfully Created' });
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
             this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Registration Info Getting Error!, But not Identify!' });
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
       this.Service.Registration_Info_Update({'Info': Info}).subscribe( response => {
         this.Uploading = false;
          const ReceivingData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ReceivingData.Status) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Registration Info Successfully Updated'} );
             this.onClose.next({Status: true, Response: DecryptedData});
             this.bsModalRef.hide();
          } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
           this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
           this.onClose.next({Status: false});
             this.bsModalRef.hide();
          } else if (response['status'] === 401 && !ReceivingData['Status']) {
           this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
        }  else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Registration Info!' });
         this.onClose.next({Status: false, Message: 'UnExpected Error!'});
             this.bsModalRef.hide();
          }
       });
    }
 }
}
