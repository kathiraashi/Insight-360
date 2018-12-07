import { Component, OnInit } from '@angular/core';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { AccountsService } from 'src/app/services/Accounts/accounts.service';
import { AccountSettingsService } from 'src/app/services/settings/AccountSettings/account-settings.service';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName, Form } from '@angular/forms';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-accounts-bank-register',
  templateUrl: './accounts-bank-register.component.html',
  styleUrls: ['./accounts-bank-register.component.css']
})
export class AccountsBankRegisterComponent implements OnInit {
   Loader: Boolean = true;
   SubLoader: Boolean = false;
   _List: any;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Income_Id: any;
   _BankList: any;
   Form: FormGroup;

   constructor(
      private Toastr: ToastrService,
      private AccountSettings_Service: AccountSettingsService,
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
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // Get bank List
      this.AccountSettings_Service.Bank_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status']) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._BankList = DecryptedData;
            if (this._BankList) {
               this.selectedBank(this._BankList[0]);
               this.Loader = false;
            }
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         }  else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         selected: new FormControl(null),
      });
   }
   selectedBank(value) {
      this.Form.controls['selected'].setValue(value._id);
      this.getBankDetails();
   }
   getBankDetails() {
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, 'Bank_Id': this.Form.controls['selected'].value};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.SubLoader = true;
      // get bank register list
      this.Account_Service.AccountsRegister_Bank_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            console.log(DecryptedData);
            this._List = DecryptedData;
            this.SubLoader = (!this._List) ? true : false;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
      });
   }

}
