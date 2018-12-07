import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelConfirmOrderComponent } from '../../../../models/CRM/Quotations/model-confirm-order/model-confirm-order.component';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-quatations-list',
  templateUrl: './crm-quatations-list.component.html',
  styleUrls: ['./crm-quatations-list.component.css']
})
export class CrmQuatationsListComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   _List: any [] = [];
   bsModalRef: BsModalRef;
   Quote_Id: any;
   _ReviseList: any;
   toggleExpandStatus: Boolean = false;
   showReviseButton: Boolean;
   showConfirmButton: Boolean;
   showToggleOption: Boolean;
   Quote_Details: any;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Account_Service: AccountSettingsService,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Quote List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmQuote_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            this.Loader = (this._List) ? false : true;
            this._List = this._List.map(obj => {
               obj.If_Expand = false;
               return obj;
            });
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


   ActionGetId(_index) {
     this.Quote_Id =  this._List[_index]._id;
     this.toggleExpandStatus = this._List[_index].If_Expand;
      if (this._List[_index].Status === 'Valid' || this._List[_index].Status === 'Revised') {
        this.showReviseButton = true;
        this.showConfirmButton = true;
      } else {
         this.showReviseButton = false;
         this.showConfirmButton = false;
      }
      if (this._List[_index].Status === 'Revised') {
         this.showToggleOption = true;
      } else {
         this.showToggleOption = false;
      }
   }

   ShowRevisedQuotes() {
      this._List = this._List.map(obj => {
         obj.If_Expand = false;
         return obj;
      });
      const _index = this._List.findIndex(obj => obj._id === this.Quote_Id);
      this._List[_index].If_Expand = !this.toggleExpandStatus;
      this.GetRevisedList();
   }

   GetRevisedList() {
      this._ReviseList = [];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, 'Quote_Id': this.Quote_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmRevise_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ReviseList = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }
   View() {
      this.router.navigate(['/crm_quotations_view', this.Quote_Id]);
   }
   Revise() {
      this.router.navigate(['/crm_revise_create', this.Quote_Id]);
   }
   ConfirmOrder() {
      const initialState = {
         Type: 'Create',
         Data: this.Quote_Id
      };
      this.bsModalRef = this.modalService.show(ModelConfirmOrderComponent, Object.assign({initialState}, { class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response.Status) {
            this.router.navigate(['/crm_saleorder_list']);
         }
      });
   }
}
