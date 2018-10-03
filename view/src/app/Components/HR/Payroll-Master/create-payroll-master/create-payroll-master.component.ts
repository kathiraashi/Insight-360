import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-payroll-master',
  templateUrl: './create-payroll-master.component.html',
  styleUrls: ['./create-payroll-master.component.css']
})
export class CreatePayrollMasterComponent implements OnInit {
   Active_Tab = 'Leaves';
   _Leaves: any[] =  ['Paid Leaves applicable from', 'From date of joining', 'after probation', 'Custom'];
   _WeeklyHolidays: any[] =  ['Fixed', 'Custom'];
   _PayrollStart: any[] =  ['1', '2', '3', '4', '5'];
   _PayrollEnd: any[] =  ['1', '2', '3', '4', '5'];
   _WorkingDays: any[] =  ['Whole calendar day in a month', 'Exclude all sundays', 'Exclude saturdays and sundays', 'Exclude all week off'];
   _PayrollCalculation: any[] =  ['Monthly', 'Hourly'];
   _PaymentMethod: any[] =  ['Bank', 'Cash', 'Cheque'];
   _Method: any[] =  ['Weekly', 'Monthly'];
   _Category: any[] =  ['Category-1', 'Category-2', 'Category-3'];
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
     this.Active_Tab = name;
  }

}
