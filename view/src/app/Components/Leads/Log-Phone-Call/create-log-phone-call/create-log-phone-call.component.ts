import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-log-phone-call',
  templateUrl: './create-log-phone-call.component.html',
  styleUrls: ['./create-log-phone-call.component.css']
})
export class CreateLogPhoneCallComponent implements OnInit {

   _Product: any[] =  ['product-1', 'product-2', ' product-3', 'product-4'];

   _Company: any[] =  ['Company-1', 'Company-2', ' Company-3', 'Company-4'];

   constructor() { }

   ngOnInit() {
   }

}
