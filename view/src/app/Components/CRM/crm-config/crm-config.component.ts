import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-config',
  templateUrl: './crm-config.component.html',
  styleUrls: ['./crm-config.component.css'],
})
export class CrmConfigComponent implements OnInit {
   Type: string;
   Type1: string;
   Type2: string;
   Type3: string;
   Type4: string;
   Type5: string;
   _Generate: any[] = ['Auto Increment', 'Manual Entry'];
   _BasedOn: any[] = ['Fiscal', 'Custom'];
   _Date: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
   _Month: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor() { }

  ngOnInit() {
  }

}
