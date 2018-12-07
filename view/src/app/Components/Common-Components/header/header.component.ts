import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { ModelIncomeComponent } from '../../../models/Accounts/model-income/model-income.component';
import { ModelContactCustomersViewComponent } from '../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelActivitiesCustomersViewComponent } from '../../../models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
import { NotificationService } from '../../../services/Notification/notification.service';
import { LoginService } from './../../../services/LoginService/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info;
   _NotifyList: any;
   _NotifyCount = 0;
   Button: Boolean = false;
   bsModalRef: BsModalRef;
   Modules: any[] = [];
   SubModules: any[] = [];
   constructor(
      public router: Router,
      private modalService: BsModalService,
      private Notify_Service: NotificationService,
      private Login_Service: LoginService
   ) {
      const SessionData = localStorage.getItem('Token');
      const Security = (SessionData.slice(0, -2)).slice(-32);
      const encData = (SessionData.slice(0, -34));
      const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
      const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      this.Modules = DecryptedData.Module_Permissions;
      this.SubModules = DecryptedData.SubModule_Permissions;
   }

   ngOnInit() {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      // Get Notify List
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Notify_Service.Notify_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._NotifyList = DecryptedData;
            if (this._NotifyList) {
               this.takeCount();
            }
            console.log(this._NotifyList);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            console.log('Error =>' + ResponseData['Message']);
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            console.log('Error =>' + ResponseData['Message']);
         } else {
            console.log('Error =>' + 'unknown');
         }
      });

   }
   takeCount() {
      const yetToList = this._NotifyList.filter(obj => obj.If_Notify === false);
      this._NotifyCount = yetToList.length;
   }
   notifyOpen() {
      const notified = this._NotifyList.map(obj => obj._id);
      console.log(notified);
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id, 'notified': notified};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Notify_Service.Notify_update({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this._NotifyCount = 0;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            console.log('Error =>' + ResponseData['Message']);
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            console.log('Error =>' + ResponseData['Message']);
         } else {
            console.log('Error =>' + 'unknown');
         }
      });
   }
   ButtonClick() {
      this.Button = !this.Button;
      console.log(this.Button);
   }
   ModulesValidate(Key) {
      let Available = true;
      this.Modules.map(Obj => { if (Obj.Module_Key === Key) {  Available = true; } });
      return Available;
   }

   SubModulesValidate(Key) {
      let Available = true;
      this.SubModules.map(Obj => { if (Obj.SubModule_Key === Key) {  Available = true; } });
      return Available;
   }

   LogOut() {
      localStorage.clear();
      this.router.navigate(['/Login']);
   }
   CreateContact() {
      const initialState = {
        Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelContactCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   CreateActivity() {
      const initialState = {
        Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelActivitiesCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
    }
   Income() {
   const initialState = {
      Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelIncomeComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
}
