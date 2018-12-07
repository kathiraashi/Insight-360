import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../services/PermissionsCheck/permissions-check.service';
import { ProductSettingsService } from './../../../services/settings/ProductSettings/product-settings.service';
import { ProductService } from './../../../services/Product/product.service';
import { ConfigurationService } from './../../../services/Configuration/configuration.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
   _Variants: any[] = [];
   _UnitOfMeasures: any[] = [];
   _Data: any;
   _Filtered_Variants: any[] = [];
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   _ProductType: any[] = [{key: 'Type_1', value: 'Consumable'}, {key: 'Type_2', value: 'Stockable'}, {key: 'Type_3', value: 'Serviceable'}];
   Loader: Boolean = true;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Form: FormGroup;
   constructor(
      private Product_Service: ProductService,
      private Product_Settings_Service: ProductSettingsService,
      private Config_Service: ConfigurationService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public form_builder: FormBuilder,
      private Login_Service: LoginService,

      ) {
         // get user login info
         this.User_Info = this.Login_Service.LoggedUserInfo();
         this.Company_Id = this.User_Info.Company_Id;
         this.User_Id = this.User_Info._id;
         this.User_Type = this.User_Info.User_Type['User_Type'];
         // SubModule Permissions
         const Permissions = this.PermissionCheck.SubModulePermissionValidate('Settings_Product_Settings');
         if (Permissions['Status']) {
            this._Create = Permissions['Create_Permission'];
            this._View = Permissions['View_Permission'];
            this._Edit = Permissions['Edit_Permission'];
            this._Delete = Permissions['Delete_Permission'];
         }

         const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get UOM List
         this.Product_Settings_Service.UOM_List({'Info': Info}).subscribe( response => {
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
         // Get Product Configuration
         this.Config_Service.ProductConfig_List({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               this.Loader = (this._Data) ? false : true;
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
         Product_Name: new FormControl(null, {
            validators: Validators.required,
            asyncValidators: [this.Product_Name_AsyncValidators.bind(this) ],
            updateOn: 'blur'
         }),
         Can_Be_Sold: new FormControl(true, Validators.required),
         Can_Be_Purchased: new FormControl(true, Validators.required),
         Item_Code: new FormControl(null),
         HSN_Code: new FormControl(null),
         Price: new FormControl(null, Validators.required),
         UOM: new FormControl(null, Validators.required),
         Product_Type: new FormControl(null, Validators.required),
         Description: new FormControl(null),
         Variants_List: this.form_builder.array([]),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   Product_Name_AsyncValidators(control: AbstractControl) {
      const Data = { Product_Name : control.value, Company_Id : this.Company_Id, User_Id : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Product_Service.Product_Name_AsyncValidators({'Info' : Info}).pipe(map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Product_Name_NotAvailable: true };
         }
      }));
   }
   Variants_FormArray(): FormGroup {
      return new FormGroup({
         Attribute: new FormControl(null, Validators.required),
         Attribute_Values: new FormControl({value: '', disabled: false}, Validators.required)
      });
   }
   AddVariant() {
      const Group = this.Form.get('Variants_List') as FormArray;
      Group.push(this.Variants_FormArray());
   }
   Remove_Variant(index: number) {
      const control = <FormArray>this.Form.controls['Variants_List'];
      control.removeAt(index);
   }
   VariantChange(_index) {
      const status = this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute']['value'];
      if (status !== null) {
         this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].enable();
      } else {
         this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].disable();
         this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].setValue(null);
      }
   }
   Submit() {
      if (this.Form.valid) {
         this.Loader = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Product_Service.Product_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Product Successfully Created' });
               this.router.navigate(['/List_Product']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Product Getting Error!, But not Identify!' });
            }
            this.Loader = false;
         });
      }
   }


}
