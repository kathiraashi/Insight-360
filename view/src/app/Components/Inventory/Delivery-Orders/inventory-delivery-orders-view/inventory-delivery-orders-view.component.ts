import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { InventoryService } from './../../../../services/Inventory/inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { ModelConfirmDeliverComponent } from 'src/app/models/CRM/Quotations/model-confirm-deliver/model-confirm-deliver.component';
@Component({
  selector: 'app-inventory-delivery-orders-view',
  templateUrl: './inventory-delivery-orders-view.component.html',
  styleUrls: ['./inventory-delivery-orders-view.component.css']
})
export class InventoryDeliveryOrdersViewComponent implements OnInit {
   Active_Tab = 'Product_Details';
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   Order_Id: any;
   SaleOrder_Id: any;
   _QuoteData: any;
   _ProductList: any[] = [];
   _SaleOrderData: any;
   bsModalRef: BsModalRef;
   _DeliverOrder_Details: any;
   _ConfigList: any;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private active_route: ActivatedRoute,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
      private Config_Service: ConfigurationService,
      public Inventory_Service: InventoryService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Quote View
      this.active_route.url.subscribe(u => {
         this.Order_Id = this.active_route.snapshot.params['Order_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Order_Id': this.Order_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get configuration
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
         // Get Deliver order details
         this.Inventory_Service.DeliverOrder_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._DeliverOrder_Details = DecryptedData.DeliverOrder_Details;
               this._ProductList = DecryptedData.Product_Details;
               console.log(DecryptedData);
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
   validate() {
      const QuantityArray = this._ProductList.map(x => x.Approved_Quantity === x.Quantity );
      const CreateBackOrder_byQuantity = QuantityArray.every(y => y === true);
      console.log(QuantityArray);
      console.log(CreateBackOrder_byQuantity);
      if (this._ConfigList.Sales_Update_Stock_by === 'Delivery_Order' && this._ConfigList.Sales_Create_Back_Order === 'Yes' && !CreateBackOrder_byQuantity) {
         const initialState = {
            Type: 'Confirm_Deliver',
            Data: this.Order_Id,
            Reference_Key: 'DeliverOrder',
            Create_BackOrder : 'Yes'
         };
         this.bsModalRef = this.modalService.show(ModelConfirmDeliverComponent, Object.assign({initialState}, { class: '' , ignoreBackdropClick: true}));
         this.bsModalRef.content.onClose.subscribe(u => {
           if (u.Status) {
            this.router.navigate(['Inventory_deliveryorder_list']);
           }
         });
      } else {
         this.DeliverOrder();
      }
   }
   DeliverOrder() {
      const initialState = {
         Type: 'Confirm_Deliver',
         Data: this.Order_Id,
         Reference_Key: 'DeliverOrder',
         Create_BackOrder : 'No'
      };
      this.bsModalRef = this.modalService.show(ModelConfirmDeliverComponent, Object.assign({initialState}, { class: '', ignoreBackdropClick: true }));
      this.bsModalRef.content.onClose.subscribe(u => {
        if (u.Status) {
         this.router.navigate(['Inventory_deliveryorder_list']);
        }
      });
   }
   Edit() {
      this.router.navigate(['/Inventory_deliveryorder_Edit', this.Order_Id]);
   }
}
