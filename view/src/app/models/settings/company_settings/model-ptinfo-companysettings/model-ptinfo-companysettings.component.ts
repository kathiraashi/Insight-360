import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';


import { BsModalRef } from 'ngx-bootstrap';

import * as CryptoJS from 'crypto-js';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-ptinfo-companysettings',
  templateUrl: './model-ptinfo-companysettings.component.html',
  styleUrls: ['./model-ptinfo-companysettings.component.css']
})
export class ModelPtinfoCompanysettingsComponent implements OnInit {

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
      Pt_No: new FormControl('', {
                                  validators: Validators.required,
                                  asyncValidators: [ this.PtInfo_AsyncValidate.bind(this) ],
                                  updateOn: 'blur' } ),
      Registration_Date: new FormControl('', Validators.required),
      Signatory_Name: new FormControl('', Validators.required),
      Company_Id: new FormControl(this.Company_Id, Validators.required),
      Created_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  if (this.Type === 'Edit') {
    this.Form = new FormGroup({
      Pt_No: new FormControl(this.Data.Pt_No, {validators: Validators.required,
                                              asyncValidators: [ this.PtInfo_AsyncValidate.bind(this) ],
                                              updateOn: 'blur' } ),
      Pt_Info_Id: new FormControl(this.Data._id, Validators.required),
      Registration_Date: new FormControl(this.Data.Registration_Date, Validators.required),
      Signatory_Name: new FormControl(this.Data.Signatory_Name, Validators.required),
      Modified_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  }
  PtInfo_AsyncValidate( control: AbstractControl ) {
    const Data = { Pt_No: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Service.PtInfo_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { PtInfo_NotAvailable: true };
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
// submit Pt Info
submit() {
  if (this.Form.valid && !this.Uploading ) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.PtInfo_Create({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Pt Info Successfully Created' });
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
          this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
     } else {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Pt Info!'} );
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();

       }
     });
  }
}

// update Pt Info
update() {
  if (this.Form.valid) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.PtInfo_Update({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Pt Info Successfully Updated'} );
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
           this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
       }  else {
        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Pt Info!' });
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();
           console.log(ReceivingData);

        }
     });
  }
 }

}
