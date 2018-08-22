import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { CallScheduleLeadComponent } from '../../../../models/Leads/call-schedule-lead/call-schedule-lead.component';
import { LogPhoneCallLeadComponent } from '../../../../models/Leads/log-phone-call-lead/log-phone-call-lead.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.css']
})
export class LeadViewComponent implements OnInit {
   Active_Tab = 'Log_Phone_Call';
   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name ;
   }

   CreateCallSchedule() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(CallScheduleLeadComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   CreateLogPhoneCall() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(LogPhoneCallLeadComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   DeleteLogPhoneCall() {
      const initialState = {
         Text: 'Log Phone Call'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
   DeleteCallSchedule() {
      const initialState = {
         Text: 'Log Phone Call'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
