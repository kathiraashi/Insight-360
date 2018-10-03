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
  selector: 'app-create-log-phone-call',
  templateUrl: './create-log-phone-call.component.html',
  styleUrls: ['./create-log-phone-call.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateLogPhoneCallComponent implements OnInit {

   _Product: any[] =  ['product-1', 'product-2', ' product-3', 'product-4'];

   _Company: any[] =  ['Company-1', 'Company-2', ' Company-3', 'Company-4'];

   constructor() { }

   ngOnInit() {
   }

}
