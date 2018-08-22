import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-quatations-view',
  templateUrl: './crm-quatations-view.component.html',
  styleUrls: ['./crm-quatations-view.component.css']
})
export class CrmQuatationsViewComponent implements OnInit {
  Active_Tab = 'Product_Details';

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
     this.Active_Tab = name;
   }

}
