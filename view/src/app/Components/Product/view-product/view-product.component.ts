import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { ProductService } from './../../../services/Product/product.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

   _Data: any[] = [];
   Product_Id: any;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   constructor(
      private Product_Service: ProductService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private active_route: ActivatedRoute,
      private Login_Service: LoginService,
   ) { }
  ngOnInit() {
     // get user login info
     this.User_Info = this.Login_Service.LoggedUserInfo();
     this.Company_Id = this.User_Info.Company_Id;
     this.User_Id = this.User_Info._id;
     this.active_route.url.subscribe(u => {
      this.Product_Id = this.active_route.snapshot.params['Product_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Product_Id': this.Product_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Product_Service.Product_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               this.Loader = (this._Data) ? false : true;
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

}
