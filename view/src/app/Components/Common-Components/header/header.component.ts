import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModelIncomeComponent } from '../../../models/Accounts/model-income/model-income.component';
import { ModelContactCustomersViewComponent } from '../../../models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
import { ModelActivitiesCustomersViewComponent } from '../../../models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   Button: Boolean = false;
   bsModalRef: BsModalRef;
   Modules: any[] = [];
   SubModules: any[] = [];
   constructor( public router: Router, private modalService: BsModalService) {
      const SessionData = localStorage.getItem('Token');
      const Security = (SessionData.slice(0, -2)).slice(-32);
      const encData = (SessionData.slice(0, -34));
      const CryptoBytes  = CryptoJS.AES.decrypt(encData, Security);
      const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      this.Modules = DecryptedData.Module_Permissions;
      this.SubModules = DecryptedData.SubModule_Permissions;
   }

   ngOnInit() {
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
