import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-others-customer-view',
  templateUrl: './model-others-customer-view.component.html',
  styleUrls: ['./model-others-customer-view.component.css']
})
export class ModelOthersCustomerViewComponent implements OnInit {

   _RegistrationType: any[] =  ['Type-1', 'Type-2', 'Type-3'];

   Type: string;
   constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
