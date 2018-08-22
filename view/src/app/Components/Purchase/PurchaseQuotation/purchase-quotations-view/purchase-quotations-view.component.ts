import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-quotations-view',
  templateUrl: './purchase-quotations-view.component.html',
  styleUrls: ['./purchase-quotations-view.component.css']
})
export class PurchaseQuotationsViewComponent implements OnInit {
Active_Tab = 'Product_Details';
   constructor() { }

   ngOnInit() {
   }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
