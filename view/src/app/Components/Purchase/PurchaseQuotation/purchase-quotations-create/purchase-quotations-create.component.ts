import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-quotations-create',
  templateUrl: './purchase-quotations-create.component.html',
  styleUrls: ['./purchase-quotations-create.component.css']
})
export class PurchaseQuotationsCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
}
