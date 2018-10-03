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
  selector: 'app-crm-saleorder-create',
  templateUrl: './crm-saleorder-create.component.html',
  styleUrls: ['./crm-saleorder-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmSaleorderCreateComponent implements OnInit {
   Active_Tab = 'Product_Details';
   _CompanyName: any[] =  ['Company-1', 'Company-2', ' Company-3'];
   _ContactPerson: any[] =  ['Person-1', 'Person-2', ' Person-3'];
   // _OpportunityName: any[] =  ['Opportunity-1', 'Opportunity-2', ' Opportunity-3'];
   _EmployeeName: any[] =  ['Employee-1', 'Employee-2', ' Employee-3'];
   _Product: any[] =  ['Product-1', 'Product-2', ' Product-3'];
   _Tax: any[] =  ['Tax-1', 'Tax-2', ' Tax-3'];
   _QuoteTerms: any[] =  ['Term-1', 'Term-2', ' Term-3'];
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
