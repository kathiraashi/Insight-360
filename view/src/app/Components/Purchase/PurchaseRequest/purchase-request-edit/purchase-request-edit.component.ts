import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   PurchaseRequest_Id: any;
   Purchase_Request_Details: any;
   Product_Details: any;
   items: any;
   Form: FormGroup;
   _temProductList: any;
   _ProductList: any;
   Loader: Boolean = true;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Product_Service: ProductService,
      public Purchase_Service: PurchaseService,
      private formBuilder: FormBuilder,
      private Login_Service: LoginService,
      private active_route: ActivatedRoute

   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // Get Details
      this.active_route.url.subscribe(u => {
         this.PurchaseRequest_Id = this.active_route.snapshot.params['PurchaseRequest_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseRequest_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Purchase_Request_Details = DecryptedData.Purchase_Request_Details;
               this.Product_Details = DecryptedData.Product_Details;
               if (this.Purchase_Request_Details && this.Product_Details) {
                  this.simpleEdit();
                  this.Loader = false;
               }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
            }
         });
         this.Product_Service.Product_List_Purchase({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._ProductList = DecryptedData;
               this._temProductList = this._ProductList;
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
      this.Form = new FormGroup({
         PurchaseRequest_Id: new FormControl(null),
         Requested_Number: new FormControl({value: null, disabled: true}),
         Requested_Date: new FormControl({value: null, disabled: true}),
         Requested_By: new FormControl({value: this.User_Info.Name , disabled: true}),
         items: this.formBuilder.array([]),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   // Form Array
   createItems(): FormGroup {
      return this.formBuilder.group({
         Product: new FormControl(null, [Validators.required]),
         Description: new FormControl(null),
         Required_Quantity: new FormControl(null, Validators.required),
         Required_Date: new FormControl(null, Validators.required),
      });
   }
   // add items to bill
   addItem(): void {
      this.items = this.Form.get('items') as FormArray;
      this.items.push(this.createItems());
      this.FilterProduct();
   }
    // Delete item from the bill
    Delete(_index) {
      this.items.removeAt(_index);
      this.FilterProduct();
      }
    // Filter the selected product
    FilterProduct() {
      const selectedProduct = [];
      this.Form.controls['items'].value.map(obj => {
         if (obj.Product !== null) {
         selectedProduct.push(obj.Product);
         }
      });
      this._temProductList = this._temProductList.map(obj => {
         if (selectedProduct.includes(obj._id)) {
            obj.disabled = true;
         } else {
            obj.disabled = false;
         }
         return obj;
      });

   }
   simpleEdit() {
      this.Form.controls['PurchaseRequest_Id'].setValue(this.Purchase_Request_Details._id);
      this.Form.controls['Requested_Number'].setValue(this.Purchase_Request_Details.Requested_Number);
      this.Form.controls['Requested_Date'].setValue(this.Purchase_Request_Details.Requested_Date);
      this.items = this.Form.get('items') as FormArray;
      this.Product_Details.map(obj => {
         const Group: FormGroup = this.formBuilder.group({
            Product: new FormControl(obj.Product_Id._id, [Validators.required]),
            Description: new FormControl(obj.Description),
            Required_Quantity: new FormControl(obj.Required_Quantity, Validators.required),
            Required_Date: new FormControl(obj.Required_Date[0], Validators.required),
         });
         this.items.push(Group);
         this.FilterProduct();
      });
   }
   Submit() {
      this.Loader = true;
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseRequest_Edit({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/purchase_request_list']);
               this.Loader = false;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Edit Purchase Request Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
