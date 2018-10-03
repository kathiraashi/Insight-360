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
  selector: 'app-create-advance',
  templateUrl: './create-advance.component.html',
  styleUrls: ['./create-advance.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateAdvanceComponent implements OnInit {
   _Name: any[] =  ['Employee-1', 'Employee-2', 'Employee-3'];

  constructor() { }

  ngOnInit() {
  }

}
