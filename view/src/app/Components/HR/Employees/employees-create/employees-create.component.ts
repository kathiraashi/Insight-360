import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { HrSettingsService } from 'src/app/services/settings/HrSettings/hr-settings.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { AdminService } from 'src/app/services/Admin/admin.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}
@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.css']
})
export class EmployeesCreateComponent implements OnInit {
  Active_Tab = 'General_info';
  _Manager: any;
  _Branch: any;
  _Department: any;
  _Category: any;
  _MaritalStatus: any[] =  [{Type: 'Single', Name: 'Single'}, {Type: 'Married', Name: 'Married'} ];
  _SalaryMethod: any[] =  [{Type: 'Monthly', Name: 'Monthly'}, {Type: 'Weekly', Name: 'Weekly'}];
  _BasicPay: any[] =  [{Type: 'Fixed', Name: 'Fixed'}, {Type: 'Percentage', Name: 'Percentage'}];
  _ESI: any[] =  [{Type: 'Fixed', Name: 'Fixed'}, {Type: 'Percentage', Name: 'Percentage'}];
  _PF: any[] =  [{Type: 'Fixed', Name: 'Fixed'}, {Type: 'Percentage', Name: 'Percentage'}];
  _Gender: any[] = [{Type: 'M', Name: 'Male'}, {Type: 'F', Name: 'Female'}, {Type: 'O', Name: 'Others'}];
   Loader: Boolean = true;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   _Designation: any;
   _ReportTo: any;
   _Config: any;
   _EmployeeCode: any;
   _EmpCodeLength: any;
   _UserManagementList: any;
   constructor(
      private Config_Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public form_builder: FormBuilder,
      private Login_Service: LoginService,
      private CompanySettingService: CompanySettingsService,
      private HrSettingService: HrSettingsService,
      private Hr_Service: HrService,
      private Admin_Service: AdminService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // get hr configuration
      this.Hr_Service.HrEmployee_Code({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._EmployeeCode = DecryptedData.EmpCode;
         this._EmpCodeLength = DecryptedData.EmpCodeLength;
         console.log(DecryptedData + this._EmpCodeLength);
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
      }
      });
      // get Branch
      this.CompanySettingService.Branch_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Branch = DecryptedData;
            // console.log(this._Department);
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
      });
      // get hr configuration
   this.Config_Service.HrConfig_List({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._Config = DecryptedData;
         if (this._Config) {
            this.EmployeeCode();
         }
      } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
     } else {
        this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
      }
   });
      // get Employee category
      this.HrSettingService.Employee_category_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Category = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         }  else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      this.HrSettingService.Designation_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Designation = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // get Employee list
     this.Hr_Service.HrEmployee_List({'Info': Info}).subscribe( response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._ReportTo = DecryptedData;
         this.Loader = false;
         // this._ReportTo = this._ReportTo.filter(x => x.General_Info_Is_A_Manager === true);
      } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
     } else {
        this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
      }
   });
   // get User management list
   this.Admin_Service.Users_List({'Info': Info}).subscribe( response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._UserManagementList = DecryptedData;
         this._UserManagementList = this._UserManagementList.filter(x => x.If_Employee_Linked === false);
      } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage(
            {  Type: 'Error',
               Message: response['Message']
            }
         );
      } else {
         this.Toastr.NewToastrMessage(
            {  Type: 'Error',
               Message: 'Users List Getting Error!, Error not Identify!'
            }
         );
      }
   });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         Employee_Name: new FormControl(null, [Validators.required, Validators.pattern('[A-za-z .]*')]),
         Employee_Code: new FormControl(null, Validators.required),
         Employee_Code_Length: new FormControl(this._EmpCodeLength),
         Employee_Category: new FormControl(null, Validators.required),
         UserManagement_Id: new FormControl(null),
         General_Info_Branch: new FormControl(null, [Validators.required]),
         General_Info_Department: new FormControl(null, [Validators.required]),
         General_Info_Designation: new FormControl(null, [Validators.required]),
         General_Info_Report_To: new FormControl(null),
         General_Info_Mobile_Number: new FormControl(null, { validators: [Validators.required, Validators.pattern('[0-9+ -]*')],
                                                             asyncValidators: [this.Mobile_AsyncValidators.bind(this)],
                                                            } ),
         General_Info_Date_Of_Joining: new FormControl(null, [Validators.required]),
         General_Info_Probation_Month: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
         General_Info_Is_A_Manager: new FormControl(null),
         General_Info_Active: new FormControl(true),
         Personal_Info_DOB: new FormControl(null),
         Personal_Info_Martial_Status: new FormControl(null),
         Personal_Info_Street: new FormControl(null),
         Personal_Info_Area: new FormControl(null),
         Personal_Info_City: new FormControl(null),
         Personal_Info_State: new FormControl(null),
         Personal_Info_Country: new FormControl(null),
         Personal_Info_PinCode: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   // validate Mobile number exits
   Mobile_AsyncValidators(control: AbstractControl) {
      const Data = { Mobile : control.value, Company_Id : this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Hr_Service.Mobile_AsyncValidators({'Info' : Info}).pipe(map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Mobile_NotAvailable: true };
         }
      }));
   }
   // Employee code validation
   EmployeeCode() {
      if (this._Config.Code === 'Auto') {
         this.Form.controls['Employee_Code'].disable();
         this.Form.controls['Employee_Code'].setValue(this._EmployeeCode);
      }
      this.Form.controls['Employee_Code_Length'].setValue(this._EmpCodeLength);
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
   // get Department
   getDepartment(value) {
      if (value !== '' || value !== undefined) {
         const _index = this._Branch.findIndex(x => x._id === value);
         this._Department = this._Branch[_index].Departments;
      }
   }

   Submit() {
      console.log(this.Form.getRawValue());
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Hr_Service.HrEmployee_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.router.navigate(['/List_Employees']);
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }
}
