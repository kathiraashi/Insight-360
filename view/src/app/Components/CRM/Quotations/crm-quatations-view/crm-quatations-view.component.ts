import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../services/LoginService/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { ModelConfirmOrderComponent } from '../../../../models/CRM/Quotations/model-confirm-order/model-confirm-order.component';
import { ModelConfirmValidateComponent } from 'src/app/models/CRM/Quotations/model-confirm-validate/model-confirm-validate.component';

@Component({
  selector: 'app-crm-quatations-view',
  templateUrl: './crm-quatations-view.component.html',
  styleUrls: ['./crm-quatations-view.component.css']
})
export class CrmQuatationsViewComponent implements OnInit {
   Active_Tab = 'Product_Details';
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   Loader: Boolean = true;
   Quote_Id: any;
   _QuoteData: any;
   _ProductList: any[] = [];
   Form: FormGroup;
   bsModalRef: BsModalRef;

   constructor(
      private Toastr: ToastrService,
      private modalService: BsModalService,
      public PermissionCheck: PermissionsCheckService,
      public router: Router,
      private active_route: ActivatedRoute,
      public Crm_Service: CrmService,
      private Login_Service: LoginService,
   ) {
      // get user login info
      this.User_Info = this.Login_Service.LoggedUserInfo();
      this.Company_Id = this.User_Info.Company_Id;
      this.User_Id = this.User_Info._id;
      this.User_Type = this.User_Info.User_Type['User_Type'];
      // Get Crm Quote View
      this.active_route.url.subscribe(u => {
         this.Quote_Id = this.active_route.snapshot.params['Quote_Id'];
         const Data = {'Company_Id': this.Company_Id, 'User_Id': this.User_Id, 'Quote_Id': this.Quote_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmQuote_View({'Info': Info}).subscribe(response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._QuoteData = DecryptedData.Quote_Details;
               this._ProductList = DecryptedData.Product_Details;
               this.Loader = (DecryptedData) ? false : true;
               if (this._QuoteData && this._ProductList) {
                  this.Form.controls['Quote_Id'].setValue(this.Quote_Id);
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
      this.Form = new FormGroup({
         Quote_Id: new FormControl(null),
         Company_Id: new FormControl(this.Company_Id, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
      });
   }
   Active_Tab_Change(name) {
     this.Active_Tab = name;
   }
   // Edit
   Edit() {
      this.router.navigate(['/crm_quatation_edit', this.Quote_Id]);
   }
   // Revise
   Revise() {
      this.router.navigate(['/crm_revise_create', this.Quote_Id]);
   }
   Validate() {
      if (this.Form.valid) {
         const initialState = {
            Type: 'Create',
            Data: this.Quote_Id
         };
         this.bsModalRef = this.modalService.show(ModelConfirmValidateComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this.Loader = true;
               let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Crm_Service.CrmQuote_Approve({ 'Info': Info }).subscribe( res => {
                  const ResponseData = JSON.parse(res['_body']);
                  if (res['status'] === 200 && ResponseData['Status'] ) {
                     this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Quote Approved successfully '  });
                     this.router.navigate(['/crm_quotations_list']);
                  } else if (res['status'] === 400 || res['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (res['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Lead Getting Error!, But not Identify!' });
                  }
                  this.Loader = false;
               });
            }
         });
      }
   }
   ConfirmOrder() {
      const initialState = {
         Type: 'Create',
         Data: this.Quote_Id
      };
      this.bsModalRef = this.modalService.show(ModelConfirmOrderComponent, Object.assign({initialState}, { class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response.Status) {
            this.router.navigate(['/crm_saleorder_list']);
         }
      });
   }

}
