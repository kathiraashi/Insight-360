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
  selector: 'app-internal-transfer-create',
  templateUrl: './internal-transfer-create.component.html',
  styleUrls: ['./internal-transfer-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class InternalTransferCreateComponent implements OnInit {
   _WareHouse: any[] =  ['House-1', 'House-2', ' House-3'];
   _Product: any[] =  ['Product-1', 'Product-2', ' Product-3'];

  constructor() { }

  ngOnInit() {
  }

}
