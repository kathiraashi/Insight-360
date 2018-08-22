import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-inventory-settings',
  templateUrl: './main-inventory-settings.component.html',
  styleUrls: ['./main-inventory-settings.component.css']
})
export class MainInventorySettingsComponent implements OnInit {
Active_Tab = 'Ware_House';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
