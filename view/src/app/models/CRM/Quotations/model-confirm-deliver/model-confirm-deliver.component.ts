import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';

import { CrmService } from './../../../../services/Crm/crm.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { InventorySettingsService } from './../../../../services/settings/InventorySettings/inventory-settings.service';
import {InventoryService } from './../../../../services/Inventory/inventory.service';
@Component({
  selector: 'app-model-confirm-deliver',
  templateUrl: './model-confirm-deliver.component.html',
  styleUrls: ['./model-confirm-deliver.component.css']
})
export class ModelConfirmDeliverComponent implements OnInit {
   Type: string;
   Reference_Key;
   Create_BackOrder;
   Data;
   SaleOrder_Id;
   Uploading: Boolean = false;
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   nextButton: Boolean = true;
   CheckStockButton: Boolean = true;
   onClose: Subject<{}>;
   Form: FormGroup;
   _PurchaseConfigList: any;
   _warehouse: any;
   constructor(
      public bsModalRef: BsModalRef,
      public Crm_Service: CrmService,
      public PurchaseConfig_Service: ConfigurationService,
      public Toastr: ToastrService,
      private Login_Service: LoginService,
      public router: Router,
      public Inventory_Settings_Service: InventorySettingsService,
      public Inventory_Service: InventoryService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // get warehouse
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Inventory_Settings_Service.Ware_House_List({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._warehouse = DecryptedData;
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
      this.onClose = new Subject();
      if (this.Reference_Key === 'DeliverOrder' || this.Reference_Key === 'Sale Order') {
         this.Form = new FormGroup({
            WareHouse_Id: new FormControl(null),
            Reference_Key: new FormControl(this.Reference_Key),
            Order_Id: new FormControl(this.Data, Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      } else {
         this.Form = new FormGroup({
            WareHouse_Id: new FormControl(null),
            Reference_Key: new FormControl(this.Reference_Key),
            Order_Id: new FormControl(this.Data, Validators.required),
            SaleOrder_Id: new FormControl(this.SaleOrder_Id, Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
      }
   }
   Next() {
      this.nextButton = false;
      setTimeout(() => {
         this.Type = 'Hold';
         this.checkStock();
      }, 500);
   }
   CheckBackOrder() {
      if (this.Create_BackOrder === 'Yes') {
         setTimeout(() => {
            this.Type = 'Yes_BackOrder_Confirm';
         }, 500);
      } else {
         setTimeout(() => {
            this.Type = 'No_BackOrder_Confirm';
         }, 500);
      }
   }
   checkStock() {
      this.CheckStockButton = false;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Inventory_Service.StockDetails_Availability({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            setTimeout(() => {
               this.Type = 'Confirm';
            }, 1000);
         } else if (response['status'] === 200 && !ResponseData['Status'] ) {
            setTimeout(() => {
               this.Type = 'NotConfirm';
            }, 1000);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Stock Getting Error!, But not Identify!' });
         }
      });
   }
   CreateBackOrder() {
      this.Type = 'confirm_creating_backOrder';
      console.log(this.Form.value);
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.DeliverOrder_CreatedBackOrder({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Order_Id: this.Data});
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Stock Getting Error!, But not Identify!' });
            }
         });
      }
   }
   UpdateStock(value) {
      this.Type = 'Confirm_stock_update';
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.DeliverOrder_StockRemove({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               if (value === 'Yes') {
                  this.CreateBackOrder();
               } else {
                  this.bsModalRef.hide();
                  this.onClose.next({Status: true, Order_Id: this.Data});
               }
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Stock Getting Error!, But not Identify!' });
            }
         });
      }
   }
   CreateDeliverOrder() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.DeliverOrder_Convert({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Order_Id: this.Data});
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Stock Getting Error!, But not Identify!' });
            }
            this.Uploading = false;
         });
      }
   }
   Confirm() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.StockDetails_Remove({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               this.onClose.next({Status: true, Order_Id: this.Data});
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Stock Getting Error!, But not Identify!' });
            }
            this.Uploading = false;
         });
      }
   }
   Cancel() {
      this.Form.reset();
      this.bsModalRef.hide();
   }

}
