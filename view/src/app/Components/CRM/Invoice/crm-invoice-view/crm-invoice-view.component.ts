import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-invoice-view',
  templateUrl: './crm-invoice-view.component.html',
  styleUrls: ['./crm-invoice-view.component.css']
})
export class CrmInvoiceViewComponent implements OnInit {
Active_Tab = 'Product_Details';
   constructor() { }

   ngOnInit() {
   }
Active_Tab_Change(name) {
   this.Active_Tab = name;
}
}
