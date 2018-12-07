import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { ProductService } from './../../../../services/Product/product.service';
import { InventoryService } from './../../../../services/Inventory/inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ModelConfirmDeliverComponent } from 'src/app/models/CRM/Quotations/model-confirm-deliver/model-confirm-deliver.component';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-inventory-delivery-orders-edit',
  templateUrl: './inventory-delivery-orders-edit.component.html',
  styleUrls: ['./inventory-delivery-orders-edit.component.css']
})
export class InventoryDeliveryOrdersEditComponent implements OnInit {
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
   _Product: any;
   _temProductList: any;
   Form: FormGroup;
   items: FormArray;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private active_route: ActivatedRoute,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
      public Product_Service: ProductService,
      public Inventory_Service: InventoryService,
      private formBuilder: FormBuilder,
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
         // get products
         this.Product_Service.Product_List_Purchase({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Product = DecryptedData;
               this._temProductList = this._Product;
               // if (this._temProductList) { this.simpleEdit(); }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
         // get Deliver Order Details
         this.Inventory_Service.DeliverOrder_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._DeliverOrder_Details = DecryptedData.DeliverOrder_Details;
               this._ProductList = DecryptedData.Product_Details;
               if (this._ProductList && this._DeliverOrder_Details) { this.simpleEdit(); this.Loader = false; }
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
      this.Form = new FormGroup({
         InventoryOrder_Id: new FormControl(this.Order_Id),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
         items: this.formBuilder.array([]),
      });
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
   simpleEdit() {
      this.items = this.Form.get('items') as FormArray;
      this._ProductList.map(obj => {
         const Group: FormGroup = this.formBuilder.group({
            Product: new FormControl({value: obj.Product_Id._id, disabled: true }),
            Description: new FormControl({value: obj.Product_Id.Description, disabled: true }),
            Quantity: new FormControl({value: obj.Quantity, disabled: true }),
            Approved_Quantity: new FormControl(obj.Approved_Quantity, [Validators.required]),
         });
         this.items.push(Group);
      });
   }
   Submit() {
      if (this.Form.valid) {
         console.log(this.Form.value);
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.DeliverOrder_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Inventory_deliveryorder_list']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }

}
