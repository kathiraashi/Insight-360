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
  selector: 'app-create-call-schedule',
  templateUrl: './create-call-schedule.component.html',
  styleUrls: ['./create-call-schedule.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]

})
export class CreateCallScheduleComponent implements OnInit {

   _Company: any[] =  ['Company-1', 'Company-2', ' Company-3', 'Company-4'];

   constructor() { }

   ngOnInit() {
   }

}
