import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrls: ['./purchase-orders-create.component.css']
})
export class PurchaseOrdersCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
 }

}
