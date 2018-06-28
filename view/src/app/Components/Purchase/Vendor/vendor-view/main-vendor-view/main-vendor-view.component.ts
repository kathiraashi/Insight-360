import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-vendor-view',
  templateUrl: './main-vendor-view.component.html',
  styleUrls: ['./main-vendor-view.component.css']
})
export class MainVendorViewComponent implements OnInit {
Active_Tab = 'About' ;
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
