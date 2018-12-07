import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { ModelQuoteConfirmComponent } from 'src/app/models/Purchase/Quote/model-quote-confirm/model-quote-confirm.component';
import { ModelReceiveConfirmComponent } from 'src/app/models/Purchase/Order/model-receive-confirm/model-receive-confirm.component';
@Component({
  selector: 'app-purchase-quotations-view',
  templateUrl: './purchase-quotations-view.component.html',
  styleUrls: ['./purchase-quotations-view.component.css']
})
export class PurchaseQuotationsViewComponent implements OnInit {
   Active_Tab = 'Product_Details';
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   PurchaseQuote_Id: any;
   Product_Details: any;
   Loader: Boolean = true;
   CancelButtonShow: Boolean = true;
   ReceiveButtonShow: Boolean = true;
   ConfirmOrderButtonShow: Boolean = true;
   EditButtonShow: Boolean = true;
   Quote_Details: any;
   bsModalRef: BsModalRef;
   _InventoryConfigList: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      private active_route: ActivatedRoute,
      private modalService: BsModalService,
      private Configuration_Service: ConfigurationService

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
       // Get Purchase Quote List
       this.active_route.url.subscribe(u => {
         this.PurchaseQuote_Id = this.active_route.snapshot.params['PurchaseQuote_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseQuote_Id': this.PurchaseQuote_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseQuote_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Quote_Details = DecryptedData.Quote_Details;
               this.Product_Details = DecryptedData.Product_Details;
               this.ConfirmOrderButtonShow = (this.Quote_Details.Status === 'Draft') ? true : false;
               this.EditButtonShow = (this.Quote_Details.Status === 'Draft') ? true : false;
               this.CancelButtonShow = (this.Quote_Details.Status !== 'Received') ? true : false;
               this.ReceiveButtonShow = (this.Quote_Details.Status === 'Order_Confirmed') ? true : false;
               if (this.Product_Details && this.Quote_Details) { this.Loader = false; }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
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
      });
    }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
   this.Active_Tab = name;
   }
   Edit() {
      this.router.navigate(['Purchase_Quotation_Edit', this.PurchaseQuote_Id]);
   }
   ConfirmOrder() {
      const initialState = {
         Type: 'Confirm Order',
         Data: this.PurchaseQuote_Id
      };
      this.bsModalRef = this.modalService.show(ModelQuoteConfirmComponent, Object.assign({initialState}, { class: '' }));
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
            this.ReceiveButtonShow = (u.Status) ? false : true;
            this.CancelButtonShow = (u.Status) ? false : true;
         });
      } else {
         const initialState = {
            Type: 'Confirm_Receive',
            Data: this.PurchaseQuote_Id,
            Reference_Key: 'Purchase Order'
         };
         this.bsModalRef = this.modalService.show(ModelReceiveConfirmComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
            this.ReceiveButtonShow = (u.Status) ? false : true;
            this.CancelButtonShow = (u.Status) ? false : true;
         });
      }
   }
}
