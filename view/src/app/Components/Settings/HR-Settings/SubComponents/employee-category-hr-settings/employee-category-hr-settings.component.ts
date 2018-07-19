import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelEmployeecategoryHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-employeecategory-hrsettings/model-employeecategory-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { HrmsSettingsService } from '../../../../../services/settings/HrmsSettings/hrms-settings.service';


import { HrSettingsService } from './../../../../../services/settings/HrSettings/hr-settings.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-employee-category-hr-settings',
  templateUrl: './employee-category-hr-settings.component.html',
  styleUrls: ['./employee-category-hr-settings.component.css']
})
export class EmployeeCategoryHrSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;

   _List: any[] = [];

   constructor (  private modalService: BsModalService,
                  private Service: HrSettingsService
               ) {
                  // Get Employee Category List
                     const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Employee_category_List({'Info': Info}).subscribe( response => {
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

   // Create New Employee category
      CreateEmployeeCategory() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelEmployeecategoryHrsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
               alert('Employee category Successfully Added.');
            } else {
            alert(response.Message);
            }
         });
      }
   // Edit Employee category
      EditEmployeecategory(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelEmployeecategoryHrsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
               alert('Employee category Successfully Updated.');
            } else {
               alert(response.Message);
            }
         });
      }
   // View Employee Category
      ViewEmployeeCategory(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelEmployeecategoryHrsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Employee Category
      DeleteEmployeeCategory(_index) {
         const initialState = {
            Text: 'Employee Category'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Employee_category_Id' :  this._List[_index]._id, 'Modified_By' : '2' };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Employee_category_Delete({'Info': Info}).subscribe( returnResponse => {
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
               alert('Employee Category Delete Confirmation = Cancel.');
            }
         });
      }
}
