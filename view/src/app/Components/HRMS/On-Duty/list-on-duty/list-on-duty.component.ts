import { Component, OnInit } from '@angular/core';
import { HrmsService } from './../../../../services/Hrms/hrms.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { ModelOndutyConfirmComponent } from 'src/app/models/HRMS/model-onduty-confirm/model-onduty-confirm.component';
@Component({
  selector: 'app-list-on-duty',
  templateUrl: './list-on-duty.component.html',
  styleUrls: ['./list-on-duty.component.css']
})
export class ListOnDutyComponent implements OnInit {
   Loader: Boolean = true;
   Active_Tab = 'other_request';
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _OtherList: any;
   _MyList: any;
   OnDuty_Id: any;
   bsModalRef: BsModalRef;
   showEditButton: Boolean = true;
   showRequestButton: Boolean = true;
   showApproveButton: Boolean = true;
   showModifyButton: Boolean = true;
   showRejectButton: Boolean = true;
   constructor(
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private modalService: BsModalService,
      private Login_Service: LoginService,
      private Hrms_Service: HrmsService,
      private Toastr: ToastrService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // get Leaves List
      this.Hrms_Service.HrmsOnDuty_List({'Info': Info}).subscribe( response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._MyList = DecryptedData.myList;
         this._OtherList = DecryptedData.otherList;
         this.Loader = (!this._MyList && !this._OtherList) ? true :  false;
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
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
   ActionIndex(_index) {
      this.OnDuty_Id = (this.Active_Tab === 'other_request') ? this._OtherList[_index]._id : this._MyList[_index]._id;
      const status = (this.Active_Tab === 'other_request') ? this._OtherList[_index].Status : this._MyList[_index].Status;
      this.showEditButton = (status === 'Draft' || status === 'Modify') ? true : false;
      this.showRequestButton = (status === 'Draft') ? true : false;
      this.showModifyButton = ((status === 'Requested') && this.Active_Tab === 'other_request') ?  true : false;
      this.showRejectButton = ((status === 'Requested') && this.Active_Tab === 'other_request') ? true : false;
      this.showApproveButton = ((status === 'Requested') && this.Active_Tab === 'other_request') ? true : false;
   }
   Edit() {
      this.router.navigate(['Edit_Onduty', this.OnDuty_Id]);
   }
   View() {
      this.router.navigate(['View_Onduty', this.OnDuty_Id]);
   }
   Request() {
      const initialState = {
         Type: 'Confirm_Request',
         Data: this.OnDuty_Id,
      };
      this.bsModalRef = this.modalService.show(ModelOndutyConfirmComponent, Object.assign({initialState}, { class: '' , ignoreBackdropClick: true}));
      this.bsModalRef.content.onClose.subscribe(u => {
         if (this.Active_Tab === 'other_request') {
            const i = this._OtherList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._OtherList[i].OnDuty_Status = 'Requested';
            this._OtherList[i].Status = 'Requested';
         } else {
            const i = this._MyList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._MyList[i].OnDuty_Status = 'Requested';
            this._MyList[i].Status = 'Requested';
         }
      });
   }
   Modify() {
      const initialState = {
         Type: 'Confirm_Modify',
         Data: this.OnDuty_Id,
      };
      this.bsModalRef = this.modalService.show(ModelOndutyConfirmComponent, Object.assign({initialState}, { class: '' , ignoreBackdropClick: true}));
      this.bsModalRef.content.onClose.subscribe(u => {
         if (this.Active_Tab === 'other_request') {
            const i = this._OtherList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._OtherList[i].OnDuty_Status = 'Modify';
            this._OtherList[i].Status = 'Modify';
         } else {
            const i = this._MyList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._MyList[i].OnDuty_Status = 'Modify';
            this._MyList[i].Status = 'Modify';
         }
      });
   }
   Approve() {
      const initialState = {
         Type: 'Confirm_Approve',
         Data: this.OnDuty_Id,
      };
      this.bsModalRef = this.modalService.show(ModelOndutyConfirmComponent, Object.assign({initialState}, { class: '' , ignoreBackdropClick: true}));
      this.bsModalRef.content.onClose.subscribe(u => {
         if (this.Active_Tab === 'other_request') {
            const i = this._OtherList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._OtherList[i].OnDuty_Status = 'Approved';
            this._OtherList[i].Status = 'Approved';
         } else {
            const i = this._MyList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._MyList[i].OnDuty_Status = 'Approved';
            this._MyList[i].Status = 'Approved';
         }
      });
   }
   Reject() {
      const initialState = {
         Type: 'Confirm_Reject',
         Data: this.OnDuty_Id,
      };
      this.bsModalRef = this.modalService.show(ModelOndutyConfirmComponent, Object.assign({initialState}, { class: '' , ignoreBackdropClick: true}));
      this.bsModalRef.content.onClose.subscribe(u => {
         if (this.Active_Tab === 'other_request') {
            const i = this._OtherList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._OtherList[i].OnDuty_Status = 'Rejected';
            this._OtherList[i].Status = 'Rejected';
         } else {
            const i = this._MyList.findIndex(x => (x._id === this.OnDuty_Id ));
            this._MyList[i].OnDuty_Status = 'Rejected';
            this._MyList[i].Status = 'Rejected';
         }
      });
   }
}
