import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-model-warehouse-inventorysettings',
  templateUrl: './model-warehouse-inventorysettings.component.html',
  styleUrls: ['./model-warehouse-inventorysettings.component.css']
})
export class ModelWarehouseInventorysettingsComponent implements OnInit {


  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
