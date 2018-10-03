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
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class PurchaseRequestCreateComponent implements OnInit {
   _Product: any[] =  ['Product-1', 'Product-2', ' Product-3'];
   constructor() { }

   ngOnInit() {
   }

}
