import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';

import { CrmService } from './../../../../services/Crm/crm.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-model-confirm-order',
  templateUrl: './model-confirm-order.component.html',
  styleUrls: ['./model-confirm-order.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class ModelConfirmOrderComponent implements OnInit {

   _OrderConfirmBy: any[] =  ['Email', 'Telephonic', 'Po'];

   Type: string;
   Type1: string;
   Data;
   Uploading: Boolean = false;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   onClose: Subject<{}>;
   Form: FormGroup;
   _CrmConfigList: any;
   selectedConfirmType: any;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: CrmService,
      public CrmConfig_Service: ConfigurationService,
      public Toastr: ToastrService,
      private Login_Service: LoginService,

   ) {
       // get user login info
       this.User_Info = this.Login_Service.LoggedUserInfo();
       this.Company_Id = this.User_Info.Company_Id;
       this.User_Id = this.User_Info._id;
       this.User_Type = this.User_Info.User_Type['User_Type'];
       console.log(this.User_Id);
      // Get Crm Current Configuration List
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.CrmConfig_Service.CrmConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._CrmConfigList = DecryptedData;
            if (this._CrmConfigList) {
               this.checkSaleOrderNumber();
            }
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }

   ngOnInit() {
      this.onClose = new Subject();
      // If Create New activities
      if (this.Type === 'Create') {
         this.Form = new FormGroup({
            Date: new FormControl(null, Validators.required),
            PO_Number: new FormControl(null),
            Order_ConfirmBy: new FormControl(null, Validators.required),
            SaleOrder_Ref_Number: new FormControl(null,  { validators: Validators.required,
                                                            asyncValidators: [this.SaleOrderRef_Number_AsyncValidators.bind(this)],
                                                            updateOn: 'blur' } ),
            Quote_Id: new FormControl(this.Data, Validators.required ),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      }
   }
   checkSaleOrderNumber() {
      if (this._CrmConfigList.Sale_Ref_Number === 'Auto') {
         this.Form.controls['SaleOrder_Ref_Number'].setValidators(null);
         this.Form.controls['SaleOrder_Ref_Number'].clearAsyncValidators();
         this.Form.controls['SaleOrder_Ref_Number'].updateValueAndValidity();

      }
   }
   // validate Ref number exits
   SaleOrderRef_Number_AsyncValidators(control: AbstractControl) {
      const Data = { SaleOrder_Ref_Number : control.value, Company_Id : this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.SaleOrder_Ref_Number_AsyncValidators({'Info' : Info}).pipe(map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { SaleOrder_Ref_Number_NotAvailable: true };
         }
      }));
   }
   checkTypeConfirmation(_value) {
      this.selectedConfirmType = _value;
      this.Form.controls['Order_ConfirmBy'].setValue(this.selectedConfirmType);
      if (this.selectedConfirmType === 'Email' || this.selectedConfirmType === 'Telephonic') {
         this.Form.controls['PO_Number'].setValidators(null);
      } else {
         this.Form.controls['PO_Number'].setValidators(Validators.required);
      }
   }
   Confirm() {
      if (this.Form.valid ) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.CrmSaleOrder_Create({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'Sale Order Created Successfully'});
               this.onClose.next({Status: true});
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
            this.Uploading = false;
         });
      }
   }
   Cancel() {
      this.Form.reset();
      this.Form.updateValueAndValidity();
      this.bsModalRef.hide();
   }
}
