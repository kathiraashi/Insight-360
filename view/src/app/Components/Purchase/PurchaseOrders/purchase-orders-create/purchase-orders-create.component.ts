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
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrls: ['./purchase-orders-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class PurchaseOrdersCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';
  _VendorName: any[] =  ['xxxx', 'yyyy', 'zzzz'];
  _QuoteRefNo: any[] =  ['Quo-1', 'Quo-2', 'Quo-3'];
  _Product: any[] =  ['Product-1', 'Product-2', ' Product-3'];
  _Tax: any[] =  ['Tax-1', 'Tax-2', ' Tax-3'];
  _QuoteTerms: any[] =  ['Term-1', 'Term-2', ' Term-3'];
  _Contact: any[] =  ['Person-1', 'Person-2', ' Person-3'];

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
 }

}
