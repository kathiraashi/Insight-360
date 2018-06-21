import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-log-phone-call-leads-components',
  templateUrl: './model-log-phone-call-leads-components.component.html',
  styleUrls: ['./model-log-phone-call-leads-components.component.css']
})
export class ModelLogPhoneCallLeadsComponentsComponent implements OnInit {
  Type: String;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
