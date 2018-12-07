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

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}
@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class PurchaseRequestCreateComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info;
   items: any;
   _ProductList;
   _UserDetails;
   toDay = new Date();
   Form: FormGroup;
   _temProductList: any[];
   Loader: Boolean = true;
   Uploading: Boolean = false;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Product_Service: ProductService,
      public Purchase_Service: PurchaseService,
      private formBuilder: FormBuilder,
      private Login_Service: LoginService
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // Get User Details
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // get Company products
      this.Product_Service.Product_List_Purchase({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ProductList = DecryptedData;
            console.log(this._ProductList);
            this._temProductList = this._ProductList;
            if (this._temProductList) {
               this.Loader = false;
            }
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
      this.Form = new FormGroup({
         Requested_Number: new FormControl(null,  {
                                                   validators: Validators.required,
                                                   asyncValidators: [ this.PurchaseRequest_AsyncValidate.bind(this) ],
                                                   updateOn: 'blur' }),
         Requested_Date: new FormControl(this.toDay),
         Requested_By: new FormControl(this.User_Info.Name),
         items: this.formBuilder.array([this.createItems()]),
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
   // Purchase Request Async Validator
   PurchaseRequest_AsyncValidate( control: AbstractControl ) {
      const Data = { Requested_Number: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Purchase_Service.PurchaseRequest_Number_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Number_NotAvailable: true };
         }
      }));
   }
   // set price for respective selected item
   setProductDetails(value, _index) {
      console.log(this.Form);
      if (value !== null) {
         const index = this._ProductList.findIndex(x => x._id === value);
         this.Form.controls['items']['controls'][_index]['controls'].Description.setValue(this._ProductList[index].Description);
      } else {
         this.Form.controls['items']['controls'][_index]['controls'].Description.setValue(null);
      }
      this.FilterProduct();
   }
   // Submit the request
   Submit () {
      this.Loader = true;
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseRequest_Create({ 'Info': Info }).subscribe( response => {
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
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
            this.Uploading = false;
         });
      }
   }

}
