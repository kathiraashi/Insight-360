import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-saleorder-view',
  templateUrl: './crm-saleorder-view.component.html',
  styleUrls: ['./crm-saleorder-view.component.css']
})
export class CrmSaleorderViewComponent implements OnInit {
  Active_Tab = 'Product_Details';
  Company_Id;
  User_Id;
  User_Info: any;
  User_Type: any;
  Loader: Boolean = true;
  DeliverButtonShow: Boolean = true;
  SaleOrder_Id: any;
  _QuoteData: any;
  _ProductList: any[] = [];
   _SaleOrderData: any;

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
      // Get Crm Quote View
      this.active_route.url.subscribe(u => {
         this.SaleOrder_Id = this.active_route.snapshot.params['SaleOrder_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'SaleOrder_Id': this.SaleOrder_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmSaleOrder_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._SaleOrderData = DecryptedData.SaleOrder_Details;
               this._QuoteData = DecryptedData.Quote_Details;
               this._ProductList = DecryptedData.Product_Details;
               this.DeliverButtonShow = (this._SaleOrderData.Status === 'Confirmed') ? true : false;
               this.Loader = (DecryptedData) ? false : true;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
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
}
