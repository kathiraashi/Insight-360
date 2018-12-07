import { Component, OnInit, Input  } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-about-crm-customers-view',
  templateUrl: './about-crm-customers-view.component.html',
  styleUrls: ['./about-crm-customers-view.component.css']
})
export class AboutCrmCustomersViewComponent implements OnInit {
   @Input() CustomerData: Object;
   Active_Tab = 'About';
   _Data;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Product_Id: any;
   Company_Id: any;
   User_Id: any;
   User_Info: any;
   User_Type: any;
   crm_customer_id: any;
   customClass: String = 'customClass';

   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private active_route: ActivatedRoute,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // SubModule Permissions
      const Permissions = this.PermissionCheck.SubModulePermissionValidate('Settings_Product_Settings');
      if (Permissions['Status']) {
         this._Create = Permissions['Create_Permission'];
         this._View = Permissions['View_Permission'];
         this._Edit = Permissions['Edit_Permission'];
         this._Delete = Permissions['Delete_Permission'];
      }
   }

   ngOnInit() {
   }

}
