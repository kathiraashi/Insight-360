import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-leads-settings',
  templateUrl: './main-leads-settings.component.html',
  styleUrls: ['./main-leads-settings.component.css']
})
export class MainLeadsSettingsComponent implements OnInit {

   Active_Tab = 'lead_Source';
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
