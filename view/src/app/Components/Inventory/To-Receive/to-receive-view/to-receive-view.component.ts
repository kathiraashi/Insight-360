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
import { ModelReceiveConfirmComponent } from 'src/app/models/Purchase/Order/model-receive-confirm/model-receive-confirm.component';
import { InventoryService } from './../../../../services/Inventory/inventory.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';

@Component({
  selector: 'app-to-receive-view',
  templateUrl: './to-receive-view.component.html',
  styleUrls: ['./to-receive-view.component.css']
})
export class ToReceiveViewComponent implements OnInit {
   Active_Tab = 'Product_Details';
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   Order_Id: any;
   Product_Details: any;
   Loader: Boolean = true;
   ToReceive_Details: any;
   bsModalRef: BsModalRef;
   _ConfigList: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      private active_route: ActivatedRoute,
      private modalService: BsModalService,
      private Inventory_Service: InventoryService,
      private Config_Service: ConfigurationService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // Get Purchase Quote List
      this.active_route.url.subscribe(u => {
         this.Order_Id = this.active_route.snapshot.params['ToReceive_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Order_Id': this.Order_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Config_Service.InventoryConfig_List({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._ConfigList = DecryptedData;
               console.log(this._ConfigList);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
         this.Inventory_Service.ToReceive_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.ToReceive_Details = DecryptedData.ToReceive_Details;
               this.Product_Details = DecryptedData.Product_Details;
               if (this.Product_Details && this.ToReceive_Details) { this.Loader = false; }
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
   validate() {
      const QuantityArray = this.Product_Details.map(x => x.Approved_Quantity === x.Quantity );
      const CreateBackOrder_byQuantity = QuantityArray.every(y => y === true);
      if (this._ConfigList.Purchase_Update_Stock_by === 'To_Receive' && this._ConfigList.Purchase_Create_Back_Order === 'Yes' && !CreateBackOrder_byQuantity) {
         const initialState = {
            Type: 'Create_BackOrder',
            Data: this.Order_Id,
            Reference_Key: 'ToReceive'
         };
         this.bsModalRef = this.modalService.show(ModelReceiveConfirmComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(u => {
           if (u.Status) {
            this.router.navigate(['to_receive_list']);
           }
         });
      } else {
         this.ReceiveOrder();
      }
   }
   ReceiveOrder() {
      const initialState = {
         Type: 'No_Create_BackOrder',
         Data: this.Order_Id,
         Reference_Key: 'ToReceive'
      };
      this.bsModalRef = this.modalService.show(ModelReceiveConfirmComponent, Object.assign({initialState}, { class: '' }));
      this.bsModalRef.content.onClose.subscribe(u => {
        if (u.Status) {
         this.router.navigate(['to_receive_list']);
        }
      });
   }

}
