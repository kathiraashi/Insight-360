import { Component, OnInit } from '@angular/core';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeadsourceLeadsettingsComponent } from '../../../../../models/settings/lead_settings/model-leadsource-leadsettings/model-leadsource-leadsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { LeadsSettingsService } from './../../../../../services/settings/leadsSettings/leads-settings.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-lead-source-type-lead-settings',
  templateUrl: './lead-source-type-lead-settings.component.html',
  styleUrls: ['./lead-source-type-lead-settings.component.css']
})
export class LeadSourceTypeLeadSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;
   _List: any[] = [];

   constructor (  private modalService: BsModalService,
                  private Service: LeadsSettingsService
               ) {
                  // Get Lead Source List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Lead_Source_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                        } else if (response['status'] === 400 && !ResponseData['Status']) {
                           alert(ResponseData['Message']);
                        } else if (response['status'] === 417 && !ResponseData['Status']) {
                           alert(ResponseData['Message']);
                        } else {
                           alert('Some Error Occurred!, But not Identify!');
                           console.log(response);
                        }
                     });
                  }

   ngOnInit() {
   }
   // Create Lead Source
      CreateLeadSource() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelLeadsourceLeadsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
               alert('Lead Source Successfully Added.');
            } else {
            alert(response.Message);
            }
         });
      }
   // Edit Lead Source
      EditLeadSource(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelLeadsourceLeadsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
               alert('Lead Source Successfully Updated.');
            } else {
               alert(response.Message);
            }
         });
      }
   // View Lead Source
      ViewLeadSource(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelLeadsourceLeadsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Lead Source
      DeleteLeadSource(_index) {
         const initialState = {
            Text: 'Lead Source'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Lead_Source_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Lead_Source_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     alert('Successfully Deleted');
                  } else if (returnResponse['status'] === 400 && !ResponseData['Status']) {
                     alert(ResponseData['Message']);
                  } else if (returnResponse['status'] === 417 && !ResponseData['Status']) {
                     alert(ResponseData['Message']);
                  } else {
                     alert('Some Error Occurred!, But not Identify!');
                     console.log(returnResponse);
                  }
               });
            } else {
               alert('Lead Source Delete Confirmation = Cancel.');
            }
         });
      }
}
