import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-model-confirm-validate',
  templateUrl: './model-confirm-validate.component.html',
  styleUrls: ['./model-confirm-validate.component.css']
})
export class ModelConfirmValidateComponent implements OnInit {
   onClose: Subject<{}>;
   constructor(
      public bsModalRef: BsModalRef,
   ) { }

   ngOnInit() {
    this.onClose = new Subject();
   }
   Confirm() {
      this.onClose.next({Status: true});
      this.bsModalRef.hide();
   }
   Cancel() {
      this.onClose.next({Status: false});
      this.bsModalRef.hide();
   }

}
