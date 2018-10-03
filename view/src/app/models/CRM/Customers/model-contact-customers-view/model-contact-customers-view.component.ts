import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-contact-customers-view',
  templateUrl: './model-contact-customers-view.component.html',
  styleUrls: ['./model-contact-customers-view.component.css']
})
export class ModelContactCustomersViewComponent implements OnInit {

   _Title: any[] =  ['Mr.', 'Miss.', 'Mrs.', 'Dr.'];
   _ContactRole: any[] =  ['Person-1', 'Person-2', 'Person-3'];

  Type: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
