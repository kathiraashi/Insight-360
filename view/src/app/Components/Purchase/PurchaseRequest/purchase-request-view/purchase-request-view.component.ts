import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { PurchaseService } from './../../../../services/Purchase/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-purchase-request-view',
  templateUrl: './purchase-request-view.component.html',
  styleUrls: ['./purchase-request-view.component.css']
})
export class PurchaseRequestViewComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info;
   PurchaseRequest_Id: any;
   _Data: any;
   Purchase_Request_Details: any;
   Product_Details: any;
   Loader: Boolean = true;
   constructor(
      private Toastr: ToastrService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      public Purchase_Service: PurchaseService,
      private Login_Service: LoginService,
      private active_route: ActivatedRoute
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
       // Get Crm Customer View
       this.active_route.url.subscribe(u => {
         this.PurchaseRequest_Id = this.active_route.snapshot.params['PurchaseRequest_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Purchase_Service.PurchaseRequest_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Purchase_Request_Details = DecryptedData.Purchase_Request_Details;
               this.Product_Details = DecryptedData.Product_Details;
               if (this.Product_Details && this.Purchase_Request_Details) {
                  this.Loader = false;
               }
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
   }
   RequestApprove() {
      this.Loader = true;
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseRequest_RequestApprove({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            this.router.navigate(['/purchase_request_list']);
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
   }
   Modify() {
      this.Loader = true;
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseRequest_Modification({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            this.router.navigate(['/purchase_request_list']);
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
   }
   Cancel() {
      this.Loader = true;
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseRequest_Cancel({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            this.router.navigate(['/purchase_request_list']);
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
   }
   Reject() {
      this.Loader = true;
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseRequest_Reject({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            this.router.navigate(['/purchase_request_list']);
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
   }
   CancelApproval() {
      this.Loader = true;
      const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Purchase_Service.PurchaseRequest_CancelApproval({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message']  });
            this.router.navigate(['/purchase_request_list']);
            this.Loader = false;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Some Error in Getting Data!, But not Identify!' });
         }
      });
   }
   Approve() {
      this.router.navigate(['Purchase_Request_Approve', this.PurchaseRequest_Id]);
   }
   Edit() {
      this.router.navigate(['Purchase_Request_Edit', this.PurchaseRequest_Id]);
   }
}
