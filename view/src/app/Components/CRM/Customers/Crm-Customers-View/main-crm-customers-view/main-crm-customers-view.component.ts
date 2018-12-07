import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelContactCustomersViewComponent } from '../../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelActivitiesCustomersViewComponent } from '../../../../../models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
import { ModelPaymentsCustomersViewComponent } from '../../../../../models/CRM/Customers/model-payments-customers-view/model-payments-customers-view.component';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-main-crm-customers-view',
  templateUrl: './main-crm-customers-view.component.html',
  styleUrls: ['./main-crm-customers-view.component.css']
})
export class MainCrmCustomersViewComponent implements OnInit {

   Active_Tab;
   _Data;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Product_Id: any;
   Loader: Boolean = true;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   bsModalRef: BsModalRef;
   crm_customer_id: any;

   constructor(
      private modalService: BsModalService,
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
       // Get Crm Customer View
       this.active_route.url.subscribe(u => {
         this.crm_customer_id = this.active_route.snapshot.params['crm_customer_id'];
         const Data = {'Company_Id': this.Company_Id, 'crm_customer_id': this.crm_customer_id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmCustomer_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               this.Loader = (this._Data) ? false : true ;
               if (this._Data) {
                  this.Active_Tab = 'About';
               }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
            }
         });
      });
   }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
   this.Active_Tab = name;
   }

   CreateContact() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelContactCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  CreateActivity() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitiesCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  CreatePayments() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPaymentsCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
}
