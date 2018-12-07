import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelContactCustomersViewComponent } from '../../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelActivitiesCustomersViewComponent } from '../../../../models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
@Component({
  selector: 'app-accounts-customer-list',
  templateUrl: './accounts-customer-list.component.html',
  styleUrls: ['./accounts-customer-list.component.css']
})
export class AccountsCustomerListComponent implements OnInit {

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
   CreateActivity() {
   const initialState = {
      Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelActivitiesCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
}
