import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';

import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../services/LoginService/login.service';
import { AccountsService } from './../../../services/Accounts/accounts.service';
@Component({
  selector: 'app-model-register-confirm',
  templateUrl: './model-register-confirm.component.html',
  styleUrls: ['./model-register-confirm.component.css']
})
export class ModelRegisterConfirmComponent implements OnInit {
   Type;
   Reference_Id;
   Uploading: Boolean = false;
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   onClose: Subject<{}>;
   Form: FormGroup;
   constructor(
      public bsModalRef: BsModalRef,
      public Toastr: ToastrService,
      public Login_Service: LoginService,
      public router: Router,
      public Account_Service: AccountsService
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
    }

   ngOnInit() {
      this.onClose = new Subject();
      if (this.Type === 'Income') {
         this.Form = new FormGroup({
            Type: new FormControl('Income', Validators.required),
            Reference_Id: new FormControl(this.Reference_Id, Validators.required),
            Reference_Key: new FormControl('AccountsIncome', Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      } else {
         this.Form = new FormGroup({
            Type: new FormControl('Loan', Validators.required),
            Reference_Id: new FormControl(this.Reference_Id, Validators.required),
            Reference_Key: new FormControl('AccountsLoan', Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      }
      console.log(this.Form.controls);
   }
   Cancel() {
      this.Form.reset();
      this.bsModalRef.hide();
   }
   Confirm() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Account_Service.AccountsRegister_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Reference_Id: this.Reference_Id});
               this.router.navigate(['/Accounts_Income']);
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
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

}
