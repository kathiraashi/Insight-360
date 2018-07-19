import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-user-create-user-management',
  templateUrl: './model-user-create-user-management.component.html',
  styleUrls: ['./model-user-create-user-management.component.css']
})
export class ModelUserCreateUserManagementComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;

   _UserTypes: any[] =  [
                           {_id: '1', User_Type: 'Sub Admin'},
                           {_id: '2', User_Type: 'Manager'},
                           {_id: '4', User_Type: 'Senior Executive'},
                           {_id: '3', User_Type: 'Co-ordinator'},
                           {_id: '5', User_Type: 'User'}
                        ];

   _ReportUsers: any[] =  [
                           {_id: '1', User_Name: 'UserName_1'},
                           {_id: '2', User_Name: 'UserName_2'},
                           {_id: '4', User_Name: 'UserName_3'},
                           {_id: '3', User_Name: 'UserName_4'},
                           {_id: '5', User_Name: 'UserName_5'}
                        ];

   ShowReportsTo: Boolean = false;

   User_Name_Changed: Boolean = false;
   UserNameValidated: Boolean = false;
   User_NameAvailable: Boolean = false;

   Form: FormGroup;

  constructor(
               public bsModalRef: BsModalRef,
               public Service: AdminService,
               private Toastr: ToastrService
            ) {}

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         User_Name: new FormControl(''),
         User_Password: new FormControl(''),
         Name: new FormControl(''),
         Email: new FormControl(''),
         Phone: new FormControl(''),
         User_Type: new FormControl(null, Validators.required),
         Company_Id: new FormControl('5b3c66d01dd3ff14589602fe'),
         Reports_To: new FormControl(null),
      });
   }

  User_Name_Change() {
     this.User_Name_Changed = true;
  }
  UserType_Change() {
      const value = this.Form.controls['User_Type'].value;
      if (typeof value === 'object' && value !== null ) {
         if (value.User_Type  !== 'Sub Admin') {
               this.ShowReportsTo = true;
               this.Form.controls['Reports_To'].setValidators([Validators.required]);
               this.Form.updateValueAndValidity();
         } else {
            this.ShowReportsTo = false;
            this.Form.controls['Reports_To'].clearValidators();
            this.Form.controls['Reports_To'].setErrors(null);
            this.Form.controls['Reports_To'].reset();
         }
      } else {
         this.ShowReportsTo = false;
         this.Form.controls['Reports_To'].clearValidators();
         this.Form.controls['Reports_To'].setErrors(null);
         this.Form.controls['Reports_To'].reset();
      }
  }

  UserNameValidate() {
   if ( this.Form.controls['User_Name'].value !== '') {
      const Data = { User_Name: this.Form.controls['User_Name'].value, Company_Id: '5b3c66d01dd3ff14589602fe' };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.User_Name_Validate({'Info': Info}).subscribe( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status']) {
           if (ReceivingData['Available']) {
              this.User_NameAvailable = true;
              this.UserNameValidated = true;
           } else {
            this.User_NameAvailable = false;
            this.UserNameValidated = true;
           }
           this.User_Name_Changed = false;
         } else {
            this.Toastr.NewToastrMessage(
               {  Type: 'Error',
                  Message: 'Users Name Validate Error!, Try Another Name!'
               }
            );
         }
      });
   }
  }

  submit() {
   if (this.Form.valid && this.UserNameValidated && this.User_NameAvailable && !this.User_Name_Changed) {
      const Data = this.Form.value;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.User_Create({'Info': Info}).subscribe( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status']) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.onClose.next({Status: true, Response: DecryptedData});
            this.bsModalRef.hide();
         } else if (response['status'] === 400 && !ReceivingData['Status']) {
            this.onClose.next({Status: false, Message: 'Bad Request Error!'});
            this.bsModalRef.hide();
         } else if (response['status'] === 417 && !ReceivingData['Status']) {
            this.onClose.next({Status: false, Message: 'Industry Type Query Error!'});
            this.bsModalRef.hide();
         } else {
            this.onClose.next({Status: false, Message: 'UnExpected Error!'});
            this.bsModalRef.hide();
         }
      });
   }
}

}
