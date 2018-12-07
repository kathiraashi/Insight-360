import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/Product/product.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info;
   bsModalRef: BsModalRef;
   _List: any;
   PurchaseRequest_Id: any;
   Editable: Boolean;
   Approve: Boolean;
   Cancel: Boolean;
   RequestApprove: Boolean;
   Modification: Boolean;
   Cancelable: boolean;
   Rejectable: boolean;
   CancelApproval: boolean;
   Loader: Boolean = true;
   constructor(
      private modalService: BsModalService,
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService
   ) {
       // get user login info
       this.User_Info = this.Login_Service.LoggedUserInfo();
       this.Company_Id = this.User_Info.Company_Id;
       this.User_Id = this.User_Info._id;
       // Get User Details
       const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id};
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       // get Purchase Request List
      this.Purchase_Service.PurchaseRequest_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            if (this._List) {
               this.Loader = false;
            }
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
    }


   ngOnInit() {
   }
   ActionIndex(_index) {
      this.PurchaseRequest_Id = this._List[_index]._id;
      const Status = this._List[_index].Status;
      if ( Status === 'Draft') {
         this.Editable = true;
         this.Cancelable = true;
         this.RequestApprove = true;
         this.Modification = false;
         this.Approve = false;
         this.Rejectable = false;
         this.CancelApproval = false;
      }
      if (Status === 'Modification') {
         this.Editable = true;
         this.Cancelable = false;
         this.RequestApprove = true;
         this.Modification = false;
         this.Approve = false;
         this.Rejectable = false;
         this.CancelApproval = false;
      }
      if (Status === 'Waiting for approval') {
         this.Editable = false;
         this.Cancelable = false;
         this.RequestApprove = false;
         this.Modification = true;
         this.Approve = true;
         this.Rejectable = true;
         this.CancelApproval = false;
      }
      if (Status === 'Approved') {
         this.Editable = false;
         this.Cancelable = false;
         this.RequestApprove = false;
         this.Modification = false;
         this.Approve = false;
         this.Rejectable = false;
         this.CancelApproval = true;
      }
      if (Status === 'Rejected' || Status === 'Approval Canceled') {
         this.Editable = false;
         this.Cancelable = false;
         this.RequestApprove = false;
         this.Modification = false;
         this.Approve = false;
         this.Rejectable = false;
         this.CancelApproval = false;
      }
   }
   ViewPurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   ApprovePurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   EditPurchaseRequest () {
      this.router.navigate(['Purchase_Request_Edit', this.PurchaseRequest_Id]);
   }
   ModifyPurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   CancelPurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   CancelApprovalPurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   RejectPurchaseRequest () {
      this.router.navigate(['Purchase_Request_View', this.PurchaseRequest_Id]);
   }
   DeletePurchaseRequest() {
      const initialState = {
         Text: 'Purchase Request'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
