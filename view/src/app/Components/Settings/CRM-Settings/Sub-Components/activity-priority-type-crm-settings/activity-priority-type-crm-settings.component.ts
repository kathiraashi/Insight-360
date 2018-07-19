import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitypriorityCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-activitypriority-crmsettings/model-activitypriority-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { CrmCustomersCreateComponent } from '../../../../CRM/Customers/crm-customers-create/crm-customers-create.component';
import { CrmSettingsService } from '../../../../../services/settings/crmSettings/crm-settings.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-activity-priority-type-crm-settings',
  templateUrl: './activity-priority-type-crm-settings.component.html',
  styleUrls: ['./activity-priority-type-crm-settings.component.css']
})
export class ActivityPriorityTypeCrmSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;

   _List: any[] = [];

   constructor (  private modalService: BsModalService,
                  private Service: CrmSettingsService
               ) {
                  // Get Activity Priority List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Activity_Priority_List({'Info': Info}).subscribe( response => {
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
   // Create New Activity Priority
      CreateActivitypriority() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelActivitypriorityCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
               alert('Activity Priority Successfully Created.');
            } else {
            alert(response.Message);
            }
         });
      }
   // Edit Activity Priority
      EditActivityPriority(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelActivitypriorityCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
               alert('Activity Priority Successfully Updated.');
            } else {
               alert(response.Message);
            }
         });
      }
   // View Activity Priority
      ViewActivitypriority(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelActivitypriorityCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Activity Priority
      DeleteActivitypriority(_index)  {
         const initialState = {
            Text: 'Activity Priority'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Activity_Priority_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Activity_Priority_Delete({'Info': Info}).subscribe( returnResponse => {
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
               alert('Activity Priority Delete Confirmation = Cancel.');
            }
         });
      }
}
