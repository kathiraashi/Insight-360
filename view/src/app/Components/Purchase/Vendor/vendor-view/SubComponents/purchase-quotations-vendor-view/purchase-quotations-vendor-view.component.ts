import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-purchase-quotations-vendor-view',
  templateUrl: './purchase-quotations-vendor-view.component.html',
  styleUrls: ['./purchase-quotations-vendor-view.component.css']
})
export class PurchaseQuotationsVendorViewComponent implements OnInit {


  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }


  ngOnInit() {
  }

  DeleteQuotations() {
    const initialState = {
      Text: 'Purchase Quotation'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
