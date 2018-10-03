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
  selector: 'app-create-leaves',
  templateUrl: './create-leaves.component.html',
  styleUrls: ['./create-leaves.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateLeavesComponent implements OnInit {
   _LeaveType: any[] =  ['Type-1', 'Type-2', 'Type-3'];
   _Name: any[] =  ['Employee-1', 'Employee-2', 'Employee-3'];

  constructor() { }

  ngOnInit() {
  }

}
