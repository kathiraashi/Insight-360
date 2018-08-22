import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-locations-inventory-settings',
  templateUrl: './model-locations-inventory-settings.component.html',
  styleUrls: ['./model-locations-inventory-settings.component.css']
})
export class ModelLocationsInventorySettingsComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
