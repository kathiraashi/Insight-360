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
  selector: 'app-customer-payments-create',
  templateUrl: './customer-payments-create.component.html',
  styleUrls: ['./customer-payments-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CustomerPaymentsCreateComponent implements OnInit {
   Type: string;
   _InvoiceNo: any[] =  ['INV-1', 'INV-2', ' INV-3'];
   _Customer: any[] =  ['Customer-1', 'Customer-2', ' Customer-3'];
  constructor() { }

  ngOnInit() {
  }

}
