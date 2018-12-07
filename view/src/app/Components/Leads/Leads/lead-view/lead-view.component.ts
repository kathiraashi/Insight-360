import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CallScheduleLeadComponent } from '../../../../models/Leads/call-schedule-lead/call-schedule-lead.component';
import { LogPhoneCallLeadComponent } from '../../../../models/Leads/log-phone-call-lead/log-phone-call-lead.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { LeadsService } from './../../../../services/Leads/leads.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.css']
})
export class LeadViewComponent implements OnInit {
   Active_Tab = 'Log_Phone_Call';
   _Data;
   Product_Id: any;
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   bsModalRef: BsModalRef;
   Lead_Id: any;
   _Log_Call_List: any;
   _Call_Schedule_List: any;
   Loader: Boolean = true;

   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      private active_route: ActivatedRoute,
      public router: Router,
      public Leads_Service: LeadsService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      this.active_route.url.subscribe(u => {
      this.Lead_Id = this.active_route.snapshot.params['Lead_Id'];
         const Data = {'Company_Id': this.Company_Id, 'Lead_Id': this.Lead_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Leads_Service.Leads_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               this.Loader = (this._Data) ? false : true;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
            }
         });
      });
   }

   ngOnInit() {
      this.Active_Tab_Change('Log_Phone_Call');
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name ;
      if (this.Active_Tab === 'Log_Phone_Call') {
         const Data = {'Company_Id': this.Company_Id, 'Lead_Id': this.Lead_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Leads_Service.FilteredLogPhoneCall_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Log_Call_List = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
      } else if (this.Active_Tab === 'Call_Schedule') {
         const Data = { 'Company_Id' : this.Company_Id, 'Lead_Id': this.Lead_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Leads_Service.FilteredCallSchedule_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Call_Schedule_List = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
      }
   }

   // View Call Schedule
   ViewCallSchedule(_index) {
      const initialState = {
         Type: 'View',
         Data: this._Call_Schedule_List[_index]
      };
      this.bsModalRef = this.modalService.show(CallScheduleLeadComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
   // View Log Call
   ViewLogCall(_index) {
      const initialState = {
         Type: 'View',
         Data: this._Log_Call_List[_index]
      };
      this.bsModalRef = this.modalService.show(LogPhoneCallLeadComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }

   CreateCallSchedule() {
     this.router.navigate(['/Create_Call_Schedule', {to: this._Data['_id']}]);
   }
   CreateLogPhoneCall() {
      this.router.navigate(['/Create_Log_Phone_call', {to: this._Data['_id']}]);
   }
   DeleteLogPhoneCall() {
      const initialState = {
         Text: 'Log Phone Call'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
   DeleteCallSchedule() {
      const initialState = {
         Text: 'Log Phone Call'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
