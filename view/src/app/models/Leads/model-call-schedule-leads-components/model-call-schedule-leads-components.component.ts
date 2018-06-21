import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-call-schedule-leads-components',
  templateUrl: './model-call-schedule-leads-components.component.html',
  styleUrls: ['./model-call-schedule-leads-components.component.css']
})
export class ModelCallScheduleLeadsComponentsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
