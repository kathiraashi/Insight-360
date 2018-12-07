import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { CrmService } from './../../../../services/Crm/crm.service';
@Component({
  selector: 'app-model-confirm-config',
  templateUrl: './model-confirm-config.component.html',
  styleUrls: ['./model-confirm-config.component.css']
})
export class ModelConfirmConfigComponent implements OnInit {
   onClose: Subject<{}>;
   constructor(
      public bsModalRef: BsModalRef,
      public Service: CrmService,
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
