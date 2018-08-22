import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-currency-account-settings',
  templateUrl: './model-currency-account-settings.component.html',
  styleUrls: ['./model-currency-account-settings.component.css']
})
export class ModelCurrencyAccountSettingsComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
