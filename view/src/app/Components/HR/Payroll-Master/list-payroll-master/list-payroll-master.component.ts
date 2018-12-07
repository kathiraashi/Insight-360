import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { DeleteConfirmationComponent } from '../../../Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-list-payroll-master',
  templateUrl: './list-payroll-master.component.html',
  styleUrls: ['./list-payroll-master.component.css']
})
export class ListPayrollMasterComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }
  ngOnInit() {
  }
  DeletePayrollMaster() {
      const initialState = {
         Text: 'Payroll master'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
