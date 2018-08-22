import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-list-log-phone-call',
  templateUrl: './list-log-phone-call.component.html',
  styleUrls: ['./list-log-phone-call.component.css']
})
export class ListLogPhoneCallComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }


   ngOnInit() {
   }
   DeleteLogPhoneCall() {
      const initialState = {
         Text: 'LogPhoneCall'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
