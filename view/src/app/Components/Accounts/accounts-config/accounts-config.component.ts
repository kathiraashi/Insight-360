import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-config',
  templateUrl: './accounts-config.component.html',
  styleUrls: ['./accounts-config.component.css']
})
export class AccountsConfigComponent implements OnInit {
   _Date: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
   _Month: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor() { }

  ngOnInit() {
  }

}
