import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-log-phone-call-lead',
  templateUrl: './log-phone-call-lead.component.html',
  styleUrls: ['./log-phone-call-lead.component.css']
})
export class LogPhoneCallLeadComponent implements OnInit {

   Type: string;
   Data;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
