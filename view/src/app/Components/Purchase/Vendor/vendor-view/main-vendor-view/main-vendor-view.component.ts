import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactCustomersViewComponent } from '../../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelPaymentsCustomersViewComponent } from '../../../../../models/CRM/Customers/model-payments-customers-view/model-payments-customers-view.component';

@Component({
  selector: 'app-main-vendor-view',
  templateUrl: './main-vendor-view.component.html',
  styleUrls: ['./main-vendor-view.component.css']
})
export class MainVendorViewComponent implements OnInit {
Active_Tab = 'About' ;
bsModalRef: BsModalRef;

constructor(private modalService: BsModalService) { }

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
