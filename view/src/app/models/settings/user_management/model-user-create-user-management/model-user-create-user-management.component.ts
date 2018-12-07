import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { LoginService } from './../../../../services/LoginService/login.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrService } from './../../../../services/Hr/hr.service';

@Component({
  selector: 'app-model-user-create-user-management',
  templateUrl: './model-user-create-user-management.component.html',
  styleUrls: ['./model-user-create-user-management.component.css']
})
export class ModelUserCreateUserManagementComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;

   _UserTypes: any[] =  [];

   _ReportUsers: any[] =  [];

   _Permissions: any[] =  [];

   ShowReportsTo: Boolean = false;
   _AccessPermissions: any[] = [];

   User_Name_Changed: Boolean = false;
   UserNameValidated: Boolean = false;
   User_NameAvailable: Boolean = false;

   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;

   Form: FormGroup;
   _LinkEmployee: any;

  constructor(
               public bsModalRef: BsModalRef,
               public Service: AdminService,
               private Toastr: ToastrService,
               private Hr_Service: HrService,
               private Login_Service: LoginService,

            ) {
               // get user login info
               this.User_Info = this.Login_Service.LoggedUserInfo();
               this.Company_Id = this.User_Info.Company_Id;
               this.User_Id = this.User_Info._id;
               this.User_Type = this.User_Info.User_Type['User_Type'];
               const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
               this.Service.UserTypes_List({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._UserTypes = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting User Types List!'
                        }
                     );
                  }
               });
               this.Service.UserTypeBased_SimpleUsersList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._ReportUsers = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting Simple Users List User Type Based!'
                        }
                     );
                  }
               });
               this.Service.UserTypeBased_PermissionsGroup_SimpleList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Permissions = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting Simple Permission Group List User Type Based!'
                        }
                     );
                  }
               });
               // get Employee list
               const Data1 = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
               let Info1 = CryptoJS.AES.encrypt(JSON.stringify(Data1), 'SecretKeyIn@123');
               Info1 = Info1.toString();
               this.Hr_Service.HrEmployee_List({'Info': Info1}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._LinkEmployee = DecryptedData;
                  this._LinkEmployee = this._LinkEmployee.filter(x => x.If_UserManagement_Linked === false);
               } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
               }
               } );
            }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
         User_Name: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [this.UserNameAsyncValidate.bind(this)],
                                          updateOn: 'blur' }),
         User_Password: new FormControl('', Validators.required),
         Name: new FormControl('', Validators.required ),
         Email: new FormControl('', [Validators.required, Validators.email]),
         Phone: new FormControl(''),
         User_Type: new FormControl(null, Validators.required),
         Reports_To: new FormControl(null),
         Hrms_Employee_Id: new FormControl(null),
         AccessPermissions_Groups: new FormControl(null, Validators.required)
      });
   }

   UserNameAsyncValidate( control: AbstractControl ) {
      const Data = { User_Name: control.value, Company_Id: this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.User_Name_Validate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { UserName_NotAvailable: true};
         }
      }));
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
         this.Form.controls['AccessPermissions_Groups'].reset();
         this.Form.updateValueAndValidity();
      }
   }

  submit() {
   if (this.Form.valid) {
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
