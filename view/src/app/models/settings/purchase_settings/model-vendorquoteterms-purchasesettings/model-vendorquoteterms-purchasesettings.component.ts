import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-vendorquoteterms-purchasesettings',
  templateUrl: './model-vendorquoteterms-purchasesettings.component.html',
  styleUrls: ['./model-vendorquoteterms-purchasesettings.component.css']
})
export class ModelVendorquotetermsPurchasesettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
