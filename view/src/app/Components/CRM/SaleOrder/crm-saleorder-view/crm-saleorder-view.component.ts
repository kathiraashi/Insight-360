import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-saleorder-view',
  templateUrl: './crm-saleorder-view.component.html',
  styleUrls: ['./crm-saleorder-view.component.css']
})
export class CrmSaleorderViewComponent implements OnInit {
  Active_Tab = 'Product_Details';
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
}
