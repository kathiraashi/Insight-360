import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-purchase-settings',
  templateUrl: './main-purchase-settings.component.html',
  styleUrls: ['./main-purchase-settings.component.css']
})
export class MainPurchaseSettingsComponent implements OnInit {
 Active_Tab = 'Vendor_Quote_Terms';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
 this.Active_Tab = name;
}
}
