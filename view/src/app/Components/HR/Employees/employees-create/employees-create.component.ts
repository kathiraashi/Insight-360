import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.css']
})
export class EmployeesCreateComponent implements OnInit {
  Active_Tab = 'personal_info';
  _Manager: any[] =  ['Person-1', 'Person-2', 'Person-3'];
  _Branch: any[] =  ['Branch-1', 'Branch-2', 'Branch-3'];
  _Department: any[] =  ['Department-1', 'Department-2', 'Department-3'];
  _Category: any[] =  ['Category-1', 'Category-2', 'Category-3'];
  _MaritalStatus: any[] =  ['Yes', 'No'];
  _SalaryMethod: any[] =  ['Monthly', 'Weekly'];
  _BasicPay: any[] =  ['Fixed', 'Percentage'];
  _ESI: any[] =  ['Fixed', 'Percentage'];
  _PF: any[] =  ['Fixed', 'Percentage'];
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
    }


}
