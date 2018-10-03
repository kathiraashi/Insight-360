import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-model-confirm-order',
  templateUrl: './model-confirm-order.component.html',
  styleUrls: ['./model-confirm-order.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class ModelConfirmOrderComponent implements OnInit {

   _OrderConfirmBy: any[] =  ['Email', 'Telephonic', 'Po'];

   Type: string;
   Type1: string;
   constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
