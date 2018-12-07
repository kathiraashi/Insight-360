import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

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
  selector: 'app-model-expense',
  templateUrl: './model-expense.component.html',
  styleUrls: ['./model-expense.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class ModelExpenseComponent implements OnInit {

   _AdvancePaid: any[] =  ['Yes', 'No'];

   Type: string;
   Type1: string;
   constructor(public bsModalRef: BsModalRef) { }


  ngOnInit() {
  }

}
