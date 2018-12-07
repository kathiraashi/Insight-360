import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-product-setting',
  templateUrl: './main-product-setting.component.html',
  styleUrls: ['./main-product-setting.component.css']
})
export class MainProductSettingComponent implements OnInit {

   Active_Tab = 'UOM';
   constructor() { }

   ngOnInit() {
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }


}
