import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';


import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap';
import { CompanySettingsService } from './../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-contactinfo-companysettings',
  templateUrl: './model-contactinfo-companysettings.component.html',
  styleUrls: ['./model-contactinfo-companysettings.component.css']
})
export class ModelContactinfoCompanysettingsComponent implements OnInit {

   _Data: Object;
   _Departments: any[] = [];
   _Branches: any[] = [];
   _Contact_Info: Object;
   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   constructor  (  public bsModalRef: BsModalRef,
      public Service: CompanySettingsService,
      public Toastr: ToastrService,
 ) {

  }


  ngOnInit() {
   this.onClose = new Subject();

    if (this._Data['Type'] === 'Create' || 'Edit') {
      // Departments Simple List
      const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Departments_Simple_List({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Departments = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Departments Simple List Getting Error!, But not Identify!' });
         }
      });
     this.Service.Branch_Simple_List({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Branches = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Branches Simple List Getting Error!, But not Identify!' });
         }
      });
      this.Form = new FormGroup({
         Contact_Person_Name: new FormControl('', Validators.required),
         Branches: new FormControl(null, Validators.required),
         Departments: new FormControl(null, Validators.required),
         Phone: new FormControl('', Validators.required),
         Email: new FormControl('', Validators.required),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
      });
   }
   if (this._Data['Type'] === 'View') {
      this._Contact_Info = this._Data['_Contact_Info'];
      console.log(this._Contact_Info);
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
      this.Service.Contact_Info_Create({ 'Info': Info }).subscribe( response => {
         this.Uploading = false;
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Contact Info Successfully Created' });
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
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Contact Info Getting Error!, But not Identify!' });
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
         this.Service.Contact_Info_Update({'Info': Info}).subscribe( response => {
         this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Contact Info Successfully Updated'} );
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
            this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
            this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
         }  else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Contact Info!' });
         this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
