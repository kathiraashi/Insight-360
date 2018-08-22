import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelAttendanceReportCreateComponent } from '../../../../models/HR/model-attendance-report-create/model-attendance-report-create.component';
@Component({
  selector: 'app-list-attendance-report',
  templateUrl: './list-attendance-report.component.html',
  styleUrls: ['./list-attendance-report.component.css']
})
export class ListAttendanceReportComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }

  CreateAttendanceReport() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelAttendanceReportCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
    }

}
