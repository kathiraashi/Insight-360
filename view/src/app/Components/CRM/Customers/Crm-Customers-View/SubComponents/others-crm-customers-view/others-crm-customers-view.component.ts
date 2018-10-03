import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelOthersCustomerViewComponent } from '../../../../../../models/CRM/Customers/model-others-customer-view/model-others-customer-view.component';
@Component({
  selector: 'app-others-crm-customers-view',
  templateUrl: './others-crm-customers-view.component.html',
  styleUrls: ['./others-crm-customers-view.component.css']
})
export class OthersCrmCustomersViewComponent implements OnInit {

   bsModalRef: BsModalRef;

   constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  RegistrationType() {
   const initialState = {
     Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelOthersCustomerViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
 }
}
