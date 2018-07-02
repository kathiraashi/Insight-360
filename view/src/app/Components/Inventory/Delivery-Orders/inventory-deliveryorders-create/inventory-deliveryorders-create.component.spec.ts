import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeliveryordersCreateComponent } from './inventory-deliveryorders-create.component';

describe('InventoryDeliveryordersCreateComponent', () => {
  let component: InventoryDeliveryordersCreateComponent;
  let fixture: ComponentFixture<InventoryDeliveryordersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDeliveryordersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDeliveryordersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
