import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';

import { HrmsSettingsService } from './../../../../services/settings/HrmsSettings/hrms-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-leavetype-hrmssettings',
  templateUrl: './model-leavetype-hrmssettings.component.html',
  styleUrls: ['./model-leavetype-hrmssettings.component.css']
})
export class ModelLeavetypeHrmssettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   _LeaveType: any[] =  ['Paid', 'Unpaid'];
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Form: FormGroup;
   constructor (  public bsModalRef: BsModalRef,
                  public Service: HrmsSettingsService,
                  public Toastr: ToastrService
               ) {}

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Leave type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
                  LeaveType_Name: new FormControl('', {
                  validators: Validators.required,
                  asyncValidators: [ this.LeaveType_AsyncValidate.bind(this) ],
                  updateOn: 'blur' } ),
               Leave_Type: new FormControl(null, Validators.required),
               Company_Id: new FormControl(this.Company_Id, Validators.required),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit New Leave type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               LeaveType_Name: new FormControl(this.Data.LeaveType_Name, {
                  validators: Validators.required,
                  asyncValidators: [ this.LeaveType_AsyncValidate.bind(this) ],
                  updateOn: 'blur' } ),
               Leave_Type: new FormControl(this.Data.Leave_Type, Validators.required),
               Leave_Type_Id: new FormControl(this.Data._id, Validators.required),
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

      LeaveType_AsyncValidate( control: AbstractControl ) {
         console.log(this.Form);
         const Data = { LeaveType_Name: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.LeaveType_AsyncValidate({'Info': Info}).pipe(map( response => {
            if (this.Type === 'Edit' && this.Data.LeaveType_Name === control.value ) {
               return null;
            } else {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
                  return null;
               } else {
                  return { LeaveType_NotAvailable: true };
               }
            }
         }));
      }

   // Submit New Leave Type
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Leave_Type_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'New Leave Type Successfully Created' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage(  {  Type: 'Error',  Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage( {  Type: 'Error',  Message: 'Error Not Identify!, Creating Leave Type!' } );
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData);
               }
            });
         }
      }

   // Update leave type
      update() {
         if (this.Form.valid) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Leave_Type_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success',   Message: 'Leave Type Successfully Updated' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417   && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message']  } );
                  this.onClose.next({Status: false});
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage( {  Type: 'Error',  Message: 'Error Not Identify!, Updating Leave Type!' });
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
                  console.log(ReceivingData);
               }
            });
         }
      }


}
