import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitiesCustomersViewComponent } from '../../../../../../models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-activity-crm-customers-view',
  templateUrl: './activity-crm-customers-view.component.html',
  styleUrls: ['./activity-crm-customers-view.component.css']
})
export class ActivityCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateActivity() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitiesCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewActivity() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelActivitiesCustomersViewComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteActivity() {
    const initialState = {
      Text: 'Activity'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
