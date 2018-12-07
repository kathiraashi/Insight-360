import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { ProductService } from './../../../services/Product/product.service';
import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import { ProductSettingsService } from './../../../services/settings/ProductSettings/product-settings.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
   _Data: any[] = [];
   Product_Id: any;
   _ProductType: any[] = ['Consumable', 'Stockable', 'Serviceable'];
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Advance_Edit: Boolean = false;
   Loader: Boolean = true;
   Form: FormGroup;
   _UnitOfMeasures: any;
   constructor(
      private Product_Service: ProductService,
      private Product_Settings_Service: ProductSettingsService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private active_route: ActivatedRoute,
      private Config_Service: ConfigurationService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
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
               this.SetFormValue();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
            }
         });
      });
      // get UOM list
      const UOMData = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Product_Id': this.Product_Id};
      let UOMInfo = CryptoJS.AES.encrypt(JSON.stringify(UOMData), 'SecretKeyIn@123');
      UOMInfo = UOMInfo.toString();
      this.Product_Settings_Service.UOM_List({'Info': UOMInfo}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._UnitOfMeasures = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toastr.NewToastrMessage(
             {Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' } );
         }
      });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         Product_Name_withAttribute: new FormControl(null, {
            validators: Validators.required,
            asyncValidators: [this.Product_Name_withAttribute_AsyncValidators.bind(this) ],
            updateOn: 'blur'
         }),
         Can_Be_Sold: new FormControl(null, Validators.required),
         Can_Be_Purchased: new FormControl(null, Validators.required),
         HSN_Code: new FormControl(null),
         Price: new FormControl(null, Validators.required),
         UOM: new FormControl(null, Validators.required),
         Product_Type: new FormControl(null, Validators.required),
         Description: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   Product_Name_withAttribute_AsyncValidators(control: AbstractControl) {
      const Data = { Product_Name_withAttribute : control.value, Company_Id : this.Company_Id, User_Id : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Product_Service.Product_Name_withAttribute_AsyncValidators({'Info' : Info}).pipe(map(response => {
         if (this._Data['Product_Name_withAttribute'] === control.value) {
            return null;
         } else {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { Product_Name_withAttribute_NotAvailable: true };
            }
         }
      }));

   }

   SetFormValue() {
      this.Form.controls['Product_Name_withAttribute'].setValue(this._Data['Product_Name_withAttribute']);
      this.Form.controls['Can_Be_Sold'].setValue(this._Data['Can_Be_Sold']);
      this.Form.controls['Can_Be_Purchased'].setValue(this._Data['Can_Be_Purchased']);
      this.Form.controls['HSN_Code'].setValue(this._Data['HSN_Code']);
      this.Form.controls['Price'].setValue(this._Data['Price']);
      this.Form.controls['UOM'].setValue(this._Data['UOM']._id);
      this.Form.controls['Product_Type'].setValue(this._Data['Product_Type']);
      this.Form.controls['Description'].setValue(this._Data['Description']);
      this.Form.controls['Company_Id'].setValue(this._Data['Company_Id']);
      this.Form.controls['User_Id'].setValue(this._Data['User_Id']);
      this.Loader = false;
   }

   AdvanceEdit() {
      this.Advance_Edit = !this.Advance_Edit;
   }
   Submit() {
      console.log(this.Form.getRawValue);
   }


}
