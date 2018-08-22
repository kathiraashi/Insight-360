import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';
import { InventorySettingsService } from '../../../../services/settings/InventorySettings/inventory-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';



@Component({
  selector: 'app-model-warehouse-inventorysettings',
  templateUrl: './model-warehouse-inventorysettings.component.html',
  styleUrls: ['./model-warehouse-inventorysettings.component.css']
})
export class ModelWarehouseInventorysettingsComponent implements OnInit {


  onClose: Subject<any>;
  Type: String;
  Data;
  Uploading: Boolean = false;
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';
  Form: FormGroup;
  constructor(  public bsModalRef: BsModalRef,
    public Service: InventorySettingsService,
    public Toastr: ToastrService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    if (this.Type === 'Create') {
    this.Form = new FormGroup({
      Ware_House_Name: new FormControl('', {
                                  validators: Validators.required,
                                  asyncValidators: [ this.WareHouse_AsyncValidate.bind(this) ],
                                  updateOn: 'blur' } ),
      Ware_House_Code : new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Company_Id: new FormControl(this.Company_Id, Validators.required),
      Created_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  if (this.Type === 'Edit') {
    this.Form = new FormGroup({
      Ware_House_Name: new FormControl(this.Data.Ware_House_Name, {validators: Validators.required,
                                              asyncValidators: [ this.WareHouse_AsyncValidate.bind(this) ],
                                              updateOn: 'blur' } ),
      Ware_House_Id: new FormControl(this.Data._id, Validators.required),
      Ware_House_Code: new FormControl(this.Data.Ware_House_Code, Validators.required),
      Address: new FormControl(this.Data.Address, Validators.required),
      Modified_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  }

  WareHouse_AsyncValidate( control: AbstractControl ) {
    const Data = { Ware_House_Name: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Service.Ware_House_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { WareHouse_NotAvailable: true };
       }
    }));
  }

  // onsubmit
onSubmit() {
  if (this.Type === 'Create') {
     this.submit();
  }
  if (this.Type === 'Edit') {
     this.update();
  }
}

// submit ware House
submit() {
  if (this.Form.valid && !this.Uploading ) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.Ware_House_Create({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'ware House Successfully Created' });
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
          this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
     } else {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, ware House!'} );
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();

       }
     });
  }
}

// update Ware House
update() {
  if (this.Form.valid) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.Ware_House_Update({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Ware House Successfully Updated'} );
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
           this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
       }  else {
        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Ware House!' });
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();
           console.log(ReceivingData);

        }
     });
  }
 }
}
