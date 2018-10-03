import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactCustomersViewComponent } from '../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

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
