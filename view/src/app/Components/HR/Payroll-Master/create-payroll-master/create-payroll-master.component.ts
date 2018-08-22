import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-payroll-master',
  templateUrl: './create-payroll-master.component.html',
  styleUrls: ['./create-payroll-master.component.css']
})
export class CreatePayrollMasterComponent implements OnInit {
Active_Tab = 'Leaves';
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
     this.Active_Tab = name;
  }

}
