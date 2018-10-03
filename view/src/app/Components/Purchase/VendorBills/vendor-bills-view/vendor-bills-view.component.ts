import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-bills-view',
  templateUrl: './vendor-bills-view.component.html',
  styleUrls: ['./vendor-bills-view.component.css']
})
export class VendorBillsViewComponent implements OnInit {
Active_Tab = 'Product_Details';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
   this.Active_Tab = name;
}
}
