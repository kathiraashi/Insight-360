import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-vendor-view',
  templateUrl: './about-vendor-view.component.html',
  styleUrls: ['./about-vendor-view.component.css']
})
export class AboutVendorViewComponent implements OnInit {
   @Input() CustomerData: Object;
   _Data;
   constructor() {
   }

   ngOnInit() {
      setTimeout(() => {
         this._Data = this.CustomerData;
         console.log(this._Data);
      }, 1000);
   }

}
