import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLogPhoneCallLeadsComponentsComponent } from '../../../../models/Leads/model-log-phone-call-leads-components/model-log-phone-call-leads-components.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-log-phone-call-leads-componets',
  templateUrl: './log-phone-call-leads-componets.component.html',
  styleUrls: ['./log-phone-call-leads-componets.component.css']
})
export class LogPhoneCallLeadsComponetsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateLogPhoneCall() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLogPhoneCallLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLogPhoneCall() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLogPhoneCallLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteLogPhoneCall() {
    const initialState = {
      Text: 'Log Phone Call'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
