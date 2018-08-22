import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-pfinfo-companysettings',
  templateUrl: './model-pfinfo-companysettings.component.html',
  styleUrls: ['./model-pfinfo-companysettings.component.css']
})
export class ModelPfinfoCompanysettingsComponent implements OnInit {

  onClose: Subject<any>;
  Type: String;
  Data;
  Uploading: Boolean = false;
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';
  Form: FormGroup;
  constructor(  public bsModalRef: BsModalRef,
    public Service: CompanySettingsService,
    public Toastr: ToastrService
  ) {}


  ngOnInit() {
    this.onClose = new Subject();
    if (this.Type === 'Create') {
    this.Form = new FormGroup({
      Pf_No: new FormControl('', {
                                  validators: Validators.required,
                                  asyncValidators: [ this.PfInfo_AsyncValidate.bind(this) ],
                                  updateOn: 'blur' } ),
      Registration_Date: new FormControl('', Validators.required),
      Signatory_Name: new FormControl('', Validators.required),
      Signatory_Designation: new FormControl('', Validators.required),
      Company_Id: new FormControl(this.Company_Id, Validators.required),
      Created_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  if (this.Type === 'Edit') {
    this.Form = new FormGroup({
      Pf_No: new FormControl(this.Data.Pf_No, {validators: Validators.required,
                                              asyncValidators: [ this.PfInfo_AsyncValidate.bind(this) ],
                                              updateOn: 'blur' } ),
      Pf_Info_Id: new FormControl(this.Data._id, Validators.required),
      Registration_Date: new FormControl(this.Data.Registration_Date, Validators.required),
      Signatory_Name: new FormControl(this.Data.Signatory_Name, Validators.required),
      Signatory_Designation: new FormControl(this.Data.Signatory_Designation, Validators.required),
      Modified_By: new FormControl(this.User_Id, Validators.required)
    });
  }
}

PfInfo_AsyncValidate( control: AbstractControl ) {
  const Data = { Pf_No: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
  Info = Info.toString();
  return this.Service.PfInfo_AsyncValidate({'Info': Info}).pipe(map( response => {
     const ReceivingData = JSON.parse(response['_body']);
     if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
        return null;
     } else {
        return { PfInfo_NotAvailable: true };
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

// submit Pf Info
submit() {
  if (this.Form.valid && !this.Uploading ) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.PfInfo_Create({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Pf Info Successfully Created' });
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
          this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
     } else {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Pf Info!'} );
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();

       }
     });
  }
}

// update Pf Info
update() {
  if (this.Form.valid) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.pfInfo_Update({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Pf Info Successfully Updated'} );
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
           this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
       }  else {
        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Pf Info!' });
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();
           console.log(ReceivingData);

        }
     });
  }
 }
}

