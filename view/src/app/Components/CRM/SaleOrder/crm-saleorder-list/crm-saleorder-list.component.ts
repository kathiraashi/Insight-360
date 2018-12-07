import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ModelConfirmDeliverComponent } from 'src/app/models/CRM/Quotations/model-confirm-deliver/model-confirm-deliver.component';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';

@Component({
  selector: 'app-crm-saleorder-list',
  templateUrl: './crm-saleorder-list.component.html',
  styleUrls: ['./crm-saleorder-list.component.css']
})
export class CrmSaleorderListComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   DeliverButtonShow: Boolean = true;
   _List: any [] = [];
   bsModalRef: BsModalRef;
   Quote_Id: any;
   SaleOrder_Id: any;
   Order_Id: any;
   _InventoryConfigList: any;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Account_Service: AccountSettingsService,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
      private Configuration_Service: ConfigurationService

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Customer List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmSaleOrder_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(this._List);
            this.Loader = (this._List) ? false : true;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      this.Configuration_Service.InventoryConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._InventoryConfigList = DecryptedData;
            console.log(this._InventoryConfigList);
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
      this.Order_Id = this._List[_index].Quote_Id._id;
      this.SaleOrder_Id = this._List[_index]._id;
      this.DeliverButtonShow = (this._List[_index].Status === 'Confirmed') ? true : false;
   }
   View() {
      this.router.navigate(['/crm_saleorder_view', this.SaleOrder_Id]);
   }
   DeliverOrder() {
      if (this._InventoryConfigList.Sales_Update_Stock_by === 'Delivery_Order') {
         const initialState = {
            Type: 'Deliver_Order',
            Data: this.SaleOrder_Id,
            Reference_Key: 'Sale Order'
         };
         this.bsModalRef = this.modalService.show(ModelConfirmDeliverComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
            const i = this._List.findIndex(x => (x._id === this.SaleOrder_Id ));
            this._List[i].SaleOrder_Status = 'Awaiting Delivery';
         });
      } else {
         const initialState = {
            Type: 'Confirm_Deliver',
            Data: this.Order_Id,
            SaleOrder_Id: this.SaleOrder_Id,
            Reference_Key: 'Sale Order'
         };
         this.bsModalRef = this.modalService.show(ModelConfirmDeliverComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
            const i = this._List.findIndex(x => (x._id === this.SaleOrder_Id ));
            this._List[i].SaleOrder_Status = 'Delivered';
         });
      }
   }
}
