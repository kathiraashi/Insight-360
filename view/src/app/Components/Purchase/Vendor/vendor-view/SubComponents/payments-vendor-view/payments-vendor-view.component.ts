import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelPaymentsCustomersViewComponent } from '../../../../../../models/CRM/Customers/model-payments-customers-view/model-payments-customers-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-payments-vendor-view',
  templateUrl: './payments-vendor-view.component.html',
  styleUrls: ['./payments-vendor-view.component.css']
})
export class PaymentsVendorViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreatePayments() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPaymentsCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewPayments() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPaymentsCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeletePayments() {
    const initialState = {
      Text: 'Payments'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
