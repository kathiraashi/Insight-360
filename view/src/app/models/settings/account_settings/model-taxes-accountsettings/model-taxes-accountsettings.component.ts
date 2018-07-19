import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-taxes-accountsettings',
  templateUrl: './model-taxes-accountsettings.component.html',
  styleUrls: ['./model-taxes-accountsettings.component.css']
})
export class ModelTaxesAccountsettingsComponent implements OnInit {

  Type: String;

  Form: FormGroup;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {

    this.Form = new FormGroup({
      Tax_Name: new FormControl('', Validators.required),
      Amount: new FormControl('', Validators.required),
      Percent: new FormControl('', Validators.required)
    });
  }

}
