import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { InventoryService } from './../../../../services/Inventory/inventory.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-list-stock-values',
  templateUrl: './list-stock-values.component.html',
  styleUrls: ['./list-stock-values.component.css']
})
export class ListStockValuesComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _List: any[] = [];
   Loader: Boolean = true;
   Stock_Id: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Inventory_Service: InventoryService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Stock List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Inventory_Service.StockDetails_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            this.Loader = (this._List) ? false : true;
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
      this.Stock_Id = this._List[_index]._id;
   }
   View() {
     this.router.navigate(['Stock_Values_View', this.Stock_Id]);
   }
}
