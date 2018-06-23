import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-create-model-contactinfo-company-settings',
  templateUrl: './create-model-contactinfo-company-settings.component.html',
  styleUrls: ['./create-model-contactinfo-company-settings.component.css']
})
export class CreateModelContactinfoCompanySettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

}
