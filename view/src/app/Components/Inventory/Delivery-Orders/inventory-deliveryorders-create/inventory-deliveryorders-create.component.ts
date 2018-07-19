import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-deliveryorders-create',
  templateUrl: './inventory-deliveryorders-create.component.html',
  styleUrls: ['./inventory-deliveryorders-create.component.css']
})
export class InventoryDeliveryordersCreateComponent implements OnInit {
Active_Tab = 'Courier';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
