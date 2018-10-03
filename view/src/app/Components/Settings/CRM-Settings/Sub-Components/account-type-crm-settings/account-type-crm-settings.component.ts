import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelAccouttypeCrmSettingsComponent } from '../../../../../models/settings/crm_settings/model-accouttype-crm-settings/model-accouttype-crm-settings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-account-type-crm-settings',
  templateUrl: './account-type-crm-settings.component.html',
  styleUrls: ['./account-type-crm-settings.component.css']
})
export class AccountTypeCrmSettingsComponent implements OnInit {
   bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateAccountType() {
   const initialState = {
      Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelAccouttypeCrmSettingsComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
   ViewAccountType() {
      const initialState = {
         Type: 'View'
      };
      this.bsModalRef = this.modalService.show(ModelAccouttypeCrmSettingsComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
   DeleteCallSchedule() {
      const initialState = {
         Text: 'Account Type'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
