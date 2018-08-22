import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { CallScheduleLeadComponent } from '../../../../models/Leads/call-schedule-lead/call-schedule-lead.component';
import { LogPhoneCallLeadComponent } from '../../../../models/Leads/log-phone-call-lead/log-phone-call-lead.component';



@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {
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


}
