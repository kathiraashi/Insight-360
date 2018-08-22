import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-orders-view',
  templateUrl: './purchase-orders-view.component.html',
  styleUrls: ['./purchase-orders-view.component.css']
})
export class PurchaseOrdersViewComponent implements OnInit {

   Active_Tab = 'Product_Details';
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

}
