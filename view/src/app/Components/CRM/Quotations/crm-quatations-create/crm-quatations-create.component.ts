import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { AccountSettingsService } from '../../../../services/settings/AccountSettings/account-settings.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';


export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-crm-quatations-create',
  templateUrl: './crm-quatations-create.component.html',
  styleUrls: ['./crm-quatations-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CrmQuatationsCreateComponent implements OnInit {
   Active_Tab = 'Product_Details';
   _CompanyName: any[] =  [];
   _ContactPerson: any[] =  [];
   // _OpportunityName: any[] =  ['Opportunity-1', 'Opportunity-2', ' Opportunity-3'];
   _EmployeeName: any[] =  ['Employee-1', 'Employee-2', ' Employee-3'];
   _Product: any[] =  [];
   _Tax: any[] =  [];
   _QuoteTerms: any[] =  ['Term-1', 'Term-2', ' Term-3'];
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   Uploading: Boolean = false;
   toDay = new Date();
   items: any;
   Form: FormGroup;
   _temProductList: any[] = [];
   Taxable_Value: number;
   Total_Tax_Value: number;
   _CrmConfigList: any;

   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Product_Service: ProductService,
      public Account_Service: AccountSettingsService,
      private formBuilder: FormBuilder,
      public Crm_Service: CrmService,
      public CrmConfig_Service: ConfigurationService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Customer List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmCustomer_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._CompanyName = DecryptedData;
            this.Loader = (this._CompanyName) ? false : true;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      // Get Crm Configuration List
      this.CrmConfig_Service.CrmConfig_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._CrmConfigList = DecryptedData;
            console.log(this._CrmConfigList);
            if (this._CrmConfigList) {
               this.checkQuoteRefNumber();
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
         Quote_Config: new FormControl(null),
         Quote_Date: new FormControl(this.toDay, Validators.required ),
         Valid_Date : new FormControl(null, Validators.required),
         Company_Name: new FormControl(null, Validators.required),
         Contact_Person: new FormControl(null, Validators.required),
         Quote_Ref_Number: new FormControl(null),
         Employee_Name: new FormControl(null, Validators.required),
         items: this.formBuilder.array([this.createItems()]),
         Sub_Total_WithOut_GlobalDiscount: new FormControl({value: 0.00, disabled: true}),
         Sub_Total: new FormControl({value: 0.00, disabled: true}),
         Global_Discount: new FormControl(null),
         Global_Product_Tax: new FormControl(null),
         Overall_Global_Tax: new FormControl(null),
         Tax: new FormControl({value: 0.00, disabled: true}),
         Total: new FormControl({value: 0.00, disabled: true}),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   checkQuoteRefNumber() {
      this.Form.controls['Quote_Config'].setValue(this._CrmConfigList['_id']);
      if (this._CrmConfigList.Quote_Ref_Number === 'Manual') {
         this.Form.controls['Quote_Ref_Number'].setValidators(Validators.required);
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
         Product_Discount: new FormControl(null),
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
      if (this._CrmConfigList.Tax !== 'Global') {
         this.inlineOverAllCalculation();
      } else {
         this.globalOverAllCalculation();
      }
      this.FilterProduct();
   }
   // get the selected company conatct list, Tax List & Product list
   getCompanyBelong(value) {
      const Selected_Company = value;
      if (Selected_Company !== null) {
         const Data = { 'Company_Id' : this.Company_Id, 'crm_customer_id': Selected_Company, 'User_Id' : this.User_Id, };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // get Company contact person
         this.Crm_Service.CrmContact_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._ContactPerson = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
          // Get Taxes List
         this.Account_Service.Taxes_SalesList({'Info': Info}).subscribe( response => {
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
         // get Company products
         this.Product_Service.Product_List_Sold({'Info': Info}).subscribe( response => {
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
       } else {
         this._ContactPerson = [];
      }
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
   // ************************************************** Tax *************************************************************
   // Tax inline
   // get inline tax value on key down
   getInlineTaxValue(_index) {
      if (this._CrmConfigList.Tax !== 'Global') {
         let Price_Value: number = this.Form.controls['items']['controls'][_index].controls.Price.value;
         const Quantity_Value: number = this.Form.controls['items']['controls'][_index].controls.Quantity.value;
         const Taxes: any[] = this.Form.controls['items']['controls'][_index].controls.Product_Tax.value;
         if (this._CrmConfigList.Discount !== 'Global') {
            if (this.Form.controls['items']['controls'][_index].controls.Product_Discount.value !== null || this.Form.controls['items']['controls'][_index].controls.Product_Discount.value !== '') {
               const Discount_Value: number = this.Form.controls['items']['controls'][_index].controls.Product_Discount.value;
               if (this._CrmConfigList.Discount_Value === 'Percent') {
                  Price_Value = Price_Value - ((Price_Value * Discount_Value) / 100);
               } else {
                  Price_Value = Price_Value - ( Discount_Value / Quantity_Value);
               }
            }
         }
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
   }
   // inline over all calculation
   inlineOverAllCalculation() {
      if (this._CrmConfigList.Tax !== 'Global') {
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
      this.Form.controls['Sub_Total_WithOut_GlobalDiscount'].setValue( (Taxable_finalTotal * 100) / 100);
      if (this._CrmConfigList.Discount === 'Global') {
         if (this.Form.controls['Global_Discount'].value !== null || this.Form.controls['Global_Discount'].value !== '') {
            const Discount_Value: number = this.Form.controls['Global_Discount'].value;
            if (this._CrmConfigList.Discount_Value === 'Percent') {
               Taxable_finalTotal = Taxable_finalTotal - ((Taxable_finalTotal * Discount_Value) / 100);
            } else {
               Taxable_finalTotal = Taxable_finalTotal - Discount_Value;
            }
         }
      }
      this.Form.controls['Sub_Total'].setValue( (Taxable_finalTotal * 100) / 100);
      this.Form.controls['Tax'].setValue( (Total_finalTax * 100) / 100 );
      this.Form.controls['Total'].setValue( ((Taxable_finalTotal + Total_finalTax) * 100) / 100 );
   }
}
   // Tax global
   // Global Tax get value
   getGlobalTaxValue(_index) {
      if (this._CrmConfigList.Tax === 'Global') {
         let Price_Value: number = this.Form.controls['items']['controls'][_index].controls.Price.value;
         const Quantity_Value: number = this.Form.controls['items']['controls'][_index].controls.Quantity.value;
         if (this._CrmConfigList.Discount !== 'Global') {
            if (this.Form.controls['items']['controls'][_index].controls.Product_Discount.value !== null || this.Form.controls['items']['controls'][_index].controls.Product_Discount.value !== '') {
               const Discount_Value: number = this.Form.controls['items']['controls'][_index].controls.Product_Discount.value;
               if (this._CrmConfigList.Discount_Value === 'Percent') {
                  Price_Value = Price_Value - ((Price_Value * Discount_Value) / 100);
               } else {
                  Price_Value = Price_Value - ( Discount_Value / Quantity_Value);
               }
            }
         }
         const Taxable_Val = Price_Value * Quantity_Value;
         if (Taxable_Val !== null) {
            this.Form.controls['items']['controls'][_index].controls.Product_Total.setValue(Taxable_Val);
         }
         this.globalOverAllCalculation();
      }
   }
   // Global tax overall calculation
   globalOverAllCalculation() {
      if (this._CrmConfigList.Tax === 'Global') {
         const length =  this.Form.controls['items']['controls'].length;
         let Taxable_finalTotal = 0;
         for (let index = 0; index < length; index++) {
            const Taxable_total = this.Form.controls['items']['controls'][index].controls.Product_Total.value;
            Taxable_finalTotal = Taxable_finalTotal + Taxable_total;
         }
         this.Form.controls['Sub_Total_WithOut_GlobalDiscount'].setValue( (Taxable_finalTotal * 100) / 100);
         this.Form.controls['Sub_Total'].setValue( (Taxable_finalTotal * 100) / 100);
         let Price_Value: number =  this.Form.controls['Sub_Total'].value;
         if (this._CrmConfigList.Discount === 'Global') {
            if (this.Form.controls['Global_Discount'].value !== null || this.Form.controls['Global_Discount'].value !== '') {
               const Discount_Value: number = this.Form.controls['Global_Discount'].value;
               if (this._CrmConfigList.Discount_Value === 'Percent') {
                  Price_Value = Price_Value - ((Price_Value * Discount_Value) / 100);
               } else {
                  Price_Value = Price_Value - Discount_Value;
               }
            }
         }
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
         const Total_Val = Price_Value + Tax_Amount;
         this.Form.controls['Sub_Total'].setValue((Price_Value * 100) / 100);
         this.Form.controls['Tax'].setValue((Tax_Amount * 100) / 100);
         this.Form.controls['Total'].setValue((Total_Val * 100) / 100 );
      }
   }

   // submit the quote
   Submit() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmQuote_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               this.router.navigate(['/crm_quotations_list']);
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
