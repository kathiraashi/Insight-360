import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-model-locations-inventory-settings',
  templateUrl: './model-locations-inventory-settings.component.html',
  styleUrls: ['./model-locations-inventory-settings.component.css']
})
export class ModelLocationsInventorySettingsComponent implements OnInit {
   Type: string;
   constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
