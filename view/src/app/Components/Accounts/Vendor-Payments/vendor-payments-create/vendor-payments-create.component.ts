import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName, Form } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';
import { AccountsService } from 'src/app/services/Accounts/accounts.service';
import { AccountSettingsService } from 'src/app/services/settings/AccountSettings/account-settings.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}
@Component({
  selector: 'app-vendor-payments-create',
  templateUrl: './vendor-payments-create.component.html',
  styleUrls: ['./vendor-payments-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class VendorPaymentsCreateComponent implements OnInit {
   _BillNo: any[] =  ['Bill-1', 'Bill-2', ' Bill-3'];
   Loader: Boolean = true;
   Uploading: Boolean = false;
   _BankList: any;
   _Vendor: any;
   Type: string;
   Type1: string;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   constructor(
      private AccountSettings_Service: AccountSettingsService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,
      public Account_Service: AccountsService,
      public router: Router,
      public Purchase_Service: PurchaseService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // get bank list
      // Get Income Type List
      this.Purchase_Service.PurchaseVendor_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Vendor = DecryptedData;
            console.log(this._Vendor);
            this.Loader = (!this._Vendor) ? true : false;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         }  else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get bank List
      this.AccountSettings_Service.Bank_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status']) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._BankList = DecryptedData;
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
         Vendor: new FormControl(null, [Validators.required]),
         Bill_No: new FormControl(null),
         Payment_Amount: new FormControl(null, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
         Total_Amount: new FormControl({value: null, disabled: true}, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
         Date: new FormControl(null, [Validators.required]),
         Description: new FormControl(null),
         Mode_Of_Pay: new FormControl(null, [Validators.required]),
         Bank_Method: new FormControl(null),
         Reference_No: new FormControl(null),
         Cheque_No: new FormControl(null),
         Expected_Date_Clearing: new FormControl(null),
         Issues_Bank: new FormControl(null),
         Issues_Branch: new FormControl(null),
         Deposit_Bank: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   KeyUp(event: any) {
      return false;
   }
   setTotalAmount() {
      const Data = this.Form.controls['Payment_Amount'].value;
      this.Form.controls['Total_Amount'].setValue(Data);
   }
   ModeOfPay(value) {
      this.Type = value;
      if (this.Type === 'Bank') {
         this.Form.controls['Bank_Method'].setValidators(Validators.required);
         this.Form.controls['Bank_Method'].setValue(null);
         this.Form.updateValueAndValidity();
      } else {
         this.Form.controls['Bank_Method'].setValidators(null);
         this.Form.controls['Reference_No'].setValidators(null);
         this.Form.controls['Cheque_No'].setValidators(null);
         this.Form.controls['Expected_Date_Clearing'].setValidators(null);
         this.Form.controls['Issues_Bank'].setValidators(null);
         this.Form.controls['Issues_Branch'].setValidators(null);
         this.Form.controls['Deposit_Bank'].setValidators(null);
         this.Form.controls['Bank_Method'].setValue(null);
         this.Type1 = null;
         this.Form.controls['Reference_No'].setValue(null);
         this.Form.controls['Cheque_No'].setValue(null);
         this.Form.controls['Expected_Date_Clearing'].setValue(null);
         this.Form.controls['Issues_Bank'].setValue(null);
         this.Form.controls['Issues_Branch'].setValue(null);
         this.Form.controls['Deposit_Bank'].setValue(null);
         this.Form.updateValueAndValidity();
      }
   }
   BankMethod(value) {
      this.Type1 = value;
      if ((this.Type1 === 'online_payment' || this.Type1 === 'Neft') && this.Type === 'Bank') {
         this.Form.controls['Reference_No'].setValidators(Validators.required);
         this.Form.controls['Cheque_No'].setValidators(null);
         this.Form.controls['Expected_Date_Clearing'].setValidators(null);
         this.Form.controls['Issues_Bank'].setValidators(null);
         this.Form.controls['Issues_Branch'].setValidators(null);
         this.Form.controls['Deposit_Bank'].setValidators(Validators.required);
         // -------------------------------------------------------
         this.Form.controls['Reference_No'].setValue(null);
         this.Form.controls['Cheque_No'].setValue(null);
         this.Form.controls['Expected_Date_Clearing'].setValue(null);
         this.Form.controls['Issues_Bank'].setValue(null);
         this.Form.controls['Issues_Branch'].setValue(null);
         this.Form.controls['Deposit_Bank'].setValue(null);
         this.Form.updateValueAndValidity();
      } else if ((this.Type1 === 'cheque') && this.Type === 'Bank') {
         this.Form.controls['Reference_No'].setValidators(null);
         this.Form.controls['Cheque_No'].setValidators(Validators.required);
         this.Form.controls['Expected_Date_Clearing'].setValidators(Validators.required);
         this.Form.controls['Issues_Bank'].setValidators(Validators.required);
         this.Form.controls['Issues_Branch'].setValidators(Validators.required);
         this.Form.controls['Deposit_Bank'].setValidators(Validators.required);
         // -------------------------------------------------------
         this.Form.controls['Reference_No'].setValue(null);
         this.Form.controls['Cheque_No'].setValue(null);
         this.Form.controls['Expected_Date_Clearing'].setValue(null);
         this.Form.controls['Issues_Bank'].setValue(null);
         this.Form.controls['Issues_Branch'].setValue(null);
         this.Form.controls['Deposit_Bank'].setValue(null);
         this.Form.updateValueAndValidity();
      } else {
         this.Form.controls['Bank_Method'].setValidators(null);
         this.Form.controls['Reference_No'].setValidators(null);
         this.Form.controls['Cheque_No'].setValidators(null);
         this.Form.controls['Expected_Date_Clearing'].setValidators(null);
         this.Form.controls['Issues_Bank'].setValidators(null);
         this.Form.controls['Issues_Branch'].setValidators(null);
         this.Form.controls['Deposit_Bank'].setValidators(null);
         this.Form.controls['Bank_Method'].setValue(null);
         this.Type1 = null;
         this.Form.controls['Reference_No'].setValue(null);
         this.Form.controls['Cheque_No'].setValue(null);
         this.Form.controls['Expected_Date_Clearing'].setValue(null);
         this.Form.controls['Issues_Bank'].setValue(null);
         this.Form.controls['Issues_Branch'].setValue(null);
         this.Form.controls['Deposit_Bank'].setValue(null);
         this.Form.updateValueAndValidity();
      }
   }
   Submit() {
      if (this.Form.valid) {
         this.Uploading = true;
         console.log(this.Form.value);
         // let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         // Info = Info.toString();
         // this.Account_Service.AccountsIncome_Create({ 'Info': Info }).subscribe( response => {
         //    const ResponseData = JSON.parse(response['_body']);
         //    if (response['status'] === 200 && ResponseData['Status'] ) {
         //       this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
         //       this.router.navigate(['/Accounts_Income']);
         //    } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
         //       this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         //    } else if (response['status'] === 401 && !ResponseData['Status']) {
         //       this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         //    } else {
         //       this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
         //    }
         // });
         // this.Uploading = false;
      }
   }

}
