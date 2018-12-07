import { Component, OnInit } from '@angular/core';
import { ModelIncomeComponent } from 'src/app/models/Accounts/model-income/model-income.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { AccountsService } from 'src/app/services/Accounts/accounts.service';
import { ModelRegisterConfirmComponent } from 'src/app/models/Accounts/model-register-confirm/model-register-confirm.component';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName, Form } from '@angular/forms';

@Component({
  selector: 'app-accounts-income',
  templateUrl: './accounts-income.component.html',
  styleUrls: ['./accounts-income.component.css']
})
export class AccountsIncomeComponent implements OnInit {
   Loader: Boolean = true;
   Active_Tab = 'Income';
   _Tab = [{ type: 'Income', value: 'Income/Investment'}, {type: 'Loan', value: 'Loan'}];
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _InComeList: any;
   _LoanList: any;
   bsModalRef: BsModalRef;
   Income_Id: any;
   Income_Details: any;
   Reference_Key: string;
   showValidateButton: any;
   Form: FormGroup;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private Login_Service: LoginService,
      public Account_Service: AccountsService,
      public router: Router,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // Get Account Loan list
      this.Account_Service.AccountsLoan_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._LoanList = DecryptedData;
            console.log(this._LoanList);
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         }  else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get Account income list
      this.Account_Service.AccountsIncome_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._InComeList = DecryptedData;
            console.log(this._InComeList);
            this.Loader = (!this._InComeList) ? true : false;
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
         selected: new FormControl(this.Active_Tab),
      });
   }
   selectTab(value) {
      console.log(value);
      this.Active_Tab = value;
      this.Form.controls['selected'].setValue(this.Active_Tab);
   }
   ActionIndex(_index) {
      this.Income_Id = (this.Active_Tab === 'Income') ? this._InComeList[_index]._id : this._LoanList[_index]._id;
      this.Income_Details = (this.Active_Tab === 'Income') ? this._InComeList[_index] : this._LoanList[_index];
      this.showValidateButton = (this.Income_Details.Status === 'Draft') ? true : false;
   }
   Create() {
      if (this.Active_Tab === 'Income') {
         this.router.navigate(['/Accounts_Investment']);
      } else {
         this.router.navigate(['/Accounts_Loan']);
      }
   }
   View() {
      this.router.navigate(['Accounts_Income_View'], {queryParams: { Income_Id: this.Income_Id, Type: this.Active_Tab }});
   }
   Validate() {
      const initialState = {
         Type: this.Active_Tab,
         Reference_Id: this.Income_Details._id,
      };
      this.bsModalRef = this.modalService.show(ModelRegisterConfirmComponent, Object.assign({initialState}, { class: '', ignoreBackdropClick: true }));
   }
}
