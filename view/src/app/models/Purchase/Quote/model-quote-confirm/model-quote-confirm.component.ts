import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';

import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-quote-confirm',
  templateUrl: './model-quote-confirm.component.html',
  styleUrls: ['./model-quote-confirm.component.css']
})
export class ModelQuoteConfirmComponent implements OnInit {
   Type: string;
   Data;
   Uploading: Boolean = false;
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   nextButton: Boolean = true;
   onClose: Subject<{}>;
   Form: FormGroup;
   _PurchaseConfigList: any;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: PurchaseService,
      public PurchaseConfig_Service: ConfigurationService,
      public Toastr: ToastrService,
      private Login_Service: LoginService,
      public router: Router,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
       // Get Crm Current Configuration List
       const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id};
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       this.PurchaseConfig_Service.PurchaseConfig_List({'Info': Info}).subscribe(response => {
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this._PurchaseConfigList = DecryptedData;
             if (this._PurchaseConfigList) {
                this.checkOrderNumber();
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
      this.Form = new FormGroup({
         Order_Ref_Number: new FormControl(null, {
            asyncValidators: [ this.OrderNumber_AsyncValidators.bind(this) ]}),
         Quote_Id: new FormControl(this.Data, Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   // Purchase Quote Async Validator
   OrderNumber_AsyncValidators( control: AbstractControl ) {
      const Data = { Requested_Number: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.OrderNumber_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { OrderNumber_NotAvailable: true };
         }
      }));
   }

   checkOrderNumber() {
      if (this._PurchaseConfigList.Purchase_Order === 'Manual') {
         this.Form.controls['Order_Ref_Number'].setValidators(Validators.required);
         this.Type = 'Create_Order_Number';
      } else if (this._PurchaseConfigList.Purchase_Order === 'Auto') {
         this.Form.controls['Order_Ref_Number'].clearAsyncValidators();
         this.Form.controls['Order_Ref_Number'].setValidators(null);
         this.Form.controls['Order_Ref_Number'].updateValueAndValidity();
         this.Type = 'Confirm_Order';
      }
   }
   Next() {
      this.nextButton = false;
      setTimeout(() => {
         this.Type = 'Confirm_Order';
      }, 500);
   }
   Confirm() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.PurchaseQuote_ConfirmOrder({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Purchase_Orders_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
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
