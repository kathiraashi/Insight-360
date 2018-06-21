import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeadsComponentsComponent } from './../../../../models/Leads/model-leads-components/model-leads-components.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-leads-componets',
  templateUrl: './leads-componets.component.html',
  styleUrls: ['./leads-componets.component.css']
})
export class LeadsComponetsComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateLeads() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLeads() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLeadsComponentsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteLeads() {
    const initialState = {
      Text: 'Leads'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
