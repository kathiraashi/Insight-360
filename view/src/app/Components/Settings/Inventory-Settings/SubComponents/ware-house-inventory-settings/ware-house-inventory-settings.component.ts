import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelWarehouseInventorysettingsComponent } from '../../../../../models/settings/inventory_settings/model-warehouse-inventorysettings/model-warehouse-inventorysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-ware-house-inventory-settings',
  templateUrl: './ware-house-inventory-settings.component.html',
  styleUrls: ['./ware-house-inventory-settings.component.css']
})
export class WareHouseInventorySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateWareHouse() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelWarehouseInventorysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewWareHouse() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelWarehouseInventorysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteContactInfo() {
    const initialState = {
      Text: 'WareHouse Inventory'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
