import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  selector: 'app-model-attendance-report-create',
  templateUrl: './model-attendance-report-create.component.html',
  styleUrls: ['./model-attendance-report-create.component.css'],
   providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class ModelAttendanceReportCreateComponent implements OnInit {

  Type: string;
   _SalaryMethod: any[] =  ['Monthly', 'Weekly'];
   _Category: any[] =  ['Category-1', 'Category-2', 'Category-3'];
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
