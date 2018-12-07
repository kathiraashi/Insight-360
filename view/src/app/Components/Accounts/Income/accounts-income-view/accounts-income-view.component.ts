import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName, Form } from '@angular/forms';
import { AccountSettingsService } from './../../../../services/settings/AccountSettings/account-settings.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { AccountsService } from 'src/app/services/Accounts/accounts.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { ModelRegisterConfirmComponent } from 'src/app/models/Accounts/model-register-confirm/model-register-confirm.component';

@Component({
  selector: 'app-accounts-income-view',
  templateUrl: './accounts-income-view.component.html',
  styleUrls: ['./accounts-income-view.component.css']
})
export class AccountsIncomeViewComponent implements OnInit {
   Loader: Boolean = true;
   Uploading: Boolean = false;
   _InvestmentData: any;
   _LoanData: any;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Income_Id: any;
   Type: any;
   bsModalRef: BsModalRef;
   _LoanPaymentData: any;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,
      public Account_Service: AccountsService,
      public router: Router,
      public active_route: ActivatedRoute,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      this.active_route.url.subscribe(u => {
         this.Income_Id = this.active_route.snapshot.queryParams['Income_Id'];
         this.Type = this.active_route.snapshot.queryParams['Type'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Income_Id': this.Income_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         if (this.Type === 'Income') {
            // get Leaves details
            this.Account_Service.AccountsIncome_View({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               console.log(DecryptedData);
               this._InvestmentData = DecryptedData;
               this.Loader = (!this._InvestmentData) ? true : false;
            } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
            }
            });
         } else {
            // get Leaves details
            this.Account_Service.AccountsLoan_View({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  console.log(DecryptedData);
                  this._LoanData = DecryptedData.LoanDetails;
                  this._LoanPaymentData = DecryptedData.LoanPaymentDetails;
                  this.Loader = (!this._LoanData) ? true : false;
               } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
               }
            });
         }
      });
   }

   ngOnInit() {
   }
   Validate() {
      const initialState = {
         Type: this.Type,
         Reference_Id: this.Income_Id,
      };
      this.bsModalRef = this.modalService.show(ModelRegisterConfirmComponent, Object.assign({initialState}, { class: '', ignoreBackdropClick: true }));
   }
}
