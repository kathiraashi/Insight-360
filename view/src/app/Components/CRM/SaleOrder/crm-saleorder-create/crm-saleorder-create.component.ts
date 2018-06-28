import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-saleorder-create',
  templateUrl: './crm-saleorder-create.component.html',
  styleUrls: ['./crm-saleorder-create.component.css']
})
export class CrmSaleorderCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
}
