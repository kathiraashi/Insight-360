import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelContactVendorViewComponent } from '../../../../../../models/Purchase/Vendor/model-contact-vendor-view/model-contact-vendor-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from './../../../../../../services/Purchase/purchase.service';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../../services/PermissionsCheck/permissions-check.service';


@Component({
  selector: 'app-contacts-vendor-view',
  templateUrl: './contacts-vendor-view.component.html',
  styleUrls: ['./contacts-vendor-view.component.css']
})
export class ContactsVendorViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  Vendor_Id: any;
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';
  _ContactList: any[] = [];
   constructor(
      private modalService: BsModalService,
      private active_route: ActivatedRoute,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public Purchase_Service: PurchaseService
   ) {
      this.Vendor_Id = this.active_route.snapshot.params['Vendor_Id'];
      // Get Vendor Contact list
      const Data = { 'Company_Id' : this.Company_Id, 'Vendor_Id': this.Vendor_Id };
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
    }

  ngOnInit() {
  }

  CreateContact() {
    const initialState = {
      Type: 'Create',
      Data: this.Vendor_Id
    };
    this.bsModalRef = this.modalService.show(ModelContactVendorViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewContact(_index) {
    const initialState = {
      Type: 'View',
      Data: this._ContactList[_index]
    };
    this.bsModalRef = this.modalService.show(ModelContactVendorViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteContact() {
    const initialState = {
      Text: 'Contact'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
