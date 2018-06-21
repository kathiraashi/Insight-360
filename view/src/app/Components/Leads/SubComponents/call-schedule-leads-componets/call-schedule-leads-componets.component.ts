import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelCallScheduleLeadsComponentsComponent } from '../../../../models/Leads/model-call-schedule-leads-components/model-call-schedule-leads-components.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-call-schedule-leads-componets',
  templateUrl: './call-schedule-leads-componets.component.html',
  styleUrls: ['./call-schedule-leads-componets.component.css']
})
export class CallScheduleLeadsComponetsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateLogPhoneCall() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelCallScheduleLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLogPhoneCall() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelCallScheduleLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteLogPhoneCall() {
    const initialState = {
      Text: 'Log Phone Call'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
