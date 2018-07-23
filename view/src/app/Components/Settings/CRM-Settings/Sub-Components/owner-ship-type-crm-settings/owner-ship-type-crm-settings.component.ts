import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelOwnershipytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-ownershipytype-crmsettings/model-ownershipytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { CrmSettingsService } from './../../../../../services/settings/crmSettings/crm-settings.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-owner-ship-type-crm-settings',
  templateUrl: './owner-ship-type-crm-settings.component.html',
  styleUrls: ['./owner-ship-type-crm-settings.component.css']
})
export class OwnerShipTypeCrmSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;
   _List: any[] = [];

   constructor(   private modalService: BsModalService,
                  private Service: CrmSettingsService
               ) {
                  // Get Ownership Type List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Ownership_Type_List({'Info': Info}).subscribe( response => {
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

   // Create New Ownership Type
      CreateOwnershiptype() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelOwnershipytypeCrmsettingsComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
            }
         });
      }
   // Edit Ownership Type
      EditOwnershiptype(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelOwnershipytypeCrmsettingsComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
            }
         });
      }
   // View Ownership Type
      ViewOwnershiptype(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelOwnershipytypeCrmsettingsComponent, Object.assign({initialState}, {class: '' }));
      }
   // Delete Ownership Type
      DeleteOwnershipType(_index) {
         const initialState = {
            Text: 'Ownership Type'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState},  { ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Ownership_Type_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Ownership_Type_Delete({'Info': Info}).subscribe( returnResponse => {
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
               alert('Ownership Type Delete Confirmation = Cancel.');
            }
         });
      }
}

