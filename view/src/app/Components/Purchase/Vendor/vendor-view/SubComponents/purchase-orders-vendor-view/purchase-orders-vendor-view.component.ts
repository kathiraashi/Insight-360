import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-purchase-orders-vendor-view',
  templateUrl: './purchase-orders-vendor-view.component.html',
  styleUrls: ['./purchase-orders-vendor-view.component.css']
})
export class PurchaseOrdersVendorViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  DeleteOrders() {
    const initialState = {
      Text: 'Purchase Orders'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
