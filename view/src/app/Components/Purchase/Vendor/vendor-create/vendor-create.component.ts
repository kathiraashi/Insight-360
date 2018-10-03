import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
   _Country: any[] =  ['India', 'America', 'Australia'];
   _State: any[] =  ['Tamil Nadu', 'Karnataka', 'Kerala'];
   _City: any[] =  ['Chennai', 'Bangalore'];


  constructor() { }

  ngOnInit() {
  }

}
