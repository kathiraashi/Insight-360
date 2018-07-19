import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDesignationHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-designation-hrsettings/model-designation-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { HrSettingsService } from './../../../../../services/settings/HrSettings/hr-settings.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-designation-hr-settings',
  templateUrl: './designation-hr-settings.component.html',
  styleUrls: ['./designation-hr-settings.component.css']
})
export class DesignationHrSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;
   _List: any[] = [];


   constructor (  private modalService: BsModalService,
                  private Service: HrSettingsService
               )  {
                  // Get Department List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Designation_List({'Info': Info}).subscribe( response => {
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
   // Create New Designation
      CreateDesignation() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelDesignationHrsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
               alert('Designation Successfully Added.');
            } else {
            alert(response.Message);
            }
         });
      }
   // Edit Designation
      EditDesignation(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDesignationHrsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
               alert('Designation Successfully Updated.');
            } else {
               alert(response.Message);
            }
         });
      }
   // View Designation
      ViewDesignation(_index)  {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDesignationHrsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
      // Delete Designation
         DeleteDesignation(_index) {
            const initialState = {
               Text: 'Department'
            };
            this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
            this.bsModalRef.content.onClose.subscribe(response => {
               if (response.Status) {
                  const Data = { 'Designation_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Service.Designation_Delete({'Info': Info}).subscribe( returnResponse => {
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
                  alert('Designation Delete Confirmation = Cancel.');
               }
            });
         }
}
