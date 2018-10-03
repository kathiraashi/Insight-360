import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-call-schedule',
  templateUrl: './create-call-schedule.component.html',
  styleUrls: ['./create-call-schedule.component.css']
})
export class CreateCallScheduleComponent implements OnInit {

   _Company: any[] =  ['Company-1', 'Company-2', ' Company-3', 'Company-4'];

   constructor() { }

   ngOnInit() {
   }

}
