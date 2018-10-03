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
  selector: 'app-create-attendance-log',
  templateUrl: './create-attendance-log.component.html',
  styleUrls: ['./create-attendance-log.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateAttendanceLogComponent implements OnInit {
   _EmployeeName: any[] =  ['Name-1', 'Name-2', 'Name-3'];
   _AttendanceCode: any[] =  ['A', 'P', 'H', 'W'];

  constructor() { }

  ngOnInit() {
  }

}
