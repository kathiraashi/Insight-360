import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { ModelExpenseComponent } from '../../../../models/Accounts/Expense/model-expense/model-expense.component';

@Component({
  selector: 'app-accounts-expenses',
  templateUrl: './accounts-expenses.component.html',
  styleUrls: ['./accounts-expenses.component.css']
})
export class AccountsExpensesComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreateExpRequest() {
   const initialState = {
      Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelExpenseComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   ViewExpRequest() {
      const initialState = {
         Type: 'View'
      };
      this.bsModalRef = this.modalService.show(ModelExpenseComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }

}
