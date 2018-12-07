import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';

@Component({
  selector: 'app-hr-config',
  templateUrl: './hr-config.component.html',
  styleUrls: ['./hr-config.component.css']
})
export class HrConfigComponent implements OnInit {

   Loader: Boolean = true;
   _List: any[] = [];
   _Create: Boolean = false;
   _Update: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';

   _BasedOn: any[] = ['Fiscal', 'Custom'];
   _Date: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
   _Month: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   Form: FormGroup;
   Employee_Type: string;
   Employee_Based_Type: string;
   Code_Type: string;
   Code_Based_Type: string;

   constructor(
      private Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService
   ) {
      // Get Crm Configuration List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.HrConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            if (this._List === null) {
               this._Create = true;
            } else {
               this._Update = true;
               this.If_Update();
            }
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
         Employee: new FormControl('Manual', Validators.required),
         Employee_Prefix: new FormControl(null),
         Employee_Suffix: new FormControl(null),
         Employee_Starting: new FormControl(null),
         Employee_Based: new FormControl(null),
         Employee_Custom_Date: new FormControl(null),
         Employee_Custom_Month: new FormControl(null),
         Code: new FormControl('Manual', Validators.required),
         Code_Prefix: new FormControl(null),
         Code_Suffix: new FormControl(null),
         Code_Starting: new FormControl(null),
         Code_Based: new FormControl(null),
         Code_Custom_Date: new FormControl(null),
         Code_Custom_Month: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Last_Modified_By: new FormControl(this.User_Id, Validators.required)
      });
   }
   If_Update() {
      this.Form.addControl('HrConfig_Id', new FormControl(this._List['_id'], Validators.required));
      this.Form.controls['Employee'].setValue(this._List['Employee']);
      this.Form.controls['Code'].setValue(this._List['Code']);

      if (this.Form.controls['Employee'].value === 'Auto') {
         this.Employee_Type = 'Auto';
         this.Form.controls['Employee_Prefix'].setValue(this._List['Employee_Prefix']);
         this.Form.controls['Employee_Suffix'].setValue(this._List['Employee_Suffix']);
         this.Form.controls['Employee_Starting'].setValue(this._List['Employee_Starting']);
         this.Form.controls['Employee_Based'].setValue(this._List['Employee_Based']);
         if (this.Form.controls['Employee_Based'].value === 'Custom') {
            this.Employee_Based_Type = 'Custom';
            this.Form.controls['Employee_Custom_Date'].setValue(this._List['Employee_Custom_Date']);
            this.Form.controls['Employee_Custom_Month'].setValue(this._List['Employee_Custom_Month']);
         } else {
            this.Employee_Based_Type = 'Fiscal';
         }
      } else {
         this.Employee_Type = 'Manual';
      }
      if (this.Form.controls['Code'].value === 'Auto') {
         this.Code_Type = 'Auto';
         this.Form.controls['Code_Prefix'].setValue(this._List['Code_Prefix']);
         this.Form.controls['Code_Suffix'].setValue(this._List['Code_Suffix']);
         this.Form.controls['Code_Starting'].setValue(this._List['Code_Starting']);
         this.Form.controls['Code_Based'].setValue(this._List['Code_Based']);
         if (this.Form.controls['Code_Based'].value === 'Custom') {
            this.Code_Based_Type = 'Custom';
            this.Form.controls['Coed_Custom_Date'].setValue(this._List['Code_Custom_Date']);
            this.Form.controls['Coed_Custom_Month'].setValue(this._List['Code_Custom_Month']);
         } else {
            this.Code_Based_Type = 'Fiscal';
         }
      } else {
         this.Code_Type = 'Manual';
      }
   }
   EmployeeChange(value) {
      if (value === 'Auto') {
         this.Employee_Type = 'Auto';
         this.Form.controls['Employee_Starting'].setValidators(Validators.required);
         this.Form.controls['Employee_Based'].setValidators(Validators.required);
      } else {
         this.Employee_Type = 'Manual';
         this.Form.controls['Employee_Starting'].clearValidators();
         this.Form.controls['Employee_Based'].clearValidators();
         this.Form.controls['Employee_Prefix'].setValue(null);
         this.Form.controls['Employee_Suffix'].setValue(null);
         this.Form.controls['Employee_Starting'].setValue(null);
         this.Form.controls['Employee_Based'].setValue(null);
      }
   }
   EmployeeChange_Custom(value) {
      if (value === 'Custom') {
         this.Employee_Based_Type = 'Custom';
         this.Form.controls['Employee_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Employee_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Employee_Based_Type = 'Fiscal';
         this.Form.controls['Employee_Custom_Date'].clearValidators();
         this.Form.controls['Employee_Custom_Month'].clearValidators();
         this.Form.controls['Employee_Custom_Date'].setValue(null);
         this.Form.controls['Employee_Custom_Month'].setValue(null);
      }
   }
   CodeChange(value) {
      if (value === 'Auto') {
         this.Code_Type = 'Auto';
         this.Form.controls['Code_Starting'].setValidators(Validators.required);
         this.Form.controls['Code_Based'].setValidators(Validators.required);
      } else {
         this.Code_Type = 'Manual';
         this.Form.controls['Code_Starting'].clearValidators();
         this.Form.controls['Code_Based'].clearValidators();
         this.Form.controls['Code_Prefix'].setValue(null);
         this.Form.controls['Code_Suffix'].setValue(null);
         this.Form.controls['Code_Starting'].setValue(null);
         this.Form.controls['Code_Based'].setValue(null);
      }
   }
   CodeChange_Custom(value) {
      if (value === 'Custom') {
         this.Code_Based_Type = 'Custom';
         this.Form.controls['Code_Custom_Date'].setValidators(Validators.required);
         this.Form.controls['Code_Custom_Month'].setValidators(Validators.required);
      } else {
         this.Code_Based_Type = 'Fiscal';
         this.Form.controls['Code_Custom_Date'].clearValidators();
         this.Form.controls['Code_Custom_Month'].clearValidators();
         this.Form.controls['Code_Custom_Date'].setValue(null);
         this.Form.controls['Code_Custom_Month'].setValue(null);
      }
   }
   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.HrConfig_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Crm Getting Error!, But not Identify!' });
            }
         });
      }
   }

   Update() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.HrConfig_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Crm Getting Error!, But not Identify!' });
            }
         });
      }
   }
}
