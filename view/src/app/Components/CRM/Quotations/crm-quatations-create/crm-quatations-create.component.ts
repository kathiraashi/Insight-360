import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-quatations-create',
  templateUrl: './crm-quatations-create.component.html',
  styleUrls: ['./crm-quatations-create.component.css']
})
export class CrmQuatationsCreateComponent implements OnInit {
Active_Tab = 'Product_Details';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
