import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelIndustrytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { CrmSettingsService } from './../../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../../services/common-services/toastr-service/toastr.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-industry-type-crm-settings',
  templateUrl: './industry-type-crm-settings.component.html',
  styleUrls: ['./industry-type-crm-settings.component.css']
})
export class IndustryTypeCrmSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;

   _List: any[] = [];

   constructor(   private modalService: BsModalService,
                  private Service: CrmSettingsService,
                  private Toastr: ToastrService
               ) {
                  // Get Industry Type List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Industry_Type_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage(
                              {  Type: 'Error',
                                 Message: response['Message']
                              }
                           );
                        } else {
                           this.Toastr.NewToastrMessage(
                              {  Type: 'Error',
                                 Message: 'Industry Type List Getting Error!, But not Identify!'
                              }
                           );
                        }
                     });
                  }

   ngOnInit() {
   }

   // Create New Industry Type
      CreateIndustrytype() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List.splice(0, 0, response['Response']);
               this.Toastr.NewToastrMessage(
                  {  Type: 'Success',
                     Message: 'Industry Type Successfully Added'
                  }
               );
            } else {
               this.Toastr.NewToastrMessage(
                  {  Type: 'Error',
                     Message: response['Message']
                  }
               );
            }
         });
      }
   // Edit Industry Type
      EditIndustrytype(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List[_index] = response['Response'];
               this.Toastr.NewToastrMessage(
                  {  Type: 'Info',
                     Message: 'Industry Type Successfully Updated',
                     Duration: 1000
                  }
               );
            } else {
              this.Toastr.NewToastrMessage(
                  {  Type: 'Error',
                     Message: response['Message']
                  }
               );
            }
         });
      }
   // View Industry Type
      ViewIndustrytype(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Industry Type
      DeleteIndustryType(_index) {
         const initialState = {
            Text: 'Industry Type'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Industry_Type_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Industry_Type_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Warning',
                           Message: 'Industry Type Successfully Deleted'
                        }
                     );
                  } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Some Error Occurred!, But not Identify!'
                        }
                     );
                  }
               });
            }
         });
      }
}
