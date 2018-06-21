import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-leads',
  templateUrl: './main-leads.component.html',
  styleUrls: ['./main-leads.component.css']
})
export class MainLeadsComponent implements OnInit {
Active_Tab = 'Leads';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
