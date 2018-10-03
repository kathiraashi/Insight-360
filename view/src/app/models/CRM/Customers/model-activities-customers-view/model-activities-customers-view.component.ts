import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-activities-customers-view',
  templateUrl: './model-activities-customers-view.component.html',
  styleUrls: ['./model-activities-customers-view.component.css']
})
export class ModelActivitiesCustomersViewComponent implements OnInit {
   _ContactPerson: any[] =  ['person-1', 'person-2', 'person-3'];
   _ActivityType: any[] =  ['Type-1', 'Type-2', 'Type-3'];
   _Status: any[] =  ['Status-1', 'Status-2', 'Status-3'];
   _Priority: any[] =  ['High', 'Medium', 'Low'];

  Type: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
