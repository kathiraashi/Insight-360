import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';

import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../services/LoginService/login.service';
import { HrmsService } from 'src/app/services/Hrms/hrms.service';
@Component({
  selector: 'app-model-advance-confirm',
  templateUrl: './model-advance-confirm.component.html',
  styleUrls: ['./model-advance-confirm.component.css']
})
export class ModelAdvanceConfirmComponent implements OnInit {
   Type: string;
   Advance_Id;
   Data;
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
      public Hrms_Service: HrmsService
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
    }

   ngOnInit() {
      this.onClose = new Subject();
      this.Form = new FormGroup({
         Advance_Id: new FormControl(this.Data, Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   Cancel() {
      this.Form.reset();
      this.bsModalRef.hide();
   }
   ConfirmRequest() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Hrms_Service.HrmsAdvance_Requesting({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Advance_Id: this.Data});
               this.router.navigate(['/List_Advance']);
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
   ConfirmModify() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Hrms_Service.HrmsAdvance_Modify({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Advance_Id: this.Data});
               this.router.navigate(['/List_Advance']);
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
   ConfirmApprove() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Hrms_Service.HrmsAdvance_Approve({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Advance_Id: this.Data});
               this.router.navigate(['/List_Advance']);
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
   ConfirmReject() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Hrms_Service.HrmsAdvance_Reject({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Advance_Id: this.Data});
               this.router.navigate(['/List_Advance']);
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
