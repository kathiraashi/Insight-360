import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-model-income',
  templateUrl: './model-income.component.html',
  styleUrls: ['./model-income.component.css']
})
export class ModelIncomeComponent implements OnInit {

   _Type: any[] =  ['Investment/Income', 'Loan'];

   Type: string;

   constructor(public bsModalRef: BsModalRef,
      private router: Router) {}

  ngOnInit() {
  }
TypeChange(_Event) {
   if (_Event === 'Investment/Income') {
      this.router.navigate(['/Accounts_Investment']);
      this.bsModalRef.hide();
   }
   if (_Event === 'Loan') {
      this.router.navigate(['/Accounts_Loan']);
      this.bsModalRef.hide();
   }
}
}
