import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-payments-customers-view',
  templateUrl: './model-payments-customers-view.component.html',
  styleUrls: ['./model-payments-customers-view.component.css']
})
export class ModelPaymentsCustomersViewComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
