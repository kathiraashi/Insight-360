import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-call-schedule-lead',
  templateUrl: './call-schedule-lead.component.html',
  styleUrls: ['./call-schedule-lead.component.css']
})
export class CallScheduleLeadComponent implements OnInit {

   Type: string;
   Data;
   constructor(public bsModalRef: BsModalRef) { }

   ngOnInit() {
   }

}
