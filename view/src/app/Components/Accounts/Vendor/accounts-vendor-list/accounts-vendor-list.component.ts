import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelContactCustomersViewComponent } from '../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
@Component({
  selector: 'app-accounts-vendor-list',
  templateUrl: './accounts-vendor-list.component.html',
  styleUrls: ['./accounts-vendor-list.component.css']
})
export class AccountsVendorListComponent implements OnInit {

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
}
