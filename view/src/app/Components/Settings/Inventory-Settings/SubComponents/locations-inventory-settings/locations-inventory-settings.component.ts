import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLocationsInventorySettingsComponent } from '../../../../../models/settings/inventory_settings/model-locations-inventory-settings/model-locations-inventory-settings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-locations-inventory-settings',
  templateUrl: './locations-inventory-settings.component.html',
  styleUrls: ['./locations-inventory-settings.component.css']
})
export class LocationsInventorySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateLocations() {
    const initialState = {
       Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLocationsInventorySettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
 }
 ViewLocations() {
    const initialState = {
       Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLocationsInventorySettingsComponent, Object.assign({initialState}, { class: '' }));
 }
 DeleteLocations() {
    const initialState = {
       Text: 'Locations'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }
}
