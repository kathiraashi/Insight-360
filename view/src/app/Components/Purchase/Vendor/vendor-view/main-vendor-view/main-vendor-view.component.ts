import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelContactCustomersViewComponent } from '../../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelPaymentsCustomersViewComponent } from '../../../../../models/CRM/Customers/model-payments-customers-view/model-payments-customers-view.component';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-vendor-view',
  templateUrl: './main-vendor-view.component.html',
  styleUrls: ['./main-vendor-view.component.css']
})
export class MainVendorViewComponent implements OnInit {
   Active_Tab = 'About' ;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';
   Vendor_Id: any;
   bsModalRef: BsModalRef;
   _Data: any;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public router: Router,
      private active_route: ActivatedRoute,
      public Purchase_Service: PurchaseService,
   ) {
       // Get Crm Customer View
       this.active_route.url.subscribe(u => {
         this.Vendor_Id = this.active_route.snapshot.params['Vendor_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Vendor_Id': this.Vendor_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseVendor_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
            }
         });
      });
   }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

   CreateContact() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelContactCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   CreatePayments() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelPaymentsCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
}
