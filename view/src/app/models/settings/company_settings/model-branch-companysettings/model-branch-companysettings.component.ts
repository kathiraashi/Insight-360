import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { AdminService } from './../../../../services/Admin/admin.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CompanySettingsService } from './../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-branch-companysettings',
  templateUrl: './model-branch-companysettings.component.html',
  styleUrls: ['./model-branch-companysettings.component.css']
})
export class ModelBranchCompanysettingsComponent implements OnInit {

  _Data: Object;
  _Departments: any[] = [];
  _Branch_Info: Object;

    AllCountry: any[];
    AllStateOfCountry: any[];
    AllCityOfState:  any[];

  onClose: Subject<any>;
  Form: FormGroup;

  Uploading: Boolean = false;

  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';

  constructor  (  public bsModalRef: BsModalRef,
      public service: CompanySettingsService,
      public Toastr: ToastrService,
      public Service: AdminService
 ) {
   // Get Country List
   const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
   this.Service.Country_List({'Info': Info}).subscribe( response => {
    const ResponseData = JSON.parse(response['_body']);
    if (response['status'] === 200 && ResponseData['Status'] ) {
       const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
       const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
       this.AllCountry = DecryptedData;
       this.AllCountry = DecryptedData;
    } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
       this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
    } else if (response['status'] === 401 && !ResponseData['Status']) {
       this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
    } else {
       this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Ownership Types Simple List Getting Error!, But not Identify!' });
    }
 });
  }
   ngOnInit() {
    this.onClose = new Subject();

    if (this._Data['Type'] === 'Create' || 'Edit') {

      const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.service.Departments_Simple_List({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Departments = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Departments Simple List Getting Error!, But not Identify!' });
         }
      });
         this.Form = new FormGroup({
         Branch_Name: new FormControl('', Validators.required),
         Branch_Head: new FormControl('', Validators.required),
         Departments: new FormControl(null, Validators.required),
         AllStreet: new FormControl('', Validators.required),
         AllArea: new FormControl('', Validators.required),
         AllCountry: new FormControl(null, Validators.required),
         AllState: new FormControl(null, Validators.required),
         AllCity: new FormControl(null, Validators.required),
         AllZipCode: new FormControl('', Validators.required),
         Address: new FormControl(''),
        Company_Id: new FormControl(this.Company_Id),
        User_Id: new FormControl(this.User_Id),
     });
  }
  if (this._Data['Type'] === 'View') {
    this._Branch_Info = this._Data['Branch_Info'];
 }
  }

  onSubmit() {
   if (this._Data['Type'] === 'Create') {
      this.Submit();
   }
   if (this._Data['Type'] === 'Edit') {
      this.update();
   }
}

  AllCountry_Change() {
   const SelectedCountry = this.Form.controls['AllCountry'].value;
   if (SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
      const Data = {Country_Id: SelectedCountry._id, 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       // Get State List
      this.Service.State_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.AllStateOfCountry = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
         }
      });
   }
   this.Form.controls['AllState'].setValue(null);
   this.Form.controls['AllCity'].setValue(null);
}

AllState_Change() {
   const SelectedState = this.Form.controls['AllState'].value;
   if ( SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
      const Data = {State_Id: SelectedState._id, 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       // Get City List
      this.Service.City_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.AllCityOfState = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
         }
      });
   }
   this.Form.controls['AllCity'].setValue(null);
}

Submit() {
   if (this.Form.valid && !this.Uploading) {
      this.Uploading = true;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
      Info = Info.toString();
      this.service.Branch_Create({ 'Info': Info }).subscribe( response => {
         this.Uploading = false;
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Branch Successfully Created' });
            this.onClose.next({Status: true, Response: DecryptedData});
            this.bsModalRef.hide();
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            this.onClose.next({Status: false});
            this.bsModalRef.hide();
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            this.onClose.next({Status: false});
            this.bsModalRef.hide();
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Branch Getting Error!, But not Identify!' });
            this.onClose.next({Status: false});
            this.bsModalRef.hide();
         }
      });
}
 }

 update() {
   if (this.Form.valid) {
    this.Uploading = true;
      const Data = this.Form.value;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.service.Branch_Update({'Info': Info}).subscribe( response => {
        this.Uploading = false;
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData.Status) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Branch Successfully Updated'} );
            this.onClose.next({Status: true, Response: DecryptedData});
            this.bsModalRef.hide();
         } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({Status: false});
            this.bsModalRef.hide();
         } else if (response['status'] === 401 && !ReceivingData['Status']) {
          this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
       }  else {
        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Branch!' });
        this.onClose.next({Status: false, Message: 'UnExpected Error!'});
            this.bsModalRef.hide();
         }
      });
   }

}
}
