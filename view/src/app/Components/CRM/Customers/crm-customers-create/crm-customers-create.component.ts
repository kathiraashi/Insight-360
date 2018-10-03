import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-customers-create',
  templateUrl: './crm-customers-create.component.html',
  styleUrls: ['./crm-customers-create.component.css']
})
export class CrmCustomersCreateComponent implements OnInit {

   _IndustryType: any[] =  ['Software', 'Manufacturing', 'Finance'];
   _AccountType: any[] =  ['Customer', 'Prospect'];
   _OwnershipType: any[] =  ['Partnership', 'Proprietorship'];
   _Country: any[] =  ['India', 'America', 'Australia'];
   _State: any[] =  ['Tamil Nadu', 'Karnataka', 'Kerala'];
   _City: any[] =  ['Chennai', 'Bangalore'];

   constructor() { }

   ngOnInit() {
   }

}
