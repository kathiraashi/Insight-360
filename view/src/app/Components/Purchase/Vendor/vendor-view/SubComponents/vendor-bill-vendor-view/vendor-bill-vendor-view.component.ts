import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-vendor-bill-vendor-view',
  templateUrl: './vendor-bill-vendor-view.component.html',
  styleUrls: ['./vendor-bill-vendor-view.component.css']
})
export class VendorBillVendorViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  DeleteVendorBills() {
    const initialState = {
      Text: 'Vendor Bills'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
