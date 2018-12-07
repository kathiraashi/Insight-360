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
import { LoginService } from './../../../../services/LoginService/login.service';
import { ModelQuoteConfirmComponent } from 'src/app/models/Purchase/Quote/model-quote-confirm/model-quote-confirm.component';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';

@Component({
  selector: 'app-purchase-quotations-list',
  templateUrl: './purchase-quotations-list.component.html',
  styleUrls: ['./purchase-quotations-list.component.css']
})
export class PurchaseQuotationsListComponent implements OnInit {

   bsModalRef: BsModalRef;
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   _List: any;
   Loader: Boolean = true;
   PurchaseQuote_Id: any;
   _PurchaseConfigList: any;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      public PurchaseConfig_Service: ConfigurationService,

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // Get Purchase Quote List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseQuote_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            if (this._List) {this.Loader = false; }
            console.log(this._List);
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
   }
   View() {
      this.router.navigate(['Purchase_Quotation_View', this.PurchaseQuote_Id]);
   }
   Edit() {
      this.router.navigate(['Purchase_Quotation_Edit', this.PurchaseQuote_Id]);
   }
   ConfirmOrder() {
      const initialState = {
         Type: 'Confirm Order',
         Data: this.PurchaseQuote_Id
      };
      this.bsModalRef = this.modalService.show(ModelQuoteConfirmComponent, Object.assign({initialState}, { class: '', ignoreBackdropClick: true }));
   }
   DeletePurchaseQuotation() {
      const initialState = {
         Text: 'Purchase Quotation'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm', ignoreBackdropClick: true }));
   }
}
