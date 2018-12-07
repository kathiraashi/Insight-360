import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { ModelQuoteConfirmComponent } from 'src/app/models/Purchase/Quote/model-quote-confirm/model-quote-confirm.component';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ModelReceiveConfirmComponent } from 'src/app/models/Purchase/Order/model-receive-confirm/model-receive-confirm.component';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {

   bsModalRef: BsModalRef;
   User_Info: any;
   Company_Id;
   User_Id;
   User_Type: any;
   _List: any;
   Loader: Boolean = true;
   ReceiveButtonShow: Boolean = true;
   CancelButtonShow: Boolean = true;
   PurchaseQuote_Id: any;
   _PurchaseConfigList: any;
   _InventoryConfigList: any;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      public PurchaseConfig_Service: ConfigurationService,
      private Configuration_Service: ConfigurationService
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Purchase Quote List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseQuote_OrderList({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            if (this._List) {this.Loader = false; }
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
   ActionIndex(_index) {
      this.PurchaseQuote_Id = this._List[_index]._id;
      const Status = this._List[_index].Status;
      this.ReceiveButtonShow = (this._List[_index].Status === 'Order_Confirmed') ? true : false;
      this.CancelButtonShow = (this._List[_index].Status !== 'Received') ? true : false;
   }
   View() {
      this.router.navigate(['Purchase_Quotation_View', this.PurchaseQuote_Id]);
   }
   ReceiveOrder() {
      if (this._InventoryConfigList.Purchase_Update_Stock_by === 'To_Receive') {
         const initialState = {
            Type: 'To_Receive',
            Data: this.PurchaseQuote_Id,
            Reference_Key: 'Sale Order'
         };
         this.bsModalRef = this.modalService.show(ModelReceiveConfirmComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
            const i = this._List.findIndex(x => (x._id === this.PurchaseQuote_Id ));
            this._List[i].Quote_Status = 'Awaiting Delivery';
         });
      } else {
         const initialState = {
            Type: 'Confirm_Receive',
            Data: this.PurchaseQuote_Id,
            Reference_Key: 'Purchase Order'
         };
         this.bsModalRef = this.modalService.show(ModelReceiveConfirmComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
            const i = this._List.findIndex(x => (x._id === u.Order_Id ));
            this._List[i].Quote_Status = 'Received';
         });
      }
   }
   DeletePurchaseOrders() {
      const initialState = {
         Text: 'Purchase Orders'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
