import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-investment',
  templateUrl: './accounts-investment.component.html',
  styleUrls: ['./accounts-investment.component.css']
})
export class AccountsInvestmentComponent implements OnInit {
   _IncomeType: any[] =  ['Type-1', 'Type-2', ' Type-3'];
   Type: string;
   Type1: string;
  constructor() { }

  ngOnInit() {
  }

}
