import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { PermissionsCheckService } from './../../../../services/PermissionsCheck/permissions-check.service';
import { InventoryService } from './../../../../services/Inventory/inventory.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ModelConfirmDeliverComponent } from 'src/app/models/CRM/Quotations/model-confirm-deliver/model-confirm-deliver.component';
import { ConfigurationService } from './../../../../services/Configuration/configuration.service';

@Component({
  selector: 'app-inventory-deliveryorders-list',
  templateUrl: './inventory-deliveryorders-list.component.html',
  styleUrls: ['./inventory-deliveryorders-list.component.css']
})
export class InventoryDeliveryordersListComponent implements OnInit {
   Company_Id;
   User_Id;
   User_Info: any;
   User_Type: any;
   _List: any[] = [];
   Loader: Boolean = true;
   ReceiveButtonShow: Boolean = true;
   Order_Id: any;
   SaleOrder_Id: any;
   bsModalRef: BsModalRef;
  constructor(
   private modalService: BsModalService,
   private Toastr: ToastrService,
   public PermissionCheck: PermissionsCheckService,
   public router: Router,
   public Inventory_Service: InventoryService,
   private Login_Service: LoginService,
   private Config_Service: ConfigurationService,
  ) {
     // get user login info
     this.User_Info = this.Login_Service.LoggedUserInfo();
     this.Company_Id = this.User_Info.Company_Id;
     this.User_Id = this.User_Info._id;
     this.User_Type = this.User_Info.User_Type['User_Type'];
     // Get Stock List
     const Data = { 'Company_Id' : this.Company_Id, 'User_Id' : this.User_Id };
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Inventory_Service.DeliverOrder_List({'Info': Info}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._List = DecryptedData;
           console.log(this._List);
           this.Loader = (this._List) ? false : true;
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
   ActionGetId(_index) {
      this.Order_Id = this._List[_index]._id;
      this.ReceiveButtonShow = (this._List[_index].Status === 'Awaiting_Deliver') ? true : false;
   }
   View() {
      this.router.navigate(['/Inventory_deliveryorder_View', this.Order_Id]);
   }
   Edit() {
      this.router.navigate(['/Inventory_deliveryorder_Edit', this.Order_Id]);
   }
}
