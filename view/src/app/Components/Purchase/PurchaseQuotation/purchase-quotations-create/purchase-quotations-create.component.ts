import { Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl, FormControlName } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}
@Component({
  selector: 'app-purchase-quotations-create',
  templateUrl: './purchase-quotations-create.component.html',
  styleUrls: ['./purchase-quotations-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class PurchaseQuotationsCreateComponent implements OnInit {
   Active_Tab = 'Product_Details';
   Company_Id;
   User_Id;
   User_Info;
   items: any;
   _UserDetails;
   toDay = new Date();
   Form: FormGroup;
   _temProductList: any[];
   Loader: Boolean = true;
   SubLoader: Boolean = false;
   _VendorList: any;
   _ContactList: any;
   PurchaseRequest_Ref_Number: any;
   _Tax: any;
   _Product: any;
   _PurchaseRequestProduct: any;
   inline_tax_amount = 0;
   global_tax_amount = 0;
   _ConfigList: any;
   User_Type: any;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Product_Service: ProductService,
      public Purchase_Service: PurchaseService,
      public Account_Service: AccountSettingsService,
      private formBuilder: FormBuilder,
      private Login_Service: LoginService,
      public PurchaseConfig_Service: ConfigurationService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get User Details
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // Get Purchase Config
      this.PurchaseConfig_Service.PurchaseConfig_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ConfigList = DecryptedData;
            if (this._ConfigList) {
               this.checkQuoteRefNumber();
            }
            console.log(this._ConfigList);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get Vendor List
      this.Purchase_Service.PurchaseVendor_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._VendorList = DecryptedData;
            if (this._VendorList ) {
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
      // get Purchase Request List
      this.Purchase_Service.PurchaseRequest_ApprovedList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.PurchaseRequest_Ref_Number = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // get products
      this.Product_Service.Product_List_Purchase({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Product = DecryptedData;
            this._temProductList = this._Product;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get Taxes List
      this.Account_Service.Taxes_PurchaseList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Tax = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
      } else {
         this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
         }
      });
   }

   ngOnInit() {
      this.Form = new FormGroup({
         Vendor_Name: new FormControl(null, Validators.required),
         Contact: new FormControl(null, Validators.required),
         Quote_Ref_Number: new FormControl(null,  {asyncValidators: [ this.QuoteNumber_AsyncValidators.bind(this) ]}),
         Purchase_Request_Number: new FormControl(null),
         Quote_Date: new FormControl(this.toDay, Validators.required),
         Subject: new FormControl(null),
         Valid_Date: new FormControl(null),
         items: this.formBuilder.array([this.createItems()]),
         Sub_Total: new FormControl({value: 0.00, disabled: true}),
         Tax: new FormControl({value: 0.00, disabled: true}),
         Global_Product_Tax: new FormControl(null),
         Overall_Global_Tax: new FormControl(null),
         Total: new FormControl({value: 0.00, disabled: true}),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   // QuoteReefNumber
   checkQuoteRefNumber() {
      if (this._ConfigList.Purchase_Quotation === 'Auto') {
         this.Form.controls['Quote_Ref_Number'].clearAsyncValidators();
         this.Form.controls['Quote_Ref_Number'].setValidators(null);
         this.Form.controls['Quote_Ref_Number'].updateValueAndValidity();
      } else {
         this.Form.controls['Quote_Ref_Number'].setValidators(Validators.required);
      }
   }
   // Purchase Quote Async Validator
   QuoteNumber_AsyncValidators( control: AbstractControl ) {
      const Data = { Requested_Number: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Purchase_Service.QuoteNumber_AsyncValidators({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { QuoteNumber_NotAvailable: true };
         }
      }));
   }
   getContact(value) {
      // Get Vendor Contact list
      if (value !== '' && value !== null) {
         const Data = { 'Company_Id' : this.Company_Id, 'User_Id': this.User_Id, 'Vendor_Id': value };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.VendorContact_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._ContactList = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
      } else {
         this.Form.controls['Contact'].setValue(null);
         this._ContactList = [];
      }
   }
   getPurchaseRequest_ProductDetails(value) {
      this.SubLoader = true;
      if (value !== '' && value !== null) {
         this.Form.controls['Sub_Total'].setValue(null);
         this.Form.controls['Tax'].setValue(null);
         this.Form.controls['Total'].setValue(null);
         this.Form.controls['Global_Product_Tax'].setValue(null);
         this.global_tax_amount = 0;
         this.inline_tax_amount = 0;
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': value};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseRequest_View({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._PurchaseRequestProduct = DecryptedData.Product_Details;
            if (this._PurchaseRequestProduct) {
               this.setPurchaseRequestProduct();
            }
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
      } else {
         this.SubLoader = false;
         this.Form.setControl('items', new FormArray([this.createItems()]));
      }
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
   }
   // Form Array
   createItems(): FormGroup {
      return this.formBuilder.group({
         Product: new FormControl(null, [Validators.required]),
         Description: new FormControl(null),
         Price: new FormControl(null, [Validators.required]),
         Quantity: new FormControl(null, [Validators.required]),
         Taxable_Amount: new FormControl(null),
         Product_Tax: new FormControl(null),
         Overall_Inline_Tax: new FormControl(0),
         Tax_Amount: new FormControl(0),
         Product_Total: new FormControl(null),
      });
   }
   // add items to bill
   addItem(): void {
      this.items = this.Form.get('items') as FormArray;
      this.items.push(this.createItems());
   }
   // Delete item from the bill
   Delete(_index) {
      this.items.removeAt(_index);
      this.inlineOverAllCalculation();
      this.globalOverAllCalculation();
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
   // set price for respective selected item
   setProductDetails(value, _index) {
      if (value !== null) {
         const index = this._Product.findIndex(x => x._id === value);
         this.Form.controls['items']['controls'][_index].controls.Price.setValue(this._Product[index].Price);
         this.Form.controls['items']['controls'][_index].controls.Description.setValue(this._Product[index].Description);
      } else {
         this.Form.controls['items']['controls'][_index].controls.Price.setValue(0);
         this.Form.controls['items']['controls'][_index].controls.Description.setValue(null);
      }
      this.FilterProduct();
   }
   // set Selected Purchase Request Product Details
   setPurchaseRequestProduct() {
      this.Form.setControl('items', new FormArray([]));
      this.items = this.Form.get('items') as FormArray;
      this._PurchaseRequestProduct.map(obj => {
         const Group: FormGroup = this.formBuilder.group({
            Product: new FormControl(obj.Product_Id._id, [Validators.required]),
            Description: new FormControl(obj.Description),
            Price: new FormControl(null, [Validators.required]),
            Quantity: new FormControl(parseFloat(obj.Approved_Quantity), [Validators.required]),
            Taxable_Amount: new FormControl(null),
            Product_Discount: new FormControl(null),
            Product_Tax: new FormControl(null),
            Overall_Inline_Tax: new FormControl(0),
            Tax_Amount: new FormControl(0),
            Product_Total: new FormControl(null),
         });
         this.items.push(Group);
      });
      this.FilterProduct();
      this.SubLoader = false;
   }
 // ************************************************** Tax *************************************************************
   // Tax inline
   // get inline tax value on key down
   getInlineTaxValue(_index) {
         let Price_Value: number = this.Form.controls['items']['controls'][_index].controls.Price.value;
         const Quantity_Value: number = this.Form.controls['items']['controls'][_index].controls.Quantity.value;
         const Taxes: any[] = this.Form.controls['items']['controls'][_index].controls.Product_Tax.value;
         let Tax_Amount = 0;
         if ( Taxes !== null && Taxes.length > 0) {
            const TempTaxArr = this._Tax.filter(obj => Taxes.includes(obj._id));
            let includesTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_3');
               includesTax = includesTax.map(obj => obj.Amount);
            let PercentagesTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_2');
               PercentagesTax = PercentagesTax.map(obj => obj.Amount);
            let FixedAmountTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_1');
               FixedAmountTax = FixedAmountTax.map(obj => obj.Amount);
            if (includesTax.length > 0) {
               const TaxPercent = includesTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
               const TempUnitPrice  = Price_Value / parseFloat( '1.' + TaxPercent);
                  Tax_Amount = Price_Value - TempUnitPrice;
                  Price_Value = TempUnitPrice;
               this.Form.controls['items']['controls'][_index].controls.Price.setValue(Price_Value);
            }
            if (PercentagesTax.length > 0) {
               const TaxPercent = PercentagesTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
               Tax_Amount = Tax_Amount + ( (Price_Value * TaxPercent) / 100 );
            }
            if (FixedAmountTax.length > 0) {
               const TaxPercent = FixedAmountTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
               Tax_Amount = Tax_Amount + TaxPercent;
            }
         }
         const Taxable_Val = Price_Value * Quantity_Value;
         const Tax_Val = Tax_Amount * Quantity_Value;
         const Total_Val = Taxable_Val + Tax_Val;
         this.Form.controls['items']['controls'][_index].controls.Taxable_Amount.setValue(Taxable_Val);
         this.Form.controls['items']['controls'][_index].controls.Tax_Amount.setValue(Tax_Val);
         this.Form.controls['items']['controls'][_index].controls.Product_Total.setValue((Total_Val * 100) / 100 );
         this.inlineOverAllCalculation();
   }
   // inline over all calculation
   inlineOverAllCalculation() {
      const length =  this.Form.controls['items']['controls'].length;
      let Taxable_finalTotal = 0;
      let Total_finalTax = 0;
      for (let index = 0; index < length; index++) {
         const Taxable_total = this.Form.controls['items']['controls'][index].controls.Taxable_Amount.value;
         const Total_Tax = this.Form.controls['items']['controls'][index].controls.Tax_Amount.value;
         const Total = this.Form.controls['items']['controls'][index].controls.Product_Total.value;
         Taxable_finalTotal = Taxable_finalTotal + Taxable_total;
         Total_finalTax = Total_finalTax + Total_Tax;
      }
      this.inline_tax_amount = Total_finalTax;
      this.Form.controls['Sub_Total'].setValue( (Taxable_finalTotal * 100) / 100);
      this.Form.controls['Tax'].setValue( ((Total_finalTax + this.global_tax_amount) * 100) / 100 );
      this.Form.controls['Total'].setValue( ((Taxable_finalTotal + Total_finalTax) * 100) / 100 );
   }
   // Tax global
   // Global Tax get value
   getGlobalTaxValue(_index) {
         const Price_Value: number = this.Form.controls['items']['controls'][_index].controls.Price.value;
         const Quantity_Value: number = this.Form.controls['items']['controls'][_index].controls.Quantity.value;
         const Taxable_Val = Price_Value * Quantity_Value;
         if (Taxable_Val !== null) {
            this.Form.controls['items']['controls'][_index].controls.Product_Total.setValue(Taxable_Val);
         }
         this.globalOverAllCalculation();
   }
   // Global tax overall calculation
   globalOverAllCalculation() {
      const length =  this.Form.controls['items']['controls'].length;
      let Taxable_finalTotal = 0;
      for (let index = 0; index < length; index++) {
         const Taxable_total = this.Form.controls['items']['controls'][index].controls.Taxable_Amount.value;
         Taxable_finalTotal = Taxable_finalTotal + Taxable_total;
      }
      this.Form.controls['Sub_Total'].setValue( (Taxable_finalTotal * 100) / 100);
      let Price_Value: number =  this.Form.controls['Sub_Total'].value;
      const Taxes: any[] = this.Form.controls['Global_Product_Tax'].value;
      let Tax_Amount = 0;
      if ( Taxes !== null && Taxes.length > 0) {
         const TempTaxArr = this._Tax.filter(obj => Taxes.includes(obj._id));
         let includesTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_3');
            includesTax = includesTax.map(obj => obj.Amount);
         let PercentagesTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_2');
            PercentagesTax = PercentagesTax.map(obj => obj.Amount);
         let FixedAmountTax = TempTaxArr.filter(obj => obj.Tax_Computation.Type === 'Type_1');
            FixedAmountTax = FixedAmountTax.map(obj => obj.Amount);
         if (includesTax.length > 0) {
            const TaxPercent = includesTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
            const TempUnitPrice  = Price_Value / parseFloat( '1.' + TaxPercent);
               Tax_Amount = Price_Value - TempUnitPrice;
               Price_Value = TempUnitPrice;
            this.Form.controls['Sub_Total'].setValue(Price_Value);
         }
         if (PercentagesTax.length > 0) {
            const TaxPercent = PercentagesTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
            Tax_Amount = Tax_Amount + ( (Price_Value * TaxPercent) / 100 );
         }
         if (FixedAmountTax.length > 0) {
            const TaxPercent = FixedAmountTax.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); });
            Tax_Amount = Tax_Amount + TaxPercent;
         }
      }
      this.global_tax_amount = Tax_Amount;
      const Total_Val = Price_Value + Tax_Amount;
      this.Form.controls['Sub_Total'].setValue((Price_Value * 100) / 100);
      this.Form.controls['Tax'].setValue(((Tax_Amount + this.inline_tax_amount) * 100) / 100);
      this.Form.controls['Total'].setValue((Total_Val * 100) / 100 );
   }
   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseQuote_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/Purchase_Quotations_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
            }
         });
      }
   }
}

