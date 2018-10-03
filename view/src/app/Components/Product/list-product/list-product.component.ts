import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  DeleteLeads() {
   const initialState = {
      Text: 'Leads'
   };
   this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
}
}
