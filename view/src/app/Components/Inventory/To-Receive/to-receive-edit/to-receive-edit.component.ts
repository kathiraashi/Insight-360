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
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-to-receive-edit',
  templateUrl: './to-receive-edit.component.html',
  styleUrls: ['./to-receive-edit.component.css']
})
export class ToReceiveEditComponent implements OnInit {
   Active_Tab = 'Product_Details';
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   Order_Id: any;
   Product_Details: any;
   Loader: Boolean = true;
   ToReceive_Details: any;
   bsModalRef: BsModalRef;
   Form: FormGroup;
   items: FormArray;
   _Product: any;
   _temProductList: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      private active_route: ActivatedRoute,
      private modalService: BsModalService,
      private formBuilder: FormBuilder,
      public Product_Service: ProductService,
      private Inventory_Service: InventoryService
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
      this.Inventory_Service.ToReceive_View({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.ToReceive_Details = DecryptedData.ToReceive_Details;
            this.Product_Details = DecryptedData.Product_Details;
            if (this.Product_Details && this.ToReceive_Details) { this.simpleEdit(); this.Loader = false; }
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
      });

      // if (this.Product_Details && this.ToReceive_Details && this._temProductList) { this.simpleEdit(); this.Loader = false; }
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
      this.Product_Details.map(obj => {
         const Group: FormGroup = this.formBuilder.group({
            Product: new FormControl({value: obj.Product_Id._id, disabled: true }),
            Description: new FormControl({value: obj.Product_Id.Description, disabled: true }),
            Quantity: new FormControl({value: obj.Quantity, disabled: true }),
            Approved_Quantity: new FormControl(obj.Approved_Quantity, [Validators.required, Validators.max(obj.Quantity)]),
         });
         this.items.push(Group);
      });
   console.log(this.Form);
   }
   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.ToReceive_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/to_receive_list']);
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
