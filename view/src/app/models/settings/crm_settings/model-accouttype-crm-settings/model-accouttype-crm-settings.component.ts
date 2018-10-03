import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-accouttype-crm-settings',
  templateUrl: './model-accouttype-crm-settings.component.html',
  styleUrls: ['./model-accouttype-crm-settings.component.css']
})
export class ModelAccouttypeCrmSettingsComponent implements OnInit {
   Type: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
