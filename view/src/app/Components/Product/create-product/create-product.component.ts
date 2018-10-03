import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
   _UnitOfMeasure: any[] =  ['10', '20'];
   _ProductType: any[] =  ['Cunsumable', 'Stockable', 'Serviceable'];

  constructor() { }

  ngOnInit() {
  }

}
