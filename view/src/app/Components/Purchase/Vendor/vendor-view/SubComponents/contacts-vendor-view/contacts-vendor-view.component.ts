import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactCustomersViewComponent } from '../../../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-contacts-vendor-view',
  templateUrl: './contacts-vendor-view.component.html',
  styleUrls: ['./contacts-vendor-view.component.css']
})
export class ContactsVendorViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreateContact() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelContactCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewContact() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelContactCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteContact() {
    const initialState = {
      Text: 'Contact'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
