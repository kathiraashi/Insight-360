import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelOthersCustomerViewComponent } from '../../../../../../models/CRM/Customers/model-others-customer-view/model-others-customer-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { ActivatedRoute } from '@angular/router';
import { CrmService } from './../../../../../../services/Crm/crm.service';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-others-crm-customers-view',
  templateUrl: './others-crm-customers-view.component.html',
  styleUrls: ['./others-crm-customers-view.component.css']
})
export class OthersCrmCustomersViewComponent implements OnInit {

   bsModalRef: BsModalRef;
   crm_customer_id: any;
   Company_Id: any;
   User_Id: any;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   _OthersList: any[] = [];
   constructor(
      private modalService: BsModalService,
      private active_route: ActivatedRoute,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public Service: CrmService,
      private Login_Service: LoginService,

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Customer Id
      this.crm_customer_id = this.active_route.snapshot.params['crm_customer_id'];
      // Get Crm Others List
      const Data = { 'Company_Id' : this.Company_Id, 'crm_customer_id': this.crm_customer_id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.CrmOthers_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._OthersList = DecryptedData;
            this.Loader = (this._OthersList) ? false : true ;
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
  }
  RegistrationType() {
   const initialState = {
     Type: 'Create',
     Data: this.crm_customer_id
   };
   this.bsModalRef = this.modalService.show(ModelOthersCustomerViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
   this.bsModalRef.content.onClose.subscribe(u => {
      this._OthersList.splice(0, 0, u['Response']);
   });
   }

   View(_index) {
      const initialState = {
         Type: 'View',
         Data: this._OthersList[_index]
       };
       this.bsModalRef = this.modalService.show(ModelOthersCustomerViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
   Edit(_index) {
      console.log('edit');
   }
   Delete(_index) {
      console.log('delete');
   }
}
