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
  selector: 'app-vendor-payments-create',
  templateUrl: './vendor-payments-create.component.html',
  styleUrls: ['./vendor-payments-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class VendorPaymentsCreateComponent implements OnInit {
   Type: string;
   _BillNo: any[] =  ['Bill-1', 'Bill-2', ' Bill-3'];
   _Vendor: any[] =  ['Vendor-1', 'Vendor-2', ' Vendor-3'];
  constructor() { }

  ngOnInit() {
  }

}
