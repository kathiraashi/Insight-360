import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelCurrencyAccountSettingsComponent } from '../../../../../models/settings/account_settings/model-currency-account-settings/model-currency-account-settings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-currency-account-settings',
  templateUrl: './currency-account-settings.component.html',
  styleUrls: ['./currency-account-settings.component.css']
})
export class CurrencyAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreateCurrency() {
    const initialState = {
       Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelCurrencyAccountSettingsComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }
 ViewCurrency() {
    const initialState = {
       Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelCurrencyAccountSettingsComponent, Object.assign({initialState}, { class: '' }));
 }
 DeleteCurrency() {
    const initialState = {
       Text: 'Currency'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }

}
