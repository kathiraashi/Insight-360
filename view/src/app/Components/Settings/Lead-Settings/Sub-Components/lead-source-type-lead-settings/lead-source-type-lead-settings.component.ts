import { Component, OnInit } from '@angular/core';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeadsourceLeadsettingsComponent } from '../../../../../models/settings/lead_settings/model-leadsource-leadsettings/model-leadsource-leadsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-lead-source-type-lead-settings',
  templateUrl: './lead-source-type-lead-settings.component.html',
  styleUrls: ['./lead-source-type-lead-settings.component.css']
})
export class LeadSourceTypeLeadSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateLeadSource() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLeadsourceLeadsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLeadSource() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLeadsourceLeadsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteLeadSource() {
    const initialState = {
      Text: 'Lead Source Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
