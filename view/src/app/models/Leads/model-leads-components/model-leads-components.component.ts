import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-leads-components',
  templateUrl: './model-leads-components.component.html',
  styleUrls: ['./model-leads-components.component.css']
})
export class ModelLeadsComponentsComponent implements OnInit {
  Type: String;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
