import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';

import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { InventorySettingsService } from './../../../../services/settings/InventorySettings/inventory-settings.service';
import {InventoryService } from './../../../../services/Inventory/inventory.service';
@Component({
  selector: 'app-model-receive-confirm',
  templateUrl: './model-receive-confirm.component.html',
  styleUrls: ['./model-receive-confirm.component.css']
})
export class ModelReceiveConfirmComponent implements OnInit {
   Type: string;
   Reference_Key;
   Data;
   Uploading: Boolean = false;
   User_Info: any;
   Company_Id: any;
   User_Id: any;
   nextButton: Boolean = true;
   onClose: Subject<{}>;
   Form: FormGroup;
   _PurchaseConfigList: any;
   _warehouse: any;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: PurchaseService,
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
         this.Form = new FormGroup({
            WareHouse_Id: new FormControl(null),
            Reference_Key: new FormControl(this.Reference_Key),
            Order_Id: new FormControl(this.Data, Validators.required),
            Company_Id: new FormControl(this.Company_Id, Validators.required),
            User_Id: new FormControl(this.User_Id, Validators.required),
         });
   }
   Next() {
      this.nextButton = false;
      setTimeout(() => {
         this.Type = 'Confirm';
      }, 500);
   }
   NoCreateBackOrderNext() {
      this.nextButton = false;
      setTimeout(() => {
         this.Type = 'No_BackOrder_Confirm';
      }, 500);
   }
   CreateBackOrderNext() {
      this.nextButton = false;
      setTimeout(() => {
         this.Type = 'Yes_BackOrder_Confirm';
      }, 500);
   }
   CreateBackOrder() {
      this.Type = 'confirm_creating_backOrder';
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.ToReceive_CreateBackOrder({ 'Info': Info }).subscribe( response => {
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
      if (this.Form.valid) {
         this.Uploading = true;
         this.Type = 'Confirm_stock_update';
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.ToReceive_StockAdd({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               if (value === 'Yes') {
                  this.CreateBackOrder();
               } else {
                  this.bsModalRef.hide();
                  this.onClose.next({Status: true, Order_Id: this.Data});
                  this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
               }
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
   CreateToReceive() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.ToReceive_Convert({ 'Info': Info }).subscribe( response => {
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
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Inventory_Service.StockDetails_Add({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.bsModalRef.hide();
               // this.router.navigate(['/Stock_Values_List']);
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
   Cancel() {
      this.Form.reset();
      this.bsModalRef.hide();
   }
}
