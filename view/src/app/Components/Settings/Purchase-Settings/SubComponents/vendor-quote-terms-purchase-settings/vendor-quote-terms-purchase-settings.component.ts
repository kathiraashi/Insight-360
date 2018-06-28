import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelVendorquotetermsPurchasesettingsComponent } from '../../../../../models/settings/purchase_settings/model-vendorquoteterms-purchasesettings/model-vendorquoteterms-purchasesettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-vendor-quote-terms-purchase-settings',
  templateUrl: './vendor-quote-terms-purchase-settings.component.html',
  styleUrls: ['./vendor-quote-terms-purchase-settings.component.css']
})
export class VendorQuoteTermsPurchaseSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateVendorQuoteTerms() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelVendorquotetermsPurchasesettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewVendorQuoteTerms() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelVendorquotetermsPurchasesettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteVendorQuoteTerms() {
    const initialState = {
      Text: 'Vendor Quote Terms'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
