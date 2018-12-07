import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';

import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-contact-vendor-view',
  templateUrl: './model-contact-vendor-view.component.html',
  styleUrls: ['./model-contact-vendor-view.component.css']
})
export class ModelContactVendorViewComponent implements OnInit {
   _Title: any[] =  ['Mr.', 'Miss.', 'Mrs.', 'Dr.'];
   Type: string;
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Form: FormGroup;
   crm_customer_id: any;
   onClose: Subject<{}>;
   _ContactData: any;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: PurchaseService,
      public Toastr: ToastrService
   ) {}

   ngOnInit() {
      this.onClose = new Subject();
      // If Create New Contact Role
      if (this.Type === 'Create') {
         this.Form = new FormGroup({
            Title: new FormControl(null, Validators.required ),
            Name: new FormControl(null,  {
                                          validators: Validators.required,
                                          asyncValidators: [ this.Name_AsyncValidate.bind(this) ],
                                          updateOn: 'blur' } ),
            Mobile: new FormControl(null,  {
                                          validators: Validators.required,
                                          asyncValidators: [ this.Mobile_AsyncValidate.bind(this) ],
                                          updateOn: 'blur' } ),
            Email: new FormControl(null),
            Job_Position: new FormControl(null),
            Vendor_Id: new FormControl(this.Data, Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      }
   }
   // Name Async Validator
   Name_AsyncValidate( control: AbstractControl ) {
      const Data = { Name: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Name_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Name_NotAvailable: true };
         }
      }));
   }
   // Mobile4 Number Async Validator
   Mobile_AsyncValidate( control: AbstractControl ) {
      const Data = { Mobile: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Mobile_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Mobile_NotAvailable: true };
         }
      }));
   }
   // Submit the contact form
   Submit() {
      if (this.Form.valid) {
         const Data = this.Form.getRawValue();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.VendorContact_Create({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'Contact Successfully Created'});
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
}
