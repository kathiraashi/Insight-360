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
  selector: 'app-purchase-quotations-create',
  templateUrl: './purchase-quotations-create.component.html',
  styleUrls: ['./purchase-quotations-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class PurchaseQuotationsCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';
  _Product: any[] =  ['Product-1', 'Product-2', ' Product-3'];
  _Tax: any[] =  ['Tax-1', 'Tax-2', ' Tax-3'];
  _QuoteTerms: any[] =  ['Term-1', 'Term-2', ' Term-3'];
  _VendorName: any[] =  ['Name-1', 'Name-2', ' Name-3'];
  _PurchaseRequest: any[] =  ['Request-1', 'Request-2', ' Request-3'];
  _QuoteRefNo: any[] =  ['Quo-1', 'Quo-2', ' Quo-3'];
  _Contact: any[] =  ['Person-1', 'Person-2', ' Person-3'];

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
}
