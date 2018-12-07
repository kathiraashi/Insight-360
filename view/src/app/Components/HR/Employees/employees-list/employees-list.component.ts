import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { HrSettingsService } from 'src/app/services/settings/HrSettings/hr-settings.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { DeleteConfirmationComponent } from '../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   bsModalRef: BsModalRef;
   _List: any;
   constructor(
      private modalService: BsModalService,
      private Config_Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private Login_Service: LoginService,
      private CompanySettingService: CompanySettingsService,
      private HrSettingService: HrSettingsService,
      private Hr_Service: HrService
   ) { }
  ngOnInit() {
     // get user login info
     this.User_Info = this.Login_Service.LoggedUserInfo();
     this.Company_Id = this.User_Info.Company_Id;
     this.User_Id = this.User_Info._id;
     this.User_Type = this.User_Info.User_Type['User_Type'];
     const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     // get Employee lsit
     this.Hr_Service.HrEmployee_List({'Info': Info}).subscribe( response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._List = DecryptedData;
         console.log(this._List);
      } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
     } else {
        this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
      }
   });
  }
  DeleteEmployee() {
   const initialState = {
      Text: 'Employee'
   };
   this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
}
}
