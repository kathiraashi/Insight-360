import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName, Form } from '@angular/forms';
import { AccountSettingsService } from './../../../../../services/settings/AccountSettings/account-settings.service';
import { PermissionsCheckService } from './../../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../../services/LoginService/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { AccountsService } from 'src/app/services/Accounts/accounts.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-accounts-loan',
  templateUrl: './accounts-loan.component.html',
  styleUrls: ['./accounts-loan.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],

})
export class AccountsLoanComponent implements OnInit {
   _CycleOfPrepayment: any[] =  [{type: 'Weekly', value: 'Weekly'}, {type: 'Bi-Weekly', value: 'Bi-Weekly'}, { type: 'Monthly-interest', value: 'Monthly-interest'}, { type: 'Monthly-EMI', value: 'Monthly-EMI'}];
   _Day: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   Loader: Boolean = true;
   Uploading: Boolean = false;
   Type: string;
   Type1: string;
   Type2: string;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   _BankList: any;
   Payment_List: FormArray;
   constructor(
      private AccountSettings_Service: AccountSettingsService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,
      public Account_Service: AccountsService,
      public router: Router,
      private formBuilder: FormBuilder,
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
         Lender_Name: new FormControl(null, [Validators.required, Validators.pattern('([a-zA-z ]*)(.{1})?([a-zA-z ]*)')]),
         Lender_Account_Number: new FormControl(null, [Validators.required]),
         Amount: new FormControl(null, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
         Date: new FormControl(null, [Validators.required]),
         Interest_Rate: new FormControl(null, [Validators.required, Validators.pattern('([0-9]{1,3})(.[0-9]{1,2})?')]),
         Cycle_Of_Prepayment: new FormControl(null, [Validators.required]),
         No_Of_Week: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
         No_Of_Months: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
         Start_From: new FormControl(null, [Validators.required]),
         Payment_List: this.formBuilder.array([]),
         Table_Common_Amount: new FormControl(null, [Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
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
   onChangeCycleOfPayment(value) {
      console.log(value);
      this.Type2 = value;
      this.CreateTable();
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

   CreateTable() {
      this.Form.setControl('Payment_List', this.formBuilder.array([]));
      let tempStart_From = new Date(this.Form.controls['Start_From'].value);
      if (this.Type2 === 'Weekly') {
         this.Form.controls['No_Of_Week'].setValidators([Validators.required, Validators.pattern('[0-9]*')]);
         this.Form.controls['No_Of_Months'].setValidators(null);
         this.Form.controls['No_Of_Months'].setValue(null);
         const NoOfWeeks = parseInt(this.Form.controls['No_Of_Week'].value, 0);
         tempStart_From = new Date(tempStart_From.setDate(tempStart_From.getDate() - 7));
         this.Payment_List = this.Form.get('Payment_List') as FormArray;
         for (let i = 0; i < NoOfWeeks; i++) {
            const Table: FormGroup = this.formBuilder.group({
               Table_Date: new FormControl({value: tempStart_From, disabled: true}),
               Table_Amount: new FormControl(null, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
               Loan_Payment_Status: new FormControl('Draft'),
               Status: new FormControl('Draft')
            });
            this.Payment_List.push(Table);
            tempStart_From = new Date(tempStart_From.setDate(tempStart_From.getDate() + 7));
         }
      } else if (this.Type2 === 'Bi-Weekly') {
         this.Form.controls['No_Of_Week'].setValidators([Validators.required, Validators.pattern('[0-9]*')]);
         this.Form.controls['No_Of_Months'].setValidators(null);
         this.Form.controls['No_Of_Months'].setValue(null);
         const NoOfWeeks = parseInt(this.Form.controls['No_Of_Week'].value, 0);
         tempStart_From = new Date(tempStart_From.setDate(tempStart_From.getDate() - 14));
         this.Payment_List = this.Form.get('Payment_List') as FormArray;
         for (let i = 0; i < NoOfWeeks; i++) {
            const Table: FormGroup = this.formBuilder.group({
               Table_Date: new FormControl({value: tempStart_From, disabled: true}),
               Table_Amount: new FormControl(null, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?')]),
               Loan_Payment_Status: new FormControl('Draft'),
               Status: new FormControl('Draft')
            });
            this.Payment_List.push(Table);
            tempStart_From = new Date(tempStart_From.setDate(tempStart_From.getDate() + 14));
         }
      } else if (this.Type2 === 'Monthly-interest' || this.Type2 === 'Monthly-EMI') {
         this.Form.controls['No_Of_Week'].setValidators(null);
         this.Form.controls['No_Of_Week'].setValue(null);
         this.Form.controls['No_Of_Months'].setValidators([Validators.required, Validators.pattern('[0-9]*')]);
         const NoOfMonths = parseInt(this.Form.controls['No_Of_Months'].value, 0);
         tempStart_From = new Date(tempStart_From.setMonth(tempStart_From.getMonth() - 1));
         this.Payment_List = this.Form.get('Payment_List') as FormArray;
         for (let i = 0; i < NoOfMonths; i++) {
            const Table: FormGroup = this.formBuilder.group({
               Table_Date: new FormControl({value: tempStart_From, disabled: true}),
               Table_Amount: new FormControl(null, [Validators.required, Validators.pattern('([0-9]*)(.[0-9]{1,2})?') ]),
               Loan_Payment_Status: new FormControl({value: 'Draft', disabled: true}),
               Status: new FormControl('Draft')
            });
            this.Payment_List.push(Table);
            tempStart_From = new Date(tempStart_From.setMonth(tempStart_From.getMonth() + 1));
         }
      }
   }
   SetAmount(value) {
      const tempAmount = this.Form.controls['Table_Common_Amount'].value;
      const length = this.Form.controls['Payment_List']['controls'].length;
      if (value) {
         for (let i = 0; i < length; i++) {
            this.Form.controls['Payment_List']['controls'][i].controls['Table_Amount'].setValue(tempAmount);
         }
      } else {
         for (let i = 0; i < length; i++) {
            this.Form.controls['Payment_List']['controls'][i].controls['Table_Amount'].setValue(null);
         }
      }
   }
   Submit() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Account_Service.AccountsLoan_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Accounts_Income']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
         });
         this.Uploading = false;
      }
   }

}
