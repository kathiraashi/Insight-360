import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';
import { CompanySettingsService } from '../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-itinfo-companysettings',
  templateUrl: './model-itinfo-companysettings.component.html',
  styleUrls: ['./model-itinfo-companysettings.component.css']
})
export class ModelItinfoCompanysettingsComponent implements OnInit {

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
      Pan_No: new FormControl('', {
                                  validators: Validators.required,
                                  asyncValidators: [ this.ItInfo_AsyncValidate.bind(this) ],
                                  updateOn: 'blur' } ),
      Tan_No: new FormControl('', Validators.required),
      Tan_Circle_No: new FormControl('', Validators.required),
      TDS_Details: new FormControl(''),
      Company_Id: new FormControl(this.Company_Id, Validators.required),
      Created_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  if (this.Type === 'Edit') {
    this.Form = new FormGroup({
      Pan_No: new FormControl(this.Data.Pan_No, {validators: Validators.required,
                                              asyncValidators: [ this.ItInfo_AsyncValidate.bind(this) ],
                                              updateOn: 'blur' } ),
      It_Info_Id: new FormControl(this.Data._id, Validators.required),
      Tan_No: new FormControl(this.Data.Tan_No, Validators.required),
      Tan_Circle_No: new FormControl(this.Data.Tan_Circle_No, Validators.required),
      TDS_Details: new FormControl(''),
      Modified_By: new FormControl(this.User_Id, Validators.required)
    });
  }
  }
   ItInfo_AsyncValidate( control: AbstractControl ) {
    const Data = { Pan_No: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Service.ItInfo_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { ItInfo_NotAvailable: true };
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
// submit It Info
submit() {
  if (this.Form.valid && !this.Uploading ) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.ItInfo_Create({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'It Info Successfully Created' });
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
          this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
     } else {
          this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, It Info!'} );
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();

       }
     });
  }
}

// update It Info
update() {
  if (this.Form.valid) {
    this.Uploading = true;
     const Data = this.Form.value;
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Service.ItInfo_Update({'Info': Info}).subscribe(response => {
      this.Uploading = false;
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'It Info Successfully Updated'} );
           this.onClose.next({Status: true, Response: DecryptedData});
           this.bsModalRef.hide();
        } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({ Status: false, Message: 'Bad Request Error'});
           this.bsModalRef.hide();
        } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
       }  else {
        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, It Info!' });
           this.onClose.next({Status: false, Message: 'UnExpected Error'});
           this.bsModalRef.hide();
           console.log(ReceivingData);

        }
     });
  }
 }

}
