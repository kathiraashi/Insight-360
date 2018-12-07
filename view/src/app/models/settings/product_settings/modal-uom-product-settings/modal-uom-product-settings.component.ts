import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';

import { ProductSettingsService } from './../../../../services/settings/ProductSettings/product-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-modal-uom-product-settings',
  templateUrl: './modal-uom-product-settings.component.html',
  styleUrls: ['./modal-uom-product-settings.component.css']
})
export class ModalUomProductSettingsComponent implements OnInit {
   onClose: Subject<any>;

   Type: string;
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Form: FormGroup;
   constructor  ( public bsModalRef: BsModalRef,
      public Service: ProductSettingsService,
      public Toastr: ToastrService
   ) {}

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Expenses type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               UOM: new FormControl('', {
                                                validators: Validators.required,
                                                asyncValidators: [ this.UOM_AsyncValidate.bind(this) ],
                                                updateOn: 'blur' } ),
               Company_Id: new FormControl(this.Company_Id, Validators.required),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit New Expenses type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               UOM: new FormControl(this.Data.UOM, {validators: Validators.required,
                                                                        asyncValidators: [ this.UOM_AsyncValidate.bind(this) ],
                                                                        updateOn: 'blur' } ),
               UOM_Id: new FormControl(this.Data._id, Validators.required),
               Modified_By: new FormControl(this.User_Id, Validators.required)
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
   UOM_AsyncValidate( control: AbstractControl ) {
      const Data = { UOM: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.UOM_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { UOM_NotAvailable: true };
         }
      }));
   }

    // Submit New Expenses Type
    submit() {
      if (this.Form.valid && !this.Uploading) {
       this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.UOM_Create({'Info': Info}).subscribe( response => {
           this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'New Unit Of Measure Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
            }  else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Expenses Type!'} );
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
       this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.UOM_Update({'Info': Info}).subscribe( response => {
           this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Unit Of Measure Type Successfully Updated'} );
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
            }  else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Expenses Type!' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
