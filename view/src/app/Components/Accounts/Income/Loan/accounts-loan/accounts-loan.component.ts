import { Component, OnInit } from '@angular/core';


import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-accounts-loan',
  templateUrl: './accounts-loan.component.html',
  styleUrls: ['./accounts-loan.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],

})
export class AccountsLoanComponent implements OnInit {
   _CycleOfPrepayment: any[] =  ['Weekly', 'Bi-Weekly', 'Monthly(interest)', 'Monthly(EMI)'];
   _Day: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   Type: string;
   Type1: string;
  constructor() { }

  ngOnInit() {
  }

}
