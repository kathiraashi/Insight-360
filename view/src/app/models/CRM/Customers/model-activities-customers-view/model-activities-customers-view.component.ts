import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-activities-customers-view',
  templateUrl: './model-activities-customers-view.component.html',
  styleUrls: ['./model-activities-customers-view.component.css']
})
export class ModelActivitiesCustomersViewComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
