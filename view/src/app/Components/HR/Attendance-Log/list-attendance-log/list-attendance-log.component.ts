import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { DeleteConfirmationComponent } from '../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-attendance-log',
  templateUrl: './list-attendance-log.component.html',
  styleUrls: ['./list-attendance-log.component.css']
})
export class ListAttendanceLogComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  DeleteAttendanceLog() {
      const initialState = {
         Text: 'Attendance Log'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
