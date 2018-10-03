import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelConfirmOrderComponent } from '../../../../models/CRM/Quotations/model-confirm-order/model-confirm-order.component';


@Component({
  selector: 'app-crm-quatations-list',
  templateUrl: './crm-quatations-list.component.html',
  styleUrls: ['./crm-quatations-list.component.css']
})
export class CrmQuatationsListComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }


   ngOnInit() {
   }
   ConfirmOrder() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelConfirmOrderComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
}
