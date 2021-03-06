import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { HrService } from './../../../../services/Hr/hr.service';
import { HrmsService } from './../../../../services/Hrms/hrms.service';
import { HrmsSettingsService } from './../../../../services/settings/HrmsSettings/hrms-settings.service';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { Router } from '@angular/router';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { HrSettingsService } from 'src/app/services/settings/HrSettings/hr-settings.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}
@Component({
  selector: 'app-create-on-duty',
  templateUrl: './create-on-duty.component.html',
  styleUrls: ['./create-on-duty.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateOnDutyComponent implements OnInit {
   Loader: Boolean = true;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _Name: any[] =  ['Employee-1', 'Employee-2', 'Employee-3'];
   _Department: any;
   _Designation: any;
   Department;
   Contact_Number;
   Designation;
   today = new Date();
   Form: FormGroup;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private Login_Service: LoginService,
      private Hr_Service: HrService,
      private Hrms_Service: HrmsService,
      public HrSettingService: HrSettingsService,
      private Hrms_Setting_Service: HrmsSettingsService,
      private CompanySettingService: CompanySettingsService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // get Employee List
      this.Hr_Service.HrEmployee_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Name = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
         });
      // get Department
      this.CompanySettingService.Branch_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Department = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
      });
      // Designation list
      this.HrSettingService.Designation_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Designation = DecryptedData;
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         Requested_By: new FormControl(null, Validators.required),
         Requested_To: new FormControl(null, Validators.required),
         Department: new FormControl(null),
         Designation: new FormControl(null),
         Contact_Number: new FormControl(null),
         Requested_Date: new FormControl({value: new Date(), disabled: true}, Validators.required),
         OnDuty_Date: new FormControl(null, Validators.required),
         From_Time: new FormControl(null, Validators.required),
         FormTimeConverted: new FormControl(null),
         To_Time: new FormControl(null, Validators.required),
         ToTimeConverted: new FormControl(null),
         Description: new FormControl(null, Validators.required),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   selectedEmployee(value) {
      const _index = this._Name.findIndex(x => x._id === value._id);
      this.Contact_Number = this._Name[_index].General_Info_Mobile_Number;
      const Branch = this._Department.find(y => y._id ===  this._Name[_index].General_Info_Branch);
      this.Department = Branch.Departments.find(z => z._id === this._Name[_index].General_Info_Department);
      this.Designation = this._Designation.find(i => i._id === this._Name[_index].General_Info_Designation);
      this.Form.controls['Requested_To'].setValue(this._Name[_index].General_Info_Report_To);
      this.Form.controls['Contact_Number'].setValue(this._Name[_index].General_Info_Mobile_Number);
      this.Form.controls['Department'].setValue(this.Department.Department_Name);
      this.Form.controls['Designation'].setValue(this.Designation.Designation);
      this.Form.controls['Contact_Number'].disable();
      this.Form.controls['Department'].disable();
      this.Form.controls['Designation'].disable();

   }
   Submit() {
      if (this.Form.valid) {
         this.TimeConversion();
      }
   }
   TimeConversion() {
      const _Date = new Date();
      const Date_Str = ((_Date.getMonth() + 1 ) + '/' + _Date.getDate() + '/' + _Date.getFullYear()).toString();
      const Start_time = this.Form.controls['From_Time'].value;
      const Stop_time = this.Form.controls['To_Time'].value;
      const FormTime = new Date(Date_Str + ' ' + Start_time);
      const ToTime = new Date(Date_Str + ' ' + Stop_time);
      this.Form.controls['FormTimeConverted'].setValue(FormTime);
      this.Form.controls['ToTimeConverted'].setValue(ToTime);
      this.SubmitFunction();
   }
   SubmitFunction() {
      this.Loader = true;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Hrms_Service.HrmsOnDuty_Create({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.router.navigate(['/List_Onduty']);
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
