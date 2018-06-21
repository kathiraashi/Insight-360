import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-leadsource-leadsettings',
  templateUrl: './model-leadsource-leadsettings.component.html',
  styleUrls: ['./model-leadsource-leadsettings.component.css']
})
export class ModelLeadsourceLeadsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
