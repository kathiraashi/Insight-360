import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelRegistrationtypeCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-registrationtype-companysettings/model-registrationtype-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { CompanySettingsService } from '../../../../../services/settings/CompanySettings/company-settings.service';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../../services/PermissionsCheck/permissions-check.service';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-registration-type-company-settings',
  templateUrl: './registration-type-company-settings.component.html',
  styleUrls: ['./registration-type-company-settings.component.css']
})
export class RegistrationTypeCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;
  _Create: Boolean = false;
  _View: Boolean = false;
  _Edit: Boolean = false;
  _Delete: Boolean = false;
  Loader: Boolean = true;
  _List: any[] = [];
  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';

  constructor(private modalService: BsModalService,
              private Service: CompanySettingsService,
              private Toastr: ToastrService,
              public PermissionCheck: PermissionsCheckService) {


                 // SubModule Permissions
                 const Permissions = this.PermissionCheck.SubModulePermissionValidate('Settings_Company_Settings');
                 if (Permissions['Status']) {
                   this._Create = Permissions['Create_Permission'];
                   this._View = Permissions['View_Permission'];
                   this._Edit = Permissions['Edit_Permission'];
                   this._Delete = Permissions['Delete_Permission'];
                 }

                 // Get  Registration Type List
                 const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, };
                 let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                 Info = Info.toString();
                 this.Service.Registration_Type_List({'Info': Info}).subscribe( response => {
                    const ResponseData = JSON.parse(response['_body']);
                    this.Loader = false;
                    if (response['status'] === 200 && ResponseData['Status'] ) {
                       const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                       const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                       this._List = DecryptedData;
                    } else if (response['status'] === 400 || response['status'] === 417  && !ResponseData['Status']) {
                      this.Toastr.NewToastrMessage({ Type: 'Error', Message: response['Message'] });
                    } else if (response['status'] === 401 && !ResponseData['Status']) {
                      this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                   } else {
                      this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' });
                    }
                 });
              }

            ngOnInit() {
          }
  CreateRegistrationType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationtypeCompanysettingsComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: '' }));
    this.bsModalRef.content.onClose.subscribe(response => {
      if (response.Status) {
         this._List.splice(0, 0, response.Response);
      }
   });
   }

   // Edit Registration Type
   EditRegistrationType(_index) {
      const initialState = {
         Type: 'Edit',
         Data: this._List[_index]
      };
      this.bsModalRef = this.modalService.show(ModelRegistrationtypeCompanysettingsComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: '' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response.Status) {
            this._List[_index] = response.Response;
         }
      });
   }
  ViewRegistrationType(_index) {
    const initialState = {
      Type: 'View',
      Data: this._List[_index]
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationtypeCompanysettingsComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
  }
  DeleteRegistrationType(_index) {
    const initialState = {
      Text: 'Registration Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: 'modal-sm' }));
    this.bsModalRef.content.onClose.subscribe(response => {
      if (response.Status) {
         const Data = { 'Registration_Type_Id' :  this._List[_index]._id, 'Modified_By' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Registration_Type_Delete({'Info': Info}).subscribe( returnResponse => {
            const ResponseData = JSON.parse(returnResponse['_body']);
            if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
               this._List.splice(_index, 1);
               this.Toastr.NewToastrMessage( {  Type: 'Warning', Message: 'Registration Type Successfully Deleted'  } );
            } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417  && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ResponseData['Message']  } );
            } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' } );
              }
         });
      }
   });
   }
}
